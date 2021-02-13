const { Router, } = require('express');
const path = require('path');

const router = new Router({});

router.get([
    '/',
    '/bank',
    '/calc',
], async (req, res) => {
    res.sendFile('index.html', {
        maxAge: '1d',
        root: path.resolve(__dirname, '../../asset'),
    });
});

module.exports = router;
