// db.js
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb://localhost:27017/mydatabase';

let db;

async function connectToDB() {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db('mydatabase');
    console.log('Connected to MongoDB');
}

function getDB() {
    return db;
}

module.exports = { connectToDB, getDB };
