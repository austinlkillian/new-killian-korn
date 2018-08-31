require('dotenv').config();
const express = require('express'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        massive = require('massive'),
        axios = require('axios');

        const c = require('./controller')

const app = express()
app.use(bodyParser.json())

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SECRET,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET
} = process.env

massive(CONNECTION_STRING).then(db => {
    console.log('Made Connection')
    app.set('db', db)
}).catch(err => {console.log(err)})

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

app.get('/auth/callback', async (req, res) => {
    const payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }

    let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)

    let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`)

    let {
        email,
        name,
        picture,
        sub
    } = resWithUserData.data

    let db = req.app.get('db')
    let foundUser = await db.find_user([sub])
    if(foundUser[0]) {
        req.session.user = foundUser[0];
        res.redirect('/#/')
    } else {
        let createdUser = await db.insert_seed_users([name, email, picture, sub])
        req.session.user = createdUser[0]
        res.redirect('/#/');
    }

})

    function envCheck(req, res, next) {
        if (NODE_ENV === 'dev') {
            req.app.get('db').get_user_by_id()
            .then(userWithIdOne => {
                req.session.user = userWithIdOne[0]
                next();
            })
        }else {
            next()
        }
    }

    app.get('/api/user-data', envCheck, (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user);
        }else {
            res.status(401).send("NOOOOO!")
        }
    })

    app.get('/auth/logout', (req, res) => {
        req.session.destroy();
        res.redirect('http://localhost:3000/')
    })

app.get('/api/classics', c.getClassics);
app.get('/api/flavored', c.getFlavored);
app.get('/api/light', c.getLight);
app.get('/api/sugarfree', c.getSugarFree);
app.get('/api/allproducts', c.getAllProducts);

app.listen(SERVER_PORT, () => {console.log(`listening on port ${SERVER_PORT}`)})