
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable( 'users', t =>{
            t.string("test_test", 500);
        })

  
};

exports.down = function(knex, Promise) {
    return knex.schema
        .alterTable( 'users', t =>{
            t.dropColumn("test_test");
        })
};
