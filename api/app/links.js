const express = require('express');
const Link = require("../models/Link");
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const results = await Link.find();
        res.send(results);
    } catch (e) {
        next(e);
    }
});

router.get('/:shortUrl', async (req, res, next) => {
    try {
        const link = await Link.findOne({shortUrl: req.params.shortUrl});
        res.send(link);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const linkData = {
            _id: req.body.id,
            shortUrl: req.body.shortUrl,
            originalUrl: req.body.originalUrl,
        }

        const link = new Link(linkData);
        await link.save();
        res.send({message: 'Created link ', link: link});
    } catch (e) {
        next(e);
    }
});

module.exports = router;