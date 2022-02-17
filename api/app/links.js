const express = require('express');
const mongoDb = require('../mongoDb');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const db = mongoDb.getDb();
        const results = await db.collection('links').find().toArray();
        res.send(results);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {

        console.log(req.body);

        const link = {
            _id: req.body.id,
            shortUrl: req.body.shortUrl,
            originalUrl: req.body.originalUrl,
        }

        const db = mongoDb.getDb();
        const result = await db.collection('links').insertOne(link);
        res.send({message: 'Created link ', link: result});
    } catch (e) {
        next(e);
    }
});

module.exports = router;