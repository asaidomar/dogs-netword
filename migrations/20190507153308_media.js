
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable( 'medias', t =>{
            t.increments("id").primary();
            t.text("description");
            t.dateTime("created_date").defaultTo(knex.fn.now());
        })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');

};