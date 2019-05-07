/*
  `id` int(11) NOT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tel` varchar(100) DEFAULT NULL,
  `mdp` varchar(100) DEFAULT NULL
 */



exports.up = function(knex, Promise) {
    return knex.schema
        .createTable( 'users', t =>{
            t.increments("id").primary();
            t.string("prenom", 250);
            t.string("nom", 250);
            t.string("email", 250).unique();
            t.string("tel", 250);
            t.string("mdp", 500);
            t.string("salt", 250);
        })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  
};
