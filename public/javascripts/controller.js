(function() {
    directoryApp
        .controller("directoryCtrl", function(directoryService) {
            var vmApp = this;
            vmApp.emp = {};
			vmApp.employeeEdit = {};
			vmApp.employeeEdit.DOB = new Date();
            vmApp.emp.DOB = new Date();
            vmApp.ListAllEmployees = allEmployees;
            vmApp.AddEmployee = doCreate;
            vmApp.UpdateEmployee = updateEmployee;
            vmApp.deleteEmployee = deleteEmployee;
            vmApp.PopulateData = PopulateData;
            vmApp.loading = false;
            vmApp.empEdit=false;
            vmApp.isUpdateVisible = false;

            vmApp.ListAllEmployees();
          
            function allEmployees() {
                vmApp.loading = true;
                directoryService.allEmployees().then(function(response) {
                        vmApp.empDetails = response.data;
                        vmApp.error = "";
                        vmApp.loading = false;
                    },
                    function(error) {
                        vmApp.loading = false;
                        vmApp.error = error.data.message;
                    });
            }
			function doCreate(emp) {
                vmApp.loading = true;
                directoryService.doCreate(emp).then(function(response) {
                        vmApp.empDetails = response.data;
                        vmApp.error = "";
                        vmApp.loading = false;
                    },
                    function(error) {
                        vmApp.loading = false;
						 vmApp.error = "Error in creating. Please check the inputs";
                     //   vmApp.error = error.data.message;
                    });
            }
			function updateEmployee(employeeEdit) {
                vmApp.loading = true;
                directoryService.updateEmployee(employeeEdit).then(function(response) {
                        vmApp.empDetails = response.data;
                        vmApp.error = "";
                        vmApp.loading = false;
                    },
                    function(error) {
                        vmApp.loading = false;
                        vmApp.error = error.data.message;
                    });
            }
			function deleteEmployee(emp) {
                console.log(emp.Email)
                vmApp.loading = true;
                directoryService.deleteEmployee({ "email": emp.Email }).then(function(response) {
                    vmApp.empDetails = response.data;
                    vmApp.error = "";
                    vmApp.loading = false;
                    
                }, function(error) {
                    vmApp.loading = false;
                    vmApp.error = error.data.message;
                });
            }
			function PopulateData(emp) {
                vmApp.isUpdateVisible = true;
                vmApp.emp.Name = emp.name;
                vmApp.emp.Email = emp.email;
                vmApp.emp.DOB = new Date(emp.dateofbirth);
                vmApp.emp.Age = parseInt(emp.age);
                vmApp.emp.Gender = emp.gender;
                vmApp.emp.Department = emp.department;
            }
        });
})();