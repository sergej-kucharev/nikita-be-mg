const { Router, } = require('express');
const { resolve, } = require('path');

const route = new Router({});

route.get([
    '/',
    '/bank',
    '/calc',
], async (req, res) => {
    res.sendFile('index.html', {
        maxAge: '1d',
        root: resolve(__dirname, '../../fe/build'),
    });
});

module.exports = route;
