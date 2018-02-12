angular.module('myApp', [
	'ngRoute', 
  'ngResource',
	'ngAnimate',
  'ngSanitize',
	'ngAria',
	'ngMaterial',
	'config',
	'angularCSS',
  'md.data.table'
	])

	.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {
		$routeProvider
       .when("/documents/new", {
              templateUrl: "create_document/create_document.html", 
              controller:'documentDetailCtrl',
               css: 'create_document/create_document.css'
      })
      .when("/documents/:documentId", {
              templateUrl: "create_document/create_document.html", 
              controller:'documentDetailCtrl',
               css: 'create_document/create_document.css'
      }) 
        .when("/documents", {
              templateUrl: "list_documents/list_documents.html", 
              controller:'documentListCtrl',
               css: 'list_documents/list_documents.css'
      })
      .otherwise({redirectTo: "/documents"});
            $locationProvider.html5Mode(true);
		 var whiteMap = $mdThemingProvider.extendPalette('grey', {
		    '500': '#ffffff',
		    'contrastDefaultColor': 'dark'
		  });
  			$mdThemingProvider.definePalette('white', whiteMap);

}]);