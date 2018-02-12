angular.module('myApp').controller('documentDetailCtrl',['$scope','$location', '$timeout', '$location', '$route', '$routeParams', 'DocumentService', function($scope, $location, $timeout, $location, $route,  $routeParams, DocumentService){
/*	$scope.documentObj={
		"title":"",
		"subtitle":"",
		"formattedText":"",
		"image":{
			"imageUri":""
		},
		"buttons":[{"title":"","openUriAction":{"uri":""}}]
	}	
*/	
	var init = function(){
		var documentId = $routeParams.documentId;
		console.log(documentId);
		if(documentId){
			DocumentService.get({id:documentId}, function(res){
				$scope.documentObj = res;
			},
			function(er){
				$location.path("/documents");
			});
		}else{
			$scope.documentObj={
				"title":"",
				"subtitle":"",
				"formattedText":"",
				"image":{
					"imageUri":""
				},
				"buttons":[{"title":"","openUriAction":{"uri":""}}]
			}
		}
	}();


	$scope.addButton = function(option){
		if(option){
			$scope.documentObj.buttons.push({"title":"","openUriAction":{"uri":""}});
			return;
		}
		$scope.documentObj.buttons.splice($scope.documentObj.buttons.length-1, 1);
	}

	$scope.showPreview = function(){
		mappingDisplay();
	}

	$scope.cancelPreview = function(){
		$scope.onPreview = false;
	}

	$scope.onCancel = function(){
		$location.path("/list_documents");
	}

	$scope.onSubmit = function(option){
		if(option){
			var nDoc = angular.copy($scope.documentObj);
			delete nDoc._id;
			var file = new Blob([JSON.stringify(nDoc,null, '\t')], {type: 'application/json'});
       		var fileURL = URL.createObjectURL(file);
       		var downloadLink = angular.element('<a></a>');
            downloadLink.attr('href',fileURL);
            downloadLink.attr('download', 'document.json');
			downloadLink[0].click();
			downloadLink.remove();
		}else{
			if($scope.documentObj._id)
				updateDocument($scope.documentObj);
			else
				createDocument($scope.documentObj);
		}
	}

	var updateDocument = function(doc){
		DocumentService.update({id:doc._id}, doc, function(res){
			$location.path("/documents");
		}, function(err){

		});
	}

	var createDocument = function(option, doc){
		var dS = new DocumentService(doc);
		dS.$save(function(res){
			$location.path("/documents");
		},function(err){});
	}

	var mappingDisplay = function(){
		$scope.onPreview = false;		
		$scope.cardContent = {
			title:{fontColor:"black", info:""},
			subtitle:{ fontColor:"black", info:""},
			img:{url:""},
			descriptions:{fontColor:"black", infos:[]},
			buttons:[]
		}
		if(!$scope.documentObj.title) return;
		$scope.cardContent.title.info = $scope.documentObj.title;
		if(!$scope.documentObj.subtitle) return;
		$scope.cardContent.subtitle.info = $scope.documentObj.subtitle;
				console.log("passing here1");

		if(!$scope.documentObj.image || !$scope.documentObj.image.imageUri) return;
		$scope.cardContent.img.url = $scope.documentObj.image.imageUri;
				console.log("passing here 2");
		for(var i = 0; i< $scope.documentObj.buttons.length; i++){
			if(!$scope.documentObj.buttons[i] ||!$scope.documentObj.buttons[i].title || !$scope.documentObj.buttons[i].openUriAction || !$scope.documentObj.buttons[i].openUriAction.uri)
				return;
			$scope.cardContent.buttons.push({uri: $scope.documentObj.buttons[i].openUriAction.uri, title: $scope.documentObj.buttons[i].title});
		}
		console.log("passing here");
		$scope.cardContent.descriptions.infos.push($scope.documentObj.formattedText);
		$scope.onPreview = true;		

	}
}])