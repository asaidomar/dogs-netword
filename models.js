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

function createUser(data) {
    console.log(`Add user ${data.username}`);
    const { salt, hash } = saltHashPassword(data.password);
    data.mdp = hash;
    data.salt = salt;
    return knex('User').insert(data);
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
