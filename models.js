const knex = require('knex')(require('./knexfile').development);
const crypto = require("crypto");
const fs = require('fs');


function getUser(email) {
    return knex("users").where({email: email})
}

function randomString() {
    return crypto.randomBytes(4).toString('hex')
}

function saltHashPassword(password, salt_) {
    const salt = salt_ || randomString();
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
    console.log(`Add users ${data.email}`);
    const {salt, hash} = saltHashPassword(data.mdp);
    data.password = hash;
    data.salt = salt;
    let user_data = {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        tel: data.tel,
        mdp: data.password,
        salt: data.salt
    };
    return knex('users').insert(user_data).then(result => {
        if (result) {
            return knex('users').where({email: data.email}).limit(1);
        } else {
            throw Error("User not inserted")
        }
    });
}


function createPublication(data) {
    return knex("publications").insert(data).then(results => {
            if (results) {
                return data
            } else {
                throw Error("Publication not inserted")
            }
        }
    )
}


function createComment(data) {
    return knex("comments").insert(data).then(result => {
        return data
    })

}

function updatePublication(publication_id, data) {
    return knex("users").update(data).where({id: publication_id})

}


function getUserPublications(user_id) {
    return knex("publications").select("*").where({user_id: user_id})
}


function getPublication(publication_id) {
    return knex("publications").select("*").where({id: publication_id})
}


function listComments(pub_id) {
    return knex("comments").select("*").where({pub_id: pub_id})

}

function deleteUser(userid) {
    return knex("comments").delete().where({id: userid})

}

function login(data) {
    return knex("users").where({email: data.email}).then(results =>{

        if (results){
            let  salt = results[0].salt;
            let senthashedPassword = results[0].mdp;
            let hashedPassword = saltHashPassword(data.mdp, salt);
            if (senthashedPassword === hashedPassword){
                return results[0]
            }else{
                 throw Error('Password error')
            }

        }else{
            throw Error('User not found')
        }
    })

}


function listUsers(data) {
    return knex("users").where(data)
}

function updateUser(userid, data) {
    return knex("users").update(data).where({id: userid})

}

function addPublicationMedia(publication_id, data) {
    let buff = new Buffer(data.content_b64, 'base64');
    let pathname = `/public/images/${publication_id}${randomString()}.png`;
    let path = `/Users/alisaidomar/PycharmProjects/dogs${pathname}`;
    fs.writeFileSync(path, buff);

    delete data.content_b64;
    data.localpath = path;
    data.pathname = pathname;
    data.pub_id = publication_id;

    return knex("medias").insert(data).then(results => {
        if (results){
            return data
        }else{
            throw Error("Error")
        }
    })
}


function deletePublication(publication_id) {
    return knex("publication").delete(data).where({id: publication_id})
}


function createMediaComment(data) {

}


function getPublicationComments(publication_id) {
    return knex("comments").where({pub_id: publication_id})

}

function getComment(comment_id) {
    return knex("comments").where({id: comment_id})

}

function deleteComment(comment_id) {
    return knex("comments").delete(data).where({id: comment_id})
}


function updateComment(comment_id, data) {
    return knex("comments").update(data).where({id: comment_id})

}

// on evite de doublon
module.exports = {
    getUser,
    createUser,
    createPublication,
    createComment,
    getUserPublications,
    getPublication,
    listComments,
    listUsers,
    updateUser,
    deleteUser,
    login,
    updatePublication,
    addPublicationMedia,
    deletePublication,
    createMediaComment,
    getPublicationComments,
    getComment,
    deleteComment,
    updateComment
};


module.exports;