/*
  `id` int(11) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
 */



exports.up = function(knex, Promise) {
    return knex.schema
        .createTable( 'comments', t =>{
            t.increments("id").primary();
            t.text("content");
            t.dateTime("created_date");
        })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');

};
