exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable( 'comments_medias', t =>{
            t.integer("user_id", 10).unsigned().references("users.id");
            t.integer("comment_id", 10).unsigned().references("comments.id");
        })

};

exports.down = function(knex, Promise) {

};