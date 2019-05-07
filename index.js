const express = require("express");
const router = require("./routes");

bodyParser = require('body-parser');
const path = require('path');



const port = 9191;
const app = express();

// les échanges sont faits en JSON
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//setting middleware

app.use("/api", router);
app.use("/public", express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.listen(port, () => console.log(`serveur en ecoute sur http://localhost:${port}`));