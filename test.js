
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "localhost",
        port: '8889',
        user: "root",
        password: "root",
        database: "NODE_APP"
    }
});

/*

knex.select("*").from('User')
        .then(result => console.log(result))*/

/*
knex("User").insert({
    prenom: 'test_prenom333',
    nom: 'test_nom33',
    email: 'test_email333@testtest.com',
    tel: '06454353572',
    mdp: 'test_mdp'
}).then(result => console.log(result));*/


knex.select("prenom', email").from('User')
    .where({email: 'test_email33@testtest.com'})
        .then(result => console.log(result));