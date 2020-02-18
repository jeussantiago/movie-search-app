const CONSTANTS = require("../constants");
const db = require("../schema/schema.js").User;
const sampleData = require("../sampleData");
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require('passport');


const router = express.Router();
// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
  res.json(sampleData.textAssets);
});






// REGISTRATION ENDPOINTS
router.post(CONSTANTS.ENDPOINT.REGISTRATION, (req, res, next) => {
  passport.authenticate('local-register', (err, user) => {
    if (err) {
      return res.json({
        message: "somethging wrong happend"
      })
    }
    if (typeof user !== "object") {
      return res.redirect(CONSTANTS.ENDPOINT.REGISTRATION)
    }
    //Persistent login new user
    req.logIn(user, (err) => {
      if (err) {
        res.redirect(CONSTANTS.ENDPOINT.REGISTRATION)
      }
      //send user to their personal dashboard
      res.redirect(CONSTANTS.ENDPOINT.LOGINMIDDLE)
    })
  })(req, res, next)

})

// LOGIN ENDPOINTS
router.post(CONSTANTS.ENDPOINT.LOGIN, (req, res, next) => {
  passport.authenticate('local-signin', (err, user) => {
    // console.log("here", user)
    if (err) {
      console.log("login error: ", err || "something went wrong")
      res.redirect(CONSTANTS.ENDPOINT.LOGIN)
    }
    //handle input errors
    if (typeof user !== "object") {
      console.log("login error part 2:", user)
      res.redirect(CONSTANTS.ENDPOINT.LOGIN)
      return
    }
    //Persistent login returning user
    req.logIn(user, (err) => {
      if (err) {
        res.redirect(CONSTANTS.ENDPOINT.LOGIN)
      }
      //send user to their personal dashboard
      res.redirect(CONSTANTS.ENDPOINT.LOGINMIDDLE)
    })
  })(req, res, next)
})




// DASHBOARD ENDPOINTS
//make sure user is authenticated
ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // console.log("Is Authenticated")
    return next()
  }
  // console.log("Not Authenticated")
  res.redirect(CONSTANTS.ENDPOINT.LOGIN);
};

router.get(CONSTANTS.ENDPOINT.DASHBOARD, ensureAuthenticated, (req, res) => {
  //get deserialized information of the user
  let userData = req.user;
  // console.log("dashboard api:", userData)
  res.json(userData)
})



// LOGOUT ENDPOINTS
router.post(CONSTANTS.ENDPOINT.LOGOUT, (req, res) => {
  // console.log("logout api")
  const {
    user
  } = req.body;
  // console.log("router-post-logout:", user)
  //logout session
  req.logout();
  // console.log("starting authentication to false")
  //set user authentication to false and save to database
  db.findOneAndUpdate({
    user: user
  }, {
    isAuthenticated: false
  }, {
    new: true
  }, function (err, data) {
    if (err) {
      return err
    }
    if (!data) {
      return err
    }
    //data has been updated - redirect to Login screen
    return res.json(data)
    // return data

  })
})






// LIST ENDPOINTS
router.get(CONSTANTS.ENDPOINT.LIST, function (req, res) {
  res.json(sampleData.listTextAssets);
});

router.post(CONSTANTS.ENDPOINT.LIST, function (req, res) {
  let listItem = {
    text: req.body.text,
    _id: sampleData.listID
  };
  sampleData.listTextAssets.unshift(listItem); //added data to DB
  res.json(listItem); //return singular data to add for render
  sampleData.listID++;
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function (req, res) {
  const {
    _id
  } = req.params;
  var index = sampleData.listTextAssets.findIndex(
    listItem => listItem._id === Number(_id)
  );
  if (index > -1) { //find item in data base and remove
    sampleData.listTextAssets.splice(index, 1);
    res.json({
      _id: Number(_id),
      text: "This commented was deleted"
    });
  } else {
    res.status(404).send("Could not find item with id:" + _id);
  }
});





// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
  res.json(sampleData.textAssets);
});


module.exports = router;