const {Pool} = require('pg');
const {dbDatabase, dbHost, dbUser, dbPassword, dbPort} = require('../keys');

const pool = new Pool({
  host: dbHost,
  database: dbDatabase,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
});

const getClient = async () => {
  try{
    const client = await pool.connect();
    return client;
  }catch(error){
    console.log('Could not connect to Postgres pool')
  }
}

const createInitialTables = async (client) => {
  try{
    await client.query('CREATE TABLE IF NOT EXISTS values(number INT)');
  }catch(error){
    console.log(error);
  }
};

const client = (async () => await getClient())();

exports.client = client;
exports.getClient = getClient;
exports.createInitialTables = createInitialTables;

module.exports = exports;