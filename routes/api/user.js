const express = require('express');
const router = express.Router();
const UserAccounts = require('../../models/UserAccounts');
const UserProfiles = require('../../models/UserProfiles');

// link: user/

router.post("/register", (req, res) => {
    // handle edge cases

    // req.body is coming from user's input, and I'm using body-parser to parse the input to a json
    UserAccounts.countDocuments({username: req.body.username}, function(err, count) {
       if (count == 0) {
           const newUser = new UserAccounts({
               username: req.body.username,
               password: req.body.password
           });
           const id = newUser._id;
           const newUserProfile = new UserProfiles({
              _id: id,
           });

           newUserProfile.save().then(userProfile => console.log("SUCCESSFULLY CREATED A NEW USER PROFILE"))
           newUser.save().then(user => console.log("SUCCESSFULLY CREATED A NEW USER"));
           res.json({success: true});
       } else {
           console.log("USERNAME EXISTS.");
           res.json({success: false});
       }
    });
});

router.post("/verify", (req, res) => {
    // handle edge cases

    UserAccounts.countDocuments({username: req.body.username}, function(err, checkUser) {
        if (checkUser == 1) {
            User.countDocuments({password: req.body.password}, function(err, checkPassword) {
                if (err) throw err;

                if (checkPassword == 0) {
                    res.json({success: false});
                } else {
                    res.json({success: true});
                }
            });
        } else {
            res.json({success: false});
        }
    });
});

module.exports = router;