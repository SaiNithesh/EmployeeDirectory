var mongoose = require( 'mongoose' );
var Employee = mongoose.model( 'Employee' );

exports.index=function(req,res){
	//module.exports.allEmployees(req,res)
	console.log("In Get Name Index : ")
                //  res.render('index',{savedEmployee: savedEmployee, session:req.session});
              }
			  
exports.allEmployees=function(req,res){
  	console.log("In Get All Employees: ")
   Employee.find({},function(err,employeeDetails){
       if(err){
         console.log("Error", err);
         var message="Error in fetching Employees";
         res.render("index",{errorMessage:message});
         return;
       }else{			
		//res.render("index",{savedEmployee:employeeDetails});
		res.send(employeeDetails)
       }
   });
}

exports.doCreate=function(req,res){	 

   var newEmployee=new Employee();
   newEmployee.name=req.body.Name;
   newEmployee.email=req.body.Email;
   newEmployee.dateofbirth=req.body.DOB;
   newEmployee.department=req.body.Department;
   newEmployee.gender=req.body.Gender;
   newEmployee.age=req.body.Age;

   newEmployee.save(function(err,savedUser){
       if(err){
         console.log("User already exists with that username or email");
         var message="A user already exists with that username or email";
        // res.render("index",{errorMessage:message});
			res.status(400);
            res.send(err);
         return;
       }else{
			Employee.find({},function(err,employeeDetails){
			res.send(employeeDetails)
		   });
		//   module.exports.allEmployees(req,res)
      }
   }); 
}

exports.updateEmployee=function(req,res){
	
	Employee.update({ email: req.body.Email },{
		$set : {
			email : req.body.Email,
			dateofbirth : req.body.DOB,
			department : req.body.Department,
			gender : req.body.Gender,
			age : parseInt(req.body.Age)
		}
	},{multi : false},
	function(err,obj){
		if (err) {
                console.log("err");
                console.log(JSON.stringify(err));
                res.send("err");
            } else {
                Employee.find({}, function(err, employeeDetails) {
                    res.send(employeeDetails)
                });
            }
	});  
}

exports.deleteEmployee=function(req,res){
	
   Employee.remove({ email: req.body.email },function(err,updateUser){
       if(err){
         console.log("User Delete");
         var message="A user delete";
		 console.log(JSON.stringify(err));
            res.send("err");
       //  res.render("index",{errorMessage:message});
         return;
       }else{
		console.log('User deleted!');		
		Employee.find({}, function(err, employeeDetails) {
                    res.send(employeeDetails)
                });
		// res.send(employeeDetails)
		// module.exports.allEmployees(req,res)
	   }
   });
}