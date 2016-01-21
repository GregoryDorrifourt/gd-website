'use strict';

/**
 * @ngdoc function
 * @name gdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdApp
 */
angular.module('gdApp')
    .controller('MainCtrl', ['$scope','$rootScope' ,function($scope,$rootScope) {

		/* 	- Tableau aléatoire */
		function shuffle(array, prime) {
			var m = array.length, _m = array.length, t, i;
			while (m) {
			  i = Math.floor(Math.random() * m--);
			  t = array[m];
			  array[m] = array[i];
			  array[i] = t;
			}
			if(prime){ $scope.rColor = array[_m-1].color; }
			return array;
		}

		$scope.setColor = function(color){
			$scope.rColor = color;
			//$scope.$apply();
		};

		$scope.colorsArray = shuffle([{color:'#2470b2'}, {color:'#D4422F'}, {color:'#FFB708'}, {color:'#009856'}],true);
		$scope.subcolorsArray = shuffle([{color:'#704294'}, {color:'#13b2b8'}, {color:'#f36d14'}],false);
	  	$scope.sidesArray =['left','top','right','bottom'];

		$scope.kcOk = false;
		var kc = new Konami(function(){
			$scope.kcOk = true;
			$scope.$apply();
			window.location = '#/prive';
		});

		
		$scope.goto = function(to, resp){
			window.location = '#/'+to;
			if(resp){
				$rootScope.menuOpenedResp = false;
			}
		};

  }])
  .controller('HomeCtrl', ['$scope', function($scope) {

  }])
  .controller('AboutCtrl', ['$scope', '$rootScope',function($scope,$rootScope){
  	$rootScope.$emit('INTRO_COMPLETE');

  	$scope.getAge = function(){
  		var now = new Date();
  		var anniv = new Date('1984-09-19');

  		var t = Math.floor((now-anniv)/(365*24*60*60*1000));

  		return t;
  	};

  	$scope.getExp = function(){
  		var now = new Date();
  		var anniv = new Date('2004-11-01');

  		var t = Math.round((now-anniv)/(365*24*60*60*1000));

  		return t;
  	};
  }])
  .controller('VeilleCtrl', ['$scope', '$rootScope', 'DataService',function($scope,$rootScope,DataService) {
  	$rootScope.$emit('INTRO_COMPLETE');
  	$scope.overlayClicked = false;
  	
  }])
  .controller('ContactCtrl', ['$scope', '$rootScope', function($scope,$rootScope) {
  	$rootScope.$emit('INTRO_COMPLETE');
  }])
  .controller('PriveCtrl', ['$scope', '$rootScope',function($scope,$rootScope){
	$rootScope.$emit('INTRO_COMPLETE');
  }])

;
