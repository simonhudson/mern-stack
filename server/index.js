'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const app = express();
const apiPort = 3000;
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', routes);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));