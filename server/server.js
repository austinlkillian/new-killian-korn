require('dotenv').config();
const express = require('express'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        massive = require('massive'),
        axios = require('axios');

const app = express()
app.use(bodyParser.json())

const {
    SERVER_PORT,
    CONNECTION_STRING
} = process.env

massive(CONNECTION_STRING).then(db => {
    console.log('Made Connection')
    app.set('db', db)
}).catch(err => {console.log(err)})

app.listen(SERVER_PORT, () => {console.log(`listening on port ${SERVER_PORT}`)})