require('dotenv').config();

const express = require('express');
const http = require('http');
const process = require('process');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { ValidationError, } = require('./helpers/validator');

const app = express();
const { env, } = process;
const { NODE_ENV, APP_PORT, } = env;

app.use(cors((req, done) => {
    done(null, { origin: true }); // - reflect
    // done(null, { origin: false }); // - allow
}));

app.use((req, res, next) => {
    res.set('X-Powered-By', 'N1kson');
    next();
});

app.use(express.static('fe/build', {
    dotfiles: 'ignore',
    etag: true,
    extensions: false,
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: (res, path, stat) => {
        res.set('X-Now', Date.now());
    },
}));

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(require('./route'));
app.use(require('./api'));

app.all('*', async(req, res, next) => {
    next(new Error());
});

app.use((error, req, res, next) => {
    if (/^prod(?:uction)?$/i.test(NODE_ENV)) {
        res.status(403).end('.');
    } else if (error instanceof ValidationError) {
        console.error(error.errors);
        res.status(500).json({ error: error.errors, });
    } else if (error instanceof Error) {
        console.error(error.stack);
        res.status(500).json({ error: `${ error.stack }`, });
    } else {
        res.status(500).json({ error: '?', })
    }
});

const server = http.createServer(app);
server.listen(APP_PORT, () => {
    console.log(`Server started on ${ APP_PORT }...`);
});
