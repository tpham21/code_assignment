angular.module('myApp').directive('horizontalGallery', function () {
    var controller = ['$scope', function ($scope) {
    }];
      
    return {
          	restrict: 'EA',
            scope: {
	            galleryContents: '='
	        },
          	controller: controller,
          	templateUrl: 'directives/horizontal_gallery_directive/horizontal_gallery_directive.html'
          }
	}
);