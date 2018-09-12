module.exports = {
    getClassics: (req, res) => {
        const db = req.app.get('db');

        db.get_classics()
        .then(classics => {
            res.status(200).send(classics)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong, could not get classics. Were on it!"})
            console.log(err)
        })
    },

    getFlavored: (req, res) => {
        const db = req.app.get('db');

        db.get_flavored()
        .then(flavored => {
            res.status(200).send(flavored)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong, could not get flavored. We're on it!"})
            console.log(err)
        })
    },

    getLight: (req, res) => {
        const db = req.app.get('db');

        db.get_light()
        .then(light => {
            res.status(200).send(light)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong, could not get light. We're on it!"})
            console.log(err)
        })
    },

    getSugarFree: (req, res) => {
        const db = req.app.get('db')

        db.get_sugarfree()
        .then(sugarFree => {
            res.status(200).send(sugarFree)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong, could not get sugar free. We're on it!"})
            console.log(err)
        })
    },

    getAllProducts: (req, res) => {
        const db = req.app.get('db')

        db.get_all_products()
        .then(products => {
            res.status(200).send(products)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not get all products. We're on it!"})
            console.log(err)
        })
    },

    getProduct: (req, res) => {
        const db = req.app.get('db')
        const {product} = req.params

        db.get_product([product])
        .then(item => {
            res.status(200).send(item)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not get product. We're on it!"})
            console.log(err)
        })
    },

    addToCart: (req, res) => {
        const db = req.app.get('db')
        const {product_id, size_id, quantity} = req.body
        const {user_id} = req.session.user

        db.insert_seed_cart([user_id, product_id, size_id, quantity])
        .then(
            res.sendStatus(200)
        ).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not add to cart. We're on it!"})
            console.log(err)
        })
    },

    getCart: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        db.get_cart([user_id])
        .then(items => {
            res.status(200).send(items)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not get cart. We're on it!"})
            console.log(err)
        })
    },

    deleteItem: (req, res) => {
        const db = req.app.get('db')
        const {cartId} = req.params

        db.delete_item([cartId])
        .then(() => {
            res.sendStatus(200)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not delete item. We're on it!"})
            console.log(err)
        })
    },

    updateQuantity: (req, res) => {
        const db = req.app.get ('db')
        const {cartId} = req.params
        const {quantity} = req.body

        db.update_quantity([cartId, quantity])
        .then(() => {
            res.sendStatus(200)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not update quantity. We're on it!"})
            console.log(err)
        })
    },

    getCartTotal: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        db.get_cart_total([user_id])
        .then(total => {
            res.status(200).send(total)
        }).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not get cart total. We're on it!"})
            console.log(err)
        })
    }
}