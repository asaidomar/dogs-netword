
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable( 'medias', t =>{
            t.string("localpath", 500);
            t.string("pathname", 500);
        })

};

exports.down = function(knex, Promise) {

};