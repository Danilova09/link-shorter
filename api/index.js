const express = require('express');
const cors = require('cors');
const links = require('./app/links');
const mongoDb = require('./mongoDb');
const port = 8000;
const app = express();


app.use(cors());
app.use(express.json());
app.use('/links', links);


const run = async () => {
    await mongoDb.connect();

    app.listen(port, () => {
        console.log(`Server is listening port ${port}...`)
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    })
}

run().catch(e => console.log(e));