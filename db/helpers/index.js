const db = require('../')

module.exports = {

    find: function (username) {
        const query = db('users')

        if (username) {
            query
                .where({ username })
                .first()
        }

        return query
    },

    add: function (user) {
        return db('users')
            .insert(user)
    }

}
