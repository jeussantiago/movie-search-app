const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../schema/schema").User;


const SigninStrategy = new LocalStrategy({ usernameField: "user" }, (username, password, done) => {
  // console.log(username, password);
  //serach database for user
  db.findOne({user: username}, function(err, data) {
    if (err) { return done(err, null) }
    //No user found error
    if (!data) { 
      console.log("sign in strategy no user found")
      return done(null, "No User found") 
    }
    //compare sign in password with stored password
    bcrypt.compare(password, data.password)
      .then(isMatch => {
        if (!isMatch) { return done(null, "Password is incorrect") }  //passwords don't match
        //passwords match - return user data
        //set user isAuthenticated to true
        // console.log("signin Strategy",data)
        db.findByIdAndUpdate(data._id, {isAuthenticated: true}, {new: true}, (err, data) => {
          if (err) { return done(err, null)}
          return done(null, data) 
        })
      })
      .catch(err => console.error(err.message))
  })
})


module.exports = SigninStrategy;

//1:45;56