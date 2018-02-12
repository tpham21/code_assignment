angular.module('myApp').controller('documentListCtrl',['$scope','$location', '$timeout', '$location', '$route', '$routeParams', 'DocumentService', function($scope, $location, $timeout, $location, $route,  $routeParams, DocumentService){
	var getDocuments = function(offset, limit, callback){	
		DocumentService.query({'limit':limit, 'offset': offset}, function(res){
			$scope.documents = res;
			callback(null, null);
		}, function(err){
			$scope.documents = [];
			callback(err, null);
		});
	}

	var getDocumentsCount = function(callback){
		DocumentService.countDocument({},function(res){
			$scope.pagination.count = res.count;
			callback(null, null);
		},function(err){
			console.log(err);
			$scope.pagination.count = 0;
			callback(err, null);
		});
	}

	var setupTileView = function(){
		$scope.tileDocuments = [];
		for(var i=0; i<$scope.documents.length; i++)
			$scope.tileDocuments.push(mappingDisplay($scope.documents[i]));
		
	}

	function mappingDisplay(documentObj){
		var cardContent = {
			_id: documentObj._id,
			title:{fontColor:"black", info:""},
			subtitle:{ fontColor:"black", info:""},
			img:{url:""},
			descriptions:{fontColor:"black", infos:[]},
			buttons:[]
		}
		cardContent.title.info = documentObj.title;
		cardContent.subtitle.info = documentObj.subtitle;
		cardContent.img.url = documentObj.image.imageUri;
		return cardContent;
	}

	var viewTemplates = {
		"list":"list_documents/listView.html",
		"tile":"list_documents/tileView.html"
	}

	var init = function(){
		$scope.selected = [];
		$scope.pagination = {
			limit: 10,
			page: 1,
			count:0,
		}
		getDocumentsCount(function(err, res){
			getDocuments(($scope.pagination.page-1), $scope.pagination.limit, function(err, res){
				$scope.onViewSwitch('tile');
			});
		});
	}();

	$scope.onViewSwitch = function(option){
		if(option==='tile')
			setupTileView();
		$scope.viewOption = option;
		$scope.documentViewTemplate  =  "";
		$timeout(function(){
			$scope.documentViewTemplate = viewTemplates[option];
		},100);
	}	

	$scope.deleteDocument = function(){
		console.log($scope.selected[0]);
		if($scope.selected.length>0){
			DocumentService.delete({id:$scope.selected[0]._id}, function(res){
				$scope.logPagination();
				$scope.selected = [];
				$scope.pagination.count --;
			}, function(err){

			});
		}
	}

	$scope.newDocument = function(){
		console.log("im here");
		$location.path('/documents/new');
	}

	$scope.onContentSelect = function(content){
		$location.path('documents/' + content._id);

	}

	$scope.onItemSelect = function(item){
		console.log("here");
		console.log($scope.selected);
	}



	$scope.logPagination = function(){
		getDocuments(($scope.pagination.page-1), $scope.pagination.limit, function(err,result){
			if($scope.viewOption==='tile'){
				setupTileView();
				console.log($scope.tileDocuments);
			}
			$scope.documentViewTemplate = "";
			$timeout(function(){
				$scope.documentViewTemplate = viewTemplates[$scope.viewOption];
			},100);
		});
	}

}])