
exports.up = function(knex, Promise) {
    return knex.schema
        .alterTable( 'users', t =>{
            t.string("pciture_url", 10);
        })
  
};

exports.down = function(knex, Promise) {
  
};
