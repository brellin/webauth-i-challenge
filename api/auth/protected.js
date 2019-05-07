const bcrypt = require('bcryptjs')
const Users = require('../../db/helpers')

module.exports = (
    function protected(req, res, next) {
        if (req.session && req.session.username) {
            next()
        } else {
            res.status(401).json({
                error: 'You are not logged in.'
            })
        }
    }
)
