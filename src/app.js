require('dotenv').config();

const express = require('express');
const http = require('http');
const process = require('process');

const app = express();
const { env, } = process;
const { NODE_ENV, APP_PORT, } = env;

app.use((req, res, next) => {
    res.set('X-Powered-By', 'N1kson');
    next();
});

app.use(express.static('asset', {
    dotfiles: 'ignore',
    etag: true,
    extensions: false,
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: (res, path, stat) => {
        console.log({path, stat});
        res.set('X-Now', Date.now());
    },
}));

app.use(require('./route'));
app.use(require('./api'));

app.all('*', async(req, res, next) => {
    next(new Error());
});

app.use((error, req, res, next) => {
    if (/^prod(?:uction)?$/i.test(NODE_ENV)) {
        res.status(403).end('.');
    } else if (error instanceof Error) {
        console.error(error.stack);
        res.status(500).json({ error: `${ error }`, });
    } else {
        res.status(500).json({ error: '?', })
    }
});

const server = http.createServer(app);
server.listen(APP_PORT, () => {
    console.log(`Server started on ${ APP_PORT }...`);
});
