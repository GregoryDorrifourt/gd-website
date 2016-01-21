'use strict';

angular.module('gdApp')
  .directive('backColor', function(){
	  return function(scope, element, attrs){
        attrs.$observe('backColor', function(value) {
            element.css({
                'background-color': value
            });
        });
	  };
  })
  .directive('backImg', function(){
      return function(scope, element, attrs){
          attrs.$observe('backImg', function(value) {
              element.css({
                  'background-image'	: 'url(' + value +')',
                  'background-size' 	: 'cover',
                  'background-position' : 'center'
              });
          });
      };
  })
  .directive('textColor', function(){
	  return function(scope, element, attrs){
        attrs.$observe('textColor', function(value) {
            element.css({
                'color': value
            });
        });
	  };
  })
  .directive('intro', ['$timeout','$rootScope',function($timeout,$rootScope){
  	return {
  		scope:{
  			colorsArray : '=colors',
  			sidesArray : '=sides',
  			_color : '=color'},
  		restrict: 'E',
  		templateUrl: 'partials/intro.html',
  		link: function(scope, element) {
  			$timeout(function(){
  				$rootScope.$emit('INTRO_START');
					var tl = new TimelineMax({delay:0.5, onComplete:function(){
						$rootScope.$emit('INTRO_COMPLETE');
						if(!$rootScope.menuOpened){
							$timeout($rootScope.showMenu, 1000);
						}
					}});
					var ast = $('.asterisque', element), 
							svg = $('.asterisque > svg', element),  
							gd = $('.gd', element), 
							job = $('.job', element), 
							colors = $('.colors', element), 
							incolors = $('.colors > div', element),
							paris = $('.paris', element);

					tl.set(ast, {background:scope._color})
						.to(ast, 0.8, {width:20, height:20, rotation:0, ease:Strong.easeOut})
						.to(ast,1, {width:200, marginLeft:-100, borderRadius:20, ease:Strong.easeOut},0.5)
						.to(ast,1, {height:200, marginTop:-100, rotation:0,ease:Expo.easeOut},1.3)
						.to(ast,1, {top:60, ease:Expo.easeOut},3.1)
						.to(svg,1, {top:0, ease:Expo.easeOut},2.4)
						.staggerTo(incolors, 1, {top:0, left:0, right:0, bottom:0, ease:Expo.easeOut},0.5,0.5)
						.to(colors, 0.5, {autoAlpha:0, ease:Strong.easeOut},3.5)
						.to(gd, 0.8, {height:'1.5em', ease:Strong.easeOut},3.5)
						.to(job,0.8, {height:'1.5em', ease:Strong.easeOut},3.8)
						.to(paris, 0.8,{marginTop:'2em',height:'1.5em' , autoAlpha:1, ease:Strong.easeOut},4.2);
  				},500);
				/*	- Intro timeline */
				
	    }
  	};
  }])
	.directive('gdNav', [function () {
		return {
			restrict: 'A',
			templateUrl:'partials/nav.html'
		};
	}])
	.directive('respNav', [function () {
		return {
			restrict: 'A',
			templateUrl:'partials/nav-responsive.html'
		};
	}])
	.directive('footer', [function () {
		return {
			restrict: 'E',
			template:'<div><i ng-repeat="color in colorsArray" text-color="{{color.color}}" ng-click="setColor(color.color)" class="fa" ng-class="{\'fa-circle-o\':rColor!==color.color, \'fa-circle\':rColor===color.color}"></i><i ng-repeat="color in subcolorsArray" text-color="{{color.color}}" ng-click="setColor(color.color)" class="fa" ng-class="{\'fa-circle-o\':rColor!==color.color, \'fa-circle\':rColor===color.color}"></i></div>'
			//+'<div class="footer-text">2015 - gregorydorrifourt.fr - développeur front-end - AngularJS/jQuery/HTML5/CSS3</div>'
		};
	}])
;