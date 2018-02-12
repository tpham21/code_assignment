angular.module('myApp').directive('leftMenu', function () {
    var controller = ['$scope', '$mdSidenav', '$location', function ($scope, $mdSidenav, $location) {
        $scope.selectedItem = $location.path();
        $scope.hoveredItem = "";   

        $scope.$watch('onLeftMenuOpen', function(evt, val){
            if($scope.onLeftMenuOpen!==null) $mdSidenav('left').toggle();
        });

        $scope.$on('$routeUpdate', function(){
           var location = $location.path();
           console.log(location);
           $scope.selectedItem = location;
        });

        $scope.changeSelect = function(item){
          $scope.selectedItem = item.url;
          $location.path(item.url);
        }
    }];
      
    return {
          	restrict: 'EA',
            scope: {
	            menuContent: '=',
              onLeftMenuOpen:'='
	        },
          	controller: controller,
         	templateUrl: 'directives/left_menu_directive/left_menu_directive.html'
          }
	}
);