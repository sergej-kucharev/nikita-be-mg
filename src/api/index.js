const { Router, } = require('express');

const route = new Router({});

route.use('/api/v1/bank', require('./route-bank'));
route.use('/api/v1/', require('./route-calc'));

module.exports = route;
