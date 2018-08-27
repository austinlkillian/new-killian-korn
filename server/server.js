require('dotenv').config();
const express = require('express'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        massive = require('massive'),
        axios = require('axios');

const app = express()
app.use(bodyParser.json())

const {
    SERVER_PORT
} = process.env

app.listen(SERVER_PORT, () => {console.log(`listening on port ${SERVER_PORT}`)})