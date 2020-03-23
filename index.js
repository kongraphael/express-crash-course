const express = require('express');
const path = require('path');
const app = express();
const members = require("./Members");
const logger = require("./middleware/logger")
const PORT =  process.env.PORT || 5000;

// use middleware
app.use(logger);

// route : getallmember
app.get("/api/members", (req,res) => {
    res.json(members);
});

// get only one member
// ici le parametre id est recupere depuis la request
app.get("/api/member/:id", (req,res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id))
    // est-ce que l'ID est sup au nombre d'entree ?
    if( found ){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
        res.json(members[parseInt(req.params.id)])
        console.log(members[parseInt(req.params.id)])
        console.log("---")
        console.log(members[0])
        console.log(`200 OK : ${JSON.stringify(members[parseInt(req.params.id)])}`);
    } else {
    // on retourne une erreur 400 dans ce cas
        res.status(400).json({message: `ID demandé ${req.param.id} n est pas valid`});
        console.log("Erreur 400")
    }
    // Sinon on retourne l enregistrement
})

// Mise en place d'un dossier static
// permet de charger des pages statiques sans placer de route particuliere
app.use(express.static(path.join(__dirname,'static')))

app.get("/",(req,res) => {
    res.send('hello !!!');
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));