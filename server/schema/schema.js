const CONSTANTS = require("../constants");
const mongoose = require("mongoose")

mongoose.connect(CONSTANTS.ENDPOINT.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const Schema = mongoose.Schema;
//create the schema for each person
const userSchema = new Schema({
	user: {
		type: String,
		unique: true
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	isAuthenticated: {
		type: Boolean,
		default: true
	}
})
//create model - Model Name, Schema
var User = mongoose.model("User", userSchema);










//close the database connection
function closeConnection(){
	mongoose.connection.close();
}

//create new user
//parameter: user data object
var createUser = function(user_data, done) {
	//add new data using the "user" instance create and fill with data
	var user = new User(user_data)
	//send the data back to the model
	user.save(function(err, data) {
		closeConnection()
		if (err) { return done(err) }
		return done(null, data)
	})
};

//lookup username
//parameter: user data object
var userLookup = function(user_data, done) {
	User.findOne({user: user_data.user}, function(err, data) {
		if (err) { return done(err) }
		return done(null, data);
	})
}




//export functions
var userDbFunctions = {};
userDbFunctions.User = User;
userDbFunctions.createUser = createUser;
userDbFunctions.userLookup = userLookup;

module.exports = userDbFunctions;
