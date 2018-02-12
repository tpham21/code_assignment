angular.module('myApp').directive('infoGallery', function () {
    var controller = ['$scope', function ($scope) {
        $scope.onCardSelect = function(content){
          $scope.onSelect()(content);
        }
    }];
      
    return {
          	restrict: 'EA',
            scope: {
	            galleryContents: '=',
              onSelect:'&?'
	        },
          	controller: controller,
          	templateUrl: 'directives/info_gallery_directive/info_gallery_directive.html'
          }
	}
);