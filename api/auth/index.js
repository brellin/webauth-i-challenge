const router = require('express').Router()
const bcrypt = require('bcryptjs');

const Users = require('../../db/helpers')
const protected = require('./protected')

router.post('/register', async (req, res) => {

    let { body } = req

    body.password = bcrypt.hashSync(body.password, 10)

    if (body.username && body.password) {

        try {

            const post = await Users.add(body)

            const get = await Users.find(body.username)

            post && res.status(200).json(get)

        } catch (err) {

            console.log(err)

            res.status(500).json(err)

        }

    } else {

        res.status(400).json({

            error: "You must include a username AND a password."

        })

    }

})

router.post('/login', async (req, res) => {

    let { username, password } = req.body

    if (username && password) {

        try {

            await Users.find(username).then(user => {

                if (user && bcrypt.compareSync(password, user.password)) {

                    req.session.username = user.username

                    res.status(200).json({

                        message: 'You have successfully been logged in!'

                    })

                } else {
                    res.status(401).json({

                        message: 'Invalid Credentials'

                    })
                }
            })

        } catch (err) {

            console.log(err)

            res.status(500).json(err)

        }

    } else {

        res.status(400).json({

            error: "You must include a username AND a password."

        })

    }
})

router.get('/users', protected, async (req, res) => {

    const { username } = req.body

    try {

        const get = await Users.find(username)

        res.status(200).json(get)

    } catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

})

router.get('/logout', async (req, res) => {

    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    error: 'Something went wrong.'
                })
            } else {
                res.status(200).json({
                    message: "You're logged out now."
                })
            }
        })
    } else {
        res.status(400).json({
            message: "You're not logged in."
        })
    }

})

module.exports = router
