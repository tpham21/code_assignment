angular.module('myApp').directive('headerTemplate', function () {
    var controller = ['$scope', function ($scope) {
   		$scope.changeToggle = function(){
   			$scope.onMenuToggle = $scope.onMenuToggle===null?false:!$scope.onMenuToggle;
   		}
    }];
      
    return {
          	restrict: 'EA',
            scope: {
	            fontColor: '=',
	            onMenuToggle: '=?',
              left:'=?'
	        },
          	controller: controller,
         	templateUrl: 'directives/header_directive/header_directive.html'
          }
	}
);