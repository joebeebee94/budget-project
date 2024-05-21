// import node modules
const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');

const docsRouter = require('./routes/api-docs');
const envelopesRouter = require('./routes/envelopes');

// set config variables
dotenv.config({ path: './config/.env' });

// create app with body parsing & logging
const app = express();
app.use(express.json())

app.use('/api-docs', docsRouter);
app.use('/api/v1/envelopes', envelopesRouter);

app.use(express.json());
if (process.env.NODE_ENV === !'test') {
    app.use(logger('dev'));
};

module.exports = app;
