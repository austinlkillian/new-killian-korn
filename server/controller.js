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

        db.insert_seed_cart([product_id, size_id, quantity])
        .then(
            res.sendStatus(200)
        ).catch(err => {
            res.status(500).send({errorMessage: "Oops! something went wrong, could not add to cart. We're on it!"})
            console.log(err)
        })
    }
}