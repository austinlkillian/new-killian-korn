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
    }
}