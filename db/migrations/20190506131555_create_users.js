exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('users', col => {

            col.increments()

            col
                .string('username')
                .unique()
                .notNullable()

            col
                .string('password')
                .notNullable()
                .unique()

        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
