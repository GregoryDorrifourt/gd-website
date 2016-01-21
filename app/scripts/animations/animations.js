'use strict';

/**
* gdApp Module
*
* Description
*/
angular.module('gdApp')
	.animation('.vi', function(){
		return{
			enter:function(element,done){
				TweenMax.from(element, 1, {left:"100%",onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 1, {left:"100%",onComplete:done});
			}
		};
	});