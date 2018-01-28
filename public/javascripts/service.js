(function() {
    directoryApp
        .service("directoryService", function($http) {
            this.allEmployees = function() {
                return $http.get("/getEmployees");
            }
            this.doCreate = function(payload) {
			//	return $http.get("/doCreate");
               return $http.post("/doCreate", payload);
            }
            this.updateEmployee = function(payload) {
                return $http.put("/updateEmployee", payload);
            }
            this.deleteEmployee = function(payload) {
                console.log(payload)
                return $http({
                    method: "DELETE",
                    url: "/deleteEmployee",
                    data: payload,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        });
})();