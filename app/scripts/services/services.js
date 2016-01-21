'use strict';

/**
 * @ngdoc function
 * @name gdApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gdApp
 */
/**
* gdApp Module
*
* Description
*/
angular.module('gdApp')
.service('DataService', ['$rootScope', '$timeout', '$window', '$http', '$q', function ($rootScope,$timeout,$window,$http,$q) {
	var that = this;
	that.dataVeille = [];
	
	that.getDataVeille =function(){
		var deferred = $q.defer();
		if(that.dataVeille.length>0){
			deferred.resolve(that.dataVeille);
		}
		else{
			$http.get('json/veille.js').success(function(data){
				that.dataVeille = data;
				deferred.resolve(data);
			}).error(function(){
				deferred.reject('ERR_LOAD');
			});
		}

		return deferred.promise;
	};
}]);