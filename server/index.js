const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const {Pool} = require('pg');
const pgClient = new Pool({
  host: keys.dbHost,
  database: keys.dbDatabase,
  port: keys.dbPort,
  user: keys.dbUser,
  password: keys.dbPassword,
});

pgClient.on('error', () => {
  console.log('Lost Postgres connection');
});

pgClient.query('CREATE TABLE IF NOT EXISTS values(number INT)')
  .catch((error) => {
    console.log(error);
  });