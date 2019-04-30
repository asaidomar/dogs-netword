'use strict';

const express = require('express');
const models = require("./models");

// les routes seront créées avec un routers
const router = express.Router();


router.get("/", (req, res) => {res.send("Hello")});

// création d'un user
router.post("/user/signup", (req, res) => {
    let result = models.createUser(req.body);
    res.send('User created')

});

// création d'un user
router.get("/users", (req, res) => {
    let result_promise = models.listUsers(req.body);
    return result_promise.then(result => res.send(result))

});


module.exports = router;


