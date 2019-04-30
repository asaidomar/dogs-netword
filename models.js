const knex = require('knex')(require('./knexfile').development);
const crypto = require("crypto");


function getUser(email) {
    return knex("User").where({email:email})
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}

function saltHashPassword (password) {
  const salt = randomString();
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password);
  return {
    salt,
    hash: hash.digest('hex')
  }
}

/*
  `id` int(11) NOT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tel` varchar(100) DEFAULT NULL,
  `mdp` varchar(100) DEFAULT NULL
 */
function createUser(data) {
    console.log(`Add user ${data.email}`);
    const { salt, hash } = saltHashPassword(data.mdp);
    data.password = hash;
    data.salt = salt;
    let user_data = {
        prenom:data.prenom,
        nom:data.nom,
        email:data.email,
        tel:data.tel,
        mdp:data.password,
        salt:data.salt
    };
    return knex('User').insert(user_data);
}


function createPublication(data){

}


function createComment(data){

}


function listUsers(data){
    return knex("User").where(data)
}

module.exports = {
    getUser,
    createUser,
    listUsers
};
