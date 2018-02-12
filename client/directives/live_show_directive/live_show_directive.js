angular.module('myApp').directive('liveShowGallery', function () {
    var controller = ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {
       $scope.selectedIndex = 0;
       $scope.title = $scope.galleryContents && $scope.galleryContents[$scope.selectedIndex].title.info?$scope.galleryContents[$scope.selectedIndex].title.info:"";
       $scope.subtitle = $scope.galleryContents && $scope.galleryContents[$scope.selectedIndex].subtitle.info?$scope.galleryContents[$scope.selectedIndex].subtitle.info:"";
       
        $interval(function () {
            $scope.selectedIndex = ($scope.selectedIndex === $scope.galleryContents.length-1)?0:($scope.selectedIndex + 1);
            console.log();
        }, 8000);
    }];
      
    return {
          	restrict: 'EA',
            scope: {
	            galleryContents: '='
	        },
          	controller: controller,
          	templateUrl: 'directives/live_show_directive/live_show_directive.html'
          }
	}
);