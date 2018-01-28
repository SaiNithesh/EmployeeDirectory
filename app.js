var express=require('express');
var bodyParser=require('body-parser');

var chalk = require('chalk');
var db=require('./models/db.js');
var app=express();
var user=require('./routes/employee.js');

var mongoose=require('mongoose');
var path = require('path');
var session=require('express-session');

var router = express.Router(); 
//app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'/public/index.html'))
});

app.get('/getEmployees',user.allEmployees);
app.post('/doCreate',user.doCreate);
app.put('/updateEmployee',user.updateEmployee); 
app.delete('/deleteEmployee',user.deleteEmployee);

//error handling
app.use("*", function(req, res) {});

app.use(function(error, req, res, next) {
    console.log(chalk.red('Error : 500::' + error))
});

var port = 3000;

var server=app.listen(port,function(req,res){
    console.log(chalk.green("Catch the action at http://localhost:"+port));
});
