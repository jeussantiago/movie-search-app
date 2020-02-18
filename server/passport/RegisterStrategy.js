const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../schema/schema").User;


const RegisterStrategy = new LocalStrategy({ passReqToCallback: true, usernameField: "user"}, (req, username, password, done) => {
  //Look up if username already exist
  db.findOne({user: username}, function(err, data) {
    if (err) { return done(err, null) }
    //user already in db
    if (data) { return done(null, "User already in db") }
    //user not in db
    //register requirements
    const passwordMinLength = 4;
    if ( password.length <= passwordMinLength) { return done(null, "Password too short") }

    //hash the password
    const saltRounds = 1; //higher number for more security
    bcrypt.genSalt(saltRounds)
      .then(salt => {
        //hash the password with the generated salt
        return bcrypt.hash(password, salt);
      })
      .then(hash => {
        //save hash as new password
        req.body.password = hash;
        //create new user and save to databaes
        const user = new db(req.body);
        user.save(function(err, data) {
          if (err) { return done(err, null) }
          return done(null, data)
        })
      })
      .catch(err => console.error(err.message))
  })

})


module.exports = RegisterStrategy;