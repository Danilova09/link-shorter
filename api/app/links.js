const express = require('express');
const Link = require("../models/Link");
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const links = await Link.find();
        res.send(links);
    } catch (e) {
        next(e);
    }
});

router.get('/:shortUrl', async (req, res, next) => {
    try {
        const link = await Link.findOne({shortUrl: req.params.shortUrl});
        if (!link) {
            return res.status(404).send({error: 'Not found'});
        }
        return res.status(301).redirect(link['originalUrl']);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.shortUrl || !req.body.originalUrl) {
            return res.status(400).send({error: 'Fill in required fields'});
        }
        const linkData = {
            _id: req.body.id,
            shortUrl: req.body.shortUrl,
            originalUrl: req.body.originalUrl,
        }
        const link = new Link(linkData);
        await link.save();
        return res.send(link);
    } catch (e) {
        next(e);
    }
});

module.exports = router;