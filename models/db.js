var chalk = require('chalk');
var mongoose = require( 'mongoose' );

//var dbURI = 'mongodb://localhost/employeedb';

//var dbURI = 'mongodb://your_username:your_password@ds043615.mongolab.com:43615/leavethemarks';

var dbURI = 'mongodb://admin:password@ds117158.mlab.com:17158/employeedb';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});


var employeeSchema = new mongoose.Schema({
  name: {type: String, unique:true},
  email: {type: String, unique:true},
  dateofbirth: String,
  department : String,
  gender : String,
  age : Number
});

// Build the User model
mongoose.model( 'Employee', employeeSchema );
