const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const links = require('./app/links');
const port = 8000;
const app = express();


app.use(cors());
app.use(express.json());
app.use('/links', links);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server is listening port ${port}...`)
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
}

run().catch(e => console.log(e));