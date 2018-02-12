angular.module('myApp').directive('columnGallery', function () {
    var controller = ['$scope', '$window', function ($scope, $window) {
         angular.element($window).bind('resize', function(){
              var width = $window.innerWidth;
              setSplit(width);
               $scope.$digest();
        });

        var setSplit = function(width){
             if(width>1280 && $scope.windowWidth <= 1280)
                 $scope.columnContents = splitColumns(3, $scope.galleryContents);
              else if(width>960 && $scope.windowWidth<=960)
                $scope.columnContents= splitColumns(2, $scope.galleryContents);
              else if(width<960 && ($scope.windowWidth>=960 || $scope.windowWidth===0))
                $scope.columnContents = [$scope.galleryContents];
              $scope.windowWidth = width;
        }


        var splitColumns = function(divisor, contents){
          var columnContents =  [];
          for(var i = 0; i < divisor; i++)
            columnContents.push([]);

          for(var i = 0; i< contents.length; i++)
            columnContents[i % divisor].push(contents[i]);
          return columnContents
        }

        $scope.windowWidth = 0;
        setSplit($window.innerWidth);

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
          	templateUrl: 'directives/column_gallery_directive/column_gallery_directive.html'
          }
	}
);