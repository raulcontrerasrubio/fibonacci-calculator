const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {client: pgClient, createInitialTables} = require('./config/postgres');
const {client: redisClient, published: redisPublisher} = require('./config/redis');

/***
 * SETUP
 */
(async () => {
  await createInitialTables();
});

/***
 * MIDDLEWARES
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());

/***
 * ROUTES
 */
app.get('/', (req, res) => {
  return res.status(200).json({
    working: true
  });
});

app.get('/values/all', async (req, res) => {
  try{
    const values = await pgClient.query('SELECT * FROM values');

    return res.status(200).json({
      data: values.rows
    });;
  }catch(error){
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error'
    });
  }
});

app.get('/values/current', (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    return res.status(200).json({
      data: values
    });
  });
});

app.post('/values', async (req, res) => {
  try{
    const index = req.body.index;

    if(parseInt(index) > 40){
      return res.status(422).json({
        error: 'HIGH_NUMBER_NOT_SUPPORTED',
        message: 'High values are not supported'
      });
    }

    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    pgClient.query(`INSERT INTO values(number) VALUES($1)`, [index]);

    res.status(200).json({
      working: true
    });

  }catch(error){
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error'
    });
  }
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
})