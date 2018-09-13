require('dotenv').config();
const express = require('express'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        massive = require('massive'),
        sc = require('./stripe_controller'),
        faker = require('faker'),
        axios = require('axios');

        const c = require('./controller')

const app = express()
app.use(bodyParser.json())

app.use( express.static( `${__dirname}/../build` ) );

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SECRET,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    STRIPE_SECRET,
    HOME_PAGE,
    AUTH_URI
} = process.env

massive(CONNECTION_STRING).then(db => {

    app.listen(SERVER_PORT, () => {console.log(`listening on port ${SERVER_PORT}`)})
    
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
        redirect_uri: AUTH_URI
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
        res.redirect({HOME_PAGE})
    })

app.post('/api/payment', sc.handlePayment);
app.put('/api/cartUpdate', c. updateOrdered)

app.get('/api/classics', c.getClassics);
app.get('/api/flavored', c.getFlavored);
app.get('/api/light', c.getLight);
app.get('/api/sugarfree', c.getSugarFree);

app.get('/api/allproducts', c.getAllProducts);
app.get('/api/product/:product', c.getProduct);

app.post('/api/cart', c.addToCart);
app.get('/api/cart', c.getCart)
app.delete('/api/cart/:cartId', c.deleteItem)
app.put('/api/cart/:cartId', c.updateQuantity)
app.get('/api/total', c.getCartTotal)

app.get('/api/orders/notshipped', c.getOrdersNotShipped)
