const express = require("express");
const router = require("./routes");

bodyParser = require('body-parser');


const port = 9191;
const app = express();

// les échanges sont faits en JSON
app.use(express.json());

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//setting middleware
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

app.use("/api", router);

app.listen(port, () => console.log(`serveur en ecoute sur http://localhost:${port}`));