const bcrypt = require('bcryptjs')
const Users = require('../../db/helpers')

module.exports = (
    function protected(req, res, next) {

        const { username, password } = req.headers

        if (username && password) {

            Users.find(username).then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {

                    next()

                } else {

                    res.status(401).json({

                        error: 'You are not logged in.'

                    })

                }
            })

        } else {

            res.status(500).json({

                error: 'You must include a username AND a password.'

            })

        }

    }
)
