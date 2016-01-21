'use strict';

/**
 * @ngdoc function
 * @name gdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gdApp
 */
angular.module('gdApp')
    .controller('MainCtrl', ['$scope', function ($scope) {
	  
	  $scope._intro = false;
	  $scope.kc_ok = false;

	   /* 	- Tableau aléatoire */
	  function shuffle(array) {
	    var m = array.length, _m = array.length, t, i;
	    while (m) {
		  i = Math.floor(Math.random() * m--);
		  t = array[m];
		  array[m] = array[i];
		  array[i] = t;
	    }
	  	$scope._color = array[_m-1].color;
	    return array;
	  }

	  $scope.colorsArray = shuffle([{color:'#2470b2'}, {color:'#D4422F'}, {color:'#FFB708'}, {color:'#009856'}]);
	  $scope.sidesArray =['left','top','right','bottom'];

	  var kc = new Konami(function(){
	  	$scope.kc_ok = true;
	  	window.location = '#/prive';
	  });

	  $scope.introEnded = function(){
	  	return $scope._intro;
	  };
	  $scope.endIntro = function(){
	  	$scope._intro = true;
	  };

	 



  }])
  .controller('AboutCtrl', ['$scope', function($scope){

  }])
  .controller('PriveCtrl', ['$scope', function($scope){

  }])

;
/************ FONCTIONS ***************/

function getBottom() {
	var h = ($(window).height()- $('.intro').height())/2 - 40;
	return h;
}

/**************************************/
