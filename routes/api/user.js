const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post("/register", (req, res) => {
    // handle edge cases

    // req.body is coming from user's input, and I'm using body-parser to parse the input to a json
    User.countDocuments({username: req.body.username}, function(err, count) {
       if (count == 0) {
           const newUser = new User({
               username: req.body.username,
               password: req.body.password,
               userProfile: req.body.userProfile
           });

           newUser.save().then(user => res.send(user));
       } else {
           console.log("USERNAME EXISTS.")
           res.send({"error": "USERNAME EXISTS."})
       }
    });
});

router.post("/login", (req, res) => {
    // handle edge cases

    User.countDocuments({username: req.body.username}, function(err, checkUser) {
        if (checkUser == 1) {
            User.countDocuments({password: req.body.password}, function(err, checkPassword) {
                if (err) throw err;

                if (checkPassword == 0) {
                    res.send({"error": "WRONG USERNAME OR PASSWORD"});
                } else {
                    res.send({"successful": true});
                }
            });
        } else {
            res.send({"error": "WRONG USERNAME OR PASSWORD"});
        }
    })
});

module.exports = router