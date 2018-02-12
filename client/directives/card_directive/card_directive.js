angular.module('myApp').directive('cardDirective', function () {
    var controller = ['$scope', function ($scope) {
      
    }];
      
    return {
          	restrict: 'EA',
            scope: {
	            cardContent: '='
	        },
          	controller: controller,
          	templateUrl: 'directives/card_directive/card_directive.html'
          }
	}
);