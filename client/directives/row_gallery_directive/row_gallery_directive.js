angular.module('myApp').directive('rowGallery', function () {
    var controller = ['$scope', function ($scope) {
    }];
      
    return {
          	restrict: 'EA',
            scope: {
	            galleryContents: '='
	        },
          	controller: controller,
          	templateUrl: 'directives/row_gallery_directive/row_gallery_directive.html'
          }
	}
);