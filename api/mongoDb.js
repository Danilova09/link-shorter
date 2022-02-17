const MongoClient = require('mongodb').MongoClient;

let client = null;
let db = null;

const connect = async () => {
    client = await MongoClient.connect('mongodb://localhost');
    db = client.db('link-shorter');
};

const disconnect = async () => {
    await client.disconnect();
};

module.exports = {
    connect,
    disconnect,
    getDb: () => db
};