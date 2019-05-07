exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable( 'publications', t =>{
            t.integer("user_id", 10).unsigned().references("users.id");
        })

};

exports.down = function(knex, Promise) {

};
