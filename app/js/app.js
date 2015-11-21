
var app = angular.module("messageApp", []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {   //Passing $http service to controller as string so that will resolve at runtime.

	//$scope.method = 'get';

	$scope.methods = [
		{name: 'GET', method: 'get'},
		{name: 'POST', method: 'post'},
		{name: 'PUT', method: 'put'},
		{name: 'DELETE', method: 'delete'}
	];

	//initial state setup
	$scope.showGet = '';
	$scope.showPost = 'ng-hide';
	$scope.showPut = 'ng-hide';
	$scope.showDelete = 'ng-hide';

	//changes show/hide attributes based on selection
	$scope.showMethod = function () {

		if ($scope.method == 'get') {
			$scope.showGet = '';
			$scope.showPost = 'ng-hide';
			$scope.showPut = 'ng-hide';
			$scope.showDelete = 'ng-hide';
		};

		if ($scope.method == 'post') {
			$scope.showGet = 'ng-hide';
			$scope.showPost = '';
			$scope.showPut = 'ng-hide';
			$scope.showDelete = 'ng-hide';
		};

		if ($scope.method == 'put') {
			$scope.showGet = 'ng-hide';
			$scope.showPost = 'ng-hide';
			$scope.showPut = '';
			$scope.showDelete = 'ng-hide';
		};

		if ($scope.method == 'delete') {
			$scope.showGet = 'ng-hide';
			$scope.showPost = 'ng-hide';
			$scope.showPut = 'ng-hide';
			$scope.showDelete = '';
			
		};

		//TO DO: flush all input boxes


	};

	$scope.submit = function () {
			
			var statusResponse;	//for status message after request is processed
			
			//IF GET
			if ($scope.method === 'get') {
				//GET all or GET one -> info pushed into $scope.data
				if ($scope.getID === undefined) {	//get all
					$http.get('http://localhost:8080/api/messages').then(
						function (data) {
							//console.log(data);
							statusResponse = 1;	
							$scope.data = data.data;
							console.log('Returned data was:');
							console.log($scope.data);
						}, function (response) {
							statusResponse = 2;	
						}
					);
				} else {	//get one (with specified ID)
					$http.get('http://localhost:8080/api/messages/' + $scope.getID).then(
						function (data) {
							//console.log(data);
							statusResponse = 1;	
							$scope.data = []; //defining as empty aray and pushing individual object to avoid ng-repeat break
							$scope.data.push(data.data);
							console.log('Returned data was:');
							console.log($scope.data);
						}, function (response) {
							statusResponse = 4;	
						}
					);
				};
			};


			//if POST
			//POST one
			if ($scope.method === 'post') {
				if ($scope.postContent === undefined) {
					statusResponse = 3;	///////////////TO DO!!!
					console.log('All required fields have not been filled in.');
				} else {
				$http.post('http://localhost:8080/api/messages/', {content: $scope.postContent}).then(
					function (data) {
						$scope.data = data.data;
						console.log('Message ' + $scope.postContent + ' has been added to the database!');
					}, function (response) {
						response = 2;	///////////////TO DO!!!
						console.log('Message ' + $scope.postContent + ' could not be added to the database!');
					});
				}
			};


			//for testing purposes PUT one
			//response code
			if ($scope.method === 'put') {
				if ($scope.putID === undefined || $scope.putContent === undefined) {
					statusResponse = 3;
					console.log('All required fields have not been filled in.');
				} else {
					$http.put('http://localhost:8080/api/messages/' + $scope.putID, {content: $scope.putContent}).then(
						function (data) {
							console.log('Message with ID ' + $scope.putID + ' has ben modified.');
							statusResponse = 1;
						}, function(response) {
							console.log('Message with ID ' + $scope.putID + ' could not be modified in the database!');
							statusResponse = 2;
						}
					);
				}

			};


			//for testing purposes DELETE one
			//response code
			if ($scope.method === 'delete') {

				$http.delete('http://localhost:8080/api/messages/' + $scope.deleteID).then(
					function (data) {
						statusResponse = 1;	
						console.log('Document with ID ' + $scope.deleteID + ' has been deleted!');
						$scope.data = undefined;
					}, function (response) {
						statusResponse = 2;
						console.log('Document with ID ' + $scope.deleteID + ' could not be deleted from the collection.');
						console.log(response);
					}
				)
			};




			//value = 1; //status = OK.
			switch (statusResponse) {
				case 1:
					$scope.response = "Status: OK.";
					$scope.type = "success";
					break;
				case 2:
					$scope.response = "Status: Error. Database results could not be returned!";
					$scope.type = "danger";
					break;
				case 3:
					$scope.response = "Status: Error. Please fill out all the form values before submitting.";
					$scope.type = "danger";
					break;
				case 4:
					$scope.response = "Status: Error. Please fill form with an accurate ID field and resubmit.";
					$scope.type = "danger";
					break;
			};

	};

}]);