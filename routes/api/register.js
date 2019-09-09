const express = require('express');
const router = express.Router();
/*
       .../register
*  */

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://JCBang:G73XgEPumDZEMGJm@ucf-spc-poosw-project1-exub3.azure.mongodb.net/test?retryWrites=true&w=majority";

router.post("/register", (req, res) => {
    // handle edge cases
    // req.body is coming from user's input, and I'm using body-parser to parse the input to a json
    const newUser = {username: req.body.username, password: req.body.password, userProfile: req.body.userProfile};

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("contact_manager");

        dbo.collection("userAccounts").count({username: req.body.username}).then((count) => {
            if (count > 0) {
                console.log("USERNAME EXISTS");
                res.send({"error": "USERNAME EXISTS"})
            } else {
                dbo.collection("userAccounts").insertOne(newUser, function(err, result) {
                    console.log("New User Inserted Into The DB");
                    res.send(newUser);
                    db.close();
                });
            }
        })
    });
});

module.exports = router