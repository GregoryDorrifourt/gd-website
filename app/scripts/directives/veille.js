'use strict';

/**
* gdApp Module
*
* Description
*/
angular.module('gdApp')
.directive('diaporama', ['$window','$timeout','$filter','DataService',function ($window,$timeout,$filter,DataService) {
	
	function DiaporamaCtrl(scope){
		this.scope = scope;
		scope.isLargeScreen = true;
		DataService.getDataVeille().then(function(data){
  			scope.data = data;
	  	},function(msg){
	  		alert(msg);
	  	});
	}
	DiaporamaCtrl.prototype.getScope = function(){
		return this.scope;
	};
	
	DiaporamaCtrl.prototype.setQuery = function(query){
		var that = this;
		if(this.scope.query!==query){
			var arrq = query.split('');
			var str = '';
			angular.forEach(arrq, function(val,key){
				$timeout(function(){
					str += arrq[key];
					that.scope.query = str;
				},key*100);
			});
		}else{
			var arrq = this.scope.query.split('');
			angular.forEach(arrq, function(val,key){
				$timeout(function(){
					arrq = arrq.splice(0, arrq.length-1);
					that.scope.query = arrq.join('');
				},key*50);
			});
		}
	};

	DiaporamaCtrl.prototype.getWidth = function(){
		return this.scope.ww;
	};
	DiaporamaCtrl.prototype.getHeight = function(){
		return this.scope.wh;
	};

	function link(scope, element, attrs) {
		scope.autoplay = true;
		scope.results = [];
		var resultIds = [];
		scope.query = '';

		function resizeHandler(){
			scope.ww = $window.innerWidth;
			scope.wh = $window.innerHeight;
			scope.watcher = scope.ww + scope.wh;
			scope.isLargeScreen = scope.ww > 768;
			$timeout(function(){
				scope.$apply();
			});
		}
		angular.element($window).bind('resize', resizeHandler);
		resizeHandler();

		scope.$watch('watcher', function(){
			if(scope.isLargeScreen && scope.wh<600){
				TweenMax.to(element, 0.5, {scale:0.7});
			}
			else{
				TweenMax.to(element, 0.5, {scale:1});
			}
		});

		scope.$watch('displayed', function(newVal, oldVal){
			if(newVal!==oldVal){
				scope.startDiapo();
			}
		});

		scope.$watch('data',function(){
			if(typeof(scope.data)!=='undefined'){
				scope.data = scope.data.reverse();
				angular.forEach(scope.data, function(val, key){
					resultIds.push(val.id);
				});
				scope.$watch('query',function(newVal, oldVal){
					scope.results = $filter('filter')(scope.data, newVal);
					if(typeof(scope.results)!=='undefined'){
						scope.total = scope.results.length;
						resultIds = [];
					
						angular.forEach(scope.results, function(val, key){
							resultIds.push(val.id);
						});
					}
					if(newVal!==oldVal){
						if(typeof(scope.results)!=='undefined'){
							scope.showDiapo(resultIds[0], scope.autoplay);
							$timeout(function(){
								scope.$apply();
							});
						}
					}
				});
			}
		});

		

		scope.showDiapo = function (index, auto){
			if(scope.currentDiapo !== index){
				scope.currentDiapo = index;
				scope.autoplay = auto;
			}
		};
		scope.playpause = function(){
			scope.autoplay = !scope.autoplay;
			if(scope.autoplay){
				nextDiapo();
			}
		};

		scope.startDiapo = function(){
			scope.overlayClicked = false;
			$timeout(function(){
				nextDiapo();
			},1000);
		};

		function nextDiapo(){
			if(scope.autoplay){
				var indexofcurrent = resultIds.indexOf(scope.currentDiapo);
				scope.currentDiapo = indexofcurrent >= scope.total-1 ? resultIds[0]:resultIds[indexofcurrent+1];
				//scope.showDiapo(diapoToGo, true);
			
				$timeout(function(){
					nextDiapo();
				},5000);
			}
		}
		scope.next = function(){
			// var diapo = scope.currentDiapo >= (scope.total-1)*1 ? 0:scope.currentDiapo+1;
			var indexofcurrent = resultIds.indexOf(scope.currentDiapo);
			var diapo = indexofcurrent >= scope.total-1 ? resultIds[0]:resultIds[indexofcurrent+1];
			scope.showDiapo(diapo, false);
		};
		scope.prev = function(){
			var indexofcurrent = resultIds.indexOf(scope.currentDiapo);
			var diapo = indexofcurrent <= 0 ? resultIds[scope.total-1]:resultIds[indexofcurrent-1];
			scope.showDiapo(diapo, false);
		};

		
		
		scope.currentDiapo = -1;


	}

	return {
		restrict: 'A',
		scope:{
			displayed:'=',
			color:'='
		},
		template:['<diaporama-search-input></diaporama-search-input>',
				'<div class="polaroid" diaporama-polaroid  ng-repeat="item in data | filter:query | orderBy:\'-date\'" data="item" id="{{item.id}}" query="query" current="currentDiapo" ng-click="showDiapo(item.id, false)" color="color"></div>',
				'<diaporama-controls></diaporama-controls>'].join('\n'),
		controller: ['$scope', DiaporamaCtrl],
		link:link
	};
}])
.directive('diaporamaSearchInput', [function(){
	function link(scope, element, attrs, controller){
		scope.removeQuery = function(query){
			controller.setQuery(query);
		};
	}

	return {
		restrict:'E',
		require:'^diaporama',
		template:'<div class="input"><input type="text" ng-model="query" class="search-input" placeholder="Rechercher (inspiration, html, javascript, etc.)"><div class="remove-query fade-animate" ng-click="removeQuery(query)" ng-show="query!==\'\'"><i class="fa fa-times"></i></div></div>',
		link:link

	};
}])
.directive('diaporamaControls', [function () {
	return {
		restrict: 'E',
		require:'^diaporama',
		template:['<div class="trail" ng-show="isLargeScreen">',
				 	'<div class="playpause fade-animate" ng-click="playpause()" ng-show="results.length>1"><i class="fa" ng-class="{\'fa-play\':autoplay, \'fa-pause\':!autoplay}" tooltip="Lecture automatique"></i></div>',
				 	'<div class="puce fade-animate" back-color="{{currentDiapo===item.id ? color:\'#666\'}}" ng-repeat="item in data | filter:query" ng-click="showDiapo(item.id, false)" ng-class="{\'active\':currentDiapo===item.id}" tooltip="{{item.name}}"></div>',
				 '</div>',
				 '<div class="nav next fade-animate" ng-click="next()" ng-show="results.length>1 && isLargeScreen"><span class="glyphicon glyphicon-chevron-right"></span></div>',
				 '<div class="nav prev fade-animate" ng-click="prev()" ng-show="results.length>1 && isLargeScreen"><span class="glyphicon glyphicon-chevron-left"></span></div>',
				 '<div class="nothing fade-animate" ng-show="results.length===0">La recherche a renvoyé <strong>0 résultat</strong></div>'].join('\n')
	};
}])
.directive('diaporamaPolaroid', ['$timeout', function ($timeout) {
	function link(scope, element, attrs, controller) {
		
		controller.getScope().$watch('ww', function(val){
			scope.ww = controller.getWidth();
			scope.wh = controller.getHeight();
			scope.isLargeScreen = val > 768;
			$timeout(function(){
				scope.$apply();
			});
		});

		$timeout(function(){
			var pole = scope.id%2===0 ? -1:1;

			var d = 0;

			function tween(){
				TweenMax.to(element, 0.8, {rotation:40-Math.random()*80, scale:0.5, opacity:1, delay:scope.id*0.1*d, top:200+(400-Math.random()*800), left:290+pole*(400+Math.random()*500),backgroundColor:'#EEE',ease:Cubic.easeOut});
				d = 0;
			}
			scope.iscurrent = scope.current === scope.id*1;

			function tweenCurrent(){
				if(scope.isLargeScreen){
					if(scope.current === scope.id*1){
						TweenMax.to(element,0.5,{top:'50%', left:'50%',scale:1, rotation:0,backgroundColor:'#FFF', ease:Power2.easeOut});
					}
					else{
						tween();
					}
				}
			}
			scope.$watch('current',function(){
				scope.iscurrent = scope.current === scope.id*1;
				tweenCurrent();
			});
			
			scope.$watch('isLargeScreen', function(){
				if(scope.isLargeScreen){
					tweenCurrent();
				}
				else{
					element.removeAttr('style');
				}
			});
			
			element.hover(function(e){
				if(!scope.iscurrent) {
					$(this).css('cursor','pointer');
					if(scope.isLargeScreen){
						TweenMax.to(this, 0.3, {scale:0.6, rotation:0});
					}
				}
				else{
					$(this).css('cursor','default');
				}
			},
			function(e){
				if(!scope.iscurrent) {
					$(this).css('cursor','pointer');
					if(scope.isLargeScreen){
						TweenMax.to(this, 0.3, {scale:0.5, rotation:10-Math.random()*20});
					}
				}
				else{
					$(this).css('cursor','default');
				}
			});
			

			scope.isover = false;
			$('.masque, .icon.goto',element).hover(function(e){
				if(scope.iscurrent || !scope.isLargeScreen) {
					scope.isover = true;
					$timeout(function(){scope.$apply();});
					$(this).css('cursor','pointer');
				}else{
					scope.isover = false;
					$timeout(function(){scope.$apply();});
				}
				
				
				TweenMax.to($('.img',element), 0.5, {scale:1.1, ease:Power2.easeOut});
			},
			function(e){
				scope.isover = false;
				$timeout(function(){scope.$apply();});
			
				TweenMax.to($('.img',element), 0.5, {scale:1, ease:Power2.easeOut});
			});

			


			$('.masque',element).click(function(e){
				if(scope.iscurrent || !scope.isLargeScreen ) {window.open(scope.data.link, '_blank');}
			});

			scope.setQuery = function(query){
				controller.setQuery(query);
			};

		});
	}

	return {
		restrict: 'A',
		scope:{
			data:'=',
			id:'@',
			current:'=',
			color:'=',
			query:'='
		},
		require: '^diaporama',
    	template:['<div class="masque">',
					'<div back-img="images/veille/{{data.image}}" class="img"></div>',
					'<div class="img-overlay fade-animate" ng-show="isover || (isover && isLargeScreen)" back-color="{{color}}"><span>Voir le site</span></div>',
				 '</div>',
				 '<div class="name" ng-hide="iscurrent || !isLargeScreen">{{data.name}}</div>',
				 '<div class="info row" ng-show="iscurrent || !isLargeScreen">',
				 	'<div class="caption col-xs-8 col-sm-10"><strong>{{data.name}}</strong><span>{{data.caption}}</span><em>{{data.keywords}}</em></div>',
				 	'<div class="icon-wrapper col-xs-2 col-sm-1">',
				 		'<a ng-click="setQuery(data.type)" tooltip="{{data.type!==query ?\'Filtrer\':\'Supprimer filtre\'}}" class="icon" back-color="{{color}}"><i class="fa" ng-class="{\'fa-heart\':data.type===\'inspiration\' && data.type!==query, \'fa-code\':data.type===\'outils\' && data.type!==query, \'fa-rss\':data.type===\'news\' && data.type!==query,\'fa-times\':data.type===query}"></i></a>',
				 	'</div>',
				 	'<div class="icon-wrapper col-xs-2 col-sm-1">',
				 		'<a class="icon goto" ng-href="{{data.link}}" target="_blank" back-color="{{color}}"><i class="fa fa-link"></i></a>',
				 	'</div>',
				 '</div>'].join('\n'),
		link: link
	};
}]);