
angular.module('myApp').factory('DocumentService',['$resource', '$location', 'ENV', function($resource, $location, ENV) {
    var ApiURL = ENV.ApiURL;
    return $resource(ApiURL + '/:id',{id:'@id'},{
        countDocument:{
            url: ApiURL+'/count',
            method: 'GET',
            isArray: false,
            params: {}
        },
        update:{
            method: 'PUT'
        }
    });
}]);