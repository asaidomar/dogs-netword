'use strict';

const express = require('express');
const models = require("./models");

// les routes seront créées avec un routers
const router = express.Router();


router.get("/", (req, res) => {res.send("Hello")});


/************************************* Section user  **********************************************/
// creation
router.post("/user/signup", (req, res) => {
    let result = models.createUser(req.body);
    result
        .then(result => res.send(result))
        .catch(error => res.end(error))


});

// listing
router.get("/users", (req, res) => {
    let result_promise = models.listUsers(req.body);
    return result_promise.then(result => res.send(result))

});

//get
router.get("/user/:userid", (req, res) => {
    let results = models.getUser(req.params.userid);
    results.then(result => res.send("User inserted")).catch(error => res.end(error))

});

// mise à jour
router.put("/user/:userid", (req, res) => {
    let results = models.updateUser(req.params.userid, req.body);
    results.then(result => res.send("User inserted")).catch(error => res.end(error))

});
// suppression
router.delete("/user/:userid", (req, res) => {
    let results = models.deleteUser(req.params.userid);
    results.then(result => res.send("User inserted")).catch(error => res.end(error))

});


router.post("/user/login", (req, res) => {
    let result = models.login(req.body);
    result.then(result => res.send("User inserted")).catch(error => res.end(error))

});

router.delete("/user/logout", (req, res) => {
   res.send('logout')

});



/************************************* Section publication  ****************************************/

// creation
router.post("/user/:userid/publications", (req, res) => {
    let data = req.body;
    data.user_id = req.params.userid;
    let results = models.createPublication(data);
    results.then(results => res.send(results));

});

// get users publication
router.get("/user/:userid/publications", (req, res) => {
    let results = models.getUserPublications(req.params.userid);
    results.then(results => res.send(results));

});

// get publication
router.get("/publication/:publicationid", (req, res) => {
    let results = models.getPublication(data);
    results.then(results => res.send(results));

});

//mise à jour
router.put("/publication/:publicationid", (req, res) => {
    let data = req.body;
    data.user_id = res.params.userid;
    let results = models.updatePublication(publication_id, data);
    results.then(results => res.send(results));

});

//mise à jour
router.put("/publication/:publicationid/media", (req, res) => {
    let data = req.body;
    let results = models.addPublicationMedia(req.params.publicationid, data);
    results.then(results => res.send(results));

});

// delete
router.delete("/publication/:publicationid", (req, res) => {
    let results = models.deletePublication(res.params.publicationid);
    results.then(results => res.send(results));
});

/************************************* Section comment  ****************************************/
// creation
router.post("/publication/:publicationid/comments", (req, res) => {
    let data = req.body;
    data.pub_id = req.params.publicationid;
    return models.createComment(data).then((result) => res.send(result)).catch(error => res.send(error))
});

// ajout de media
router.post("/publication/:publicationid/comments/media", (req, res) => {
    return models.createMediaComment(req.body).then((result) => res.send(result)).catch(error => res.send(error))
});

// list des commentaires
router.get("/publication/:publicationid/comments", (req, res) => {
    return models.getPublicationComments(req.params.publicationid).then((result) => res.send(result)).catch(error => res.send(error))
});

// get
router.get("/comment/:commentid", (req, res) => {
    return models.getComment(req.params.commentid).then((result) => res.send(result)).catch(error => res.send(error))
});


router.delete("/comment/:commentid", (req, res) => {
    return models.deleteComment(req.params.commentid).then((result) => res.send(result)).catch(error => res.send(error))
});

router.put("/comment/:commentid", (req, res) => {
    return models.updateComment(req.params.commentid, req.body).then((result) => res.send(result)).catch(error => res.send(error))
});



module.exports = router;


