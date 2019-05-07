exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable( 'medias', t =>{
            t.integer("user_id", 10).unsigned().references("users.id");
            t.integer("pub_id", 10).unsigned().references("publications.id");
        })

};

exports.down = function(knex, Promise) {

};