const passport = require('passport');
const db = require("../schema/schema").User;

//add user into passport using serialize
passport.serializeUser((data, done) => {
  const username = data.user
  done(null, username)
})

//when you login - the session checks this function everysingle time you change routes
passport.deserializeUser((username, done) => {
  // console.log("deserializing again", username)
  db.findOne({user: username}, (err, user) => {
    //return entire user data to route
    done(err, user)
  })
})


//import all strategies
const SigninStrategy = require("./SigninStrategy");
const RegisterStrategy = require("./RegisterStrategy");


passport.use("local-signin", SigninStrategy);
passport.use("local-register", RegisterStrategy);

module.export = passport;