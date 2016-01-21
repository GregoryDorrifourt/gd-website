'use strict';

angular.module('ipeaProjectApp')
	.directive('polaroid', function () {
		return function(scope, element, attrs){
			TweenMax.set(element, {scale:1, rotation:10-Math.random()*20})
			$(element).hover(function(e){
				TweenMax.to(element, 0.5, {scale:1.2, rotation:0, ease:Strong.easeOut})
			}, function(e){
				if(!$(this).hasClass("active"))
					TweenMax.to(element, 0.5, {scale:1, rotation:10-Math.random()*20, ease:Strong.easeOut})
			})
			$(element).click(function(e){
				if($(".polaroid.active").length>0){
					var ele = $(".polaroid.active");
					TweenMax.to($(" .overlay",ele), 0.5, {autoAlpha:0, ease:Strong.easeOut })
					TweenMax.to(ele, 0.5, {scale:1, rotation:10-Math.random()*20, ease:Strong.easeOut})
					ele.removeClass("active")
				}
				
				$(this).addClass("active")
				TweenMax.to($(".overlay",element), 0.5, {autoAlpha:1, ease:Strong.easeOut })
				TweenMax.to(element, 0.5, {scale:1.2, rotation:0, ease:Strong.easeOut})
			});
		}
	})
	.directive('backImg', function(){
	    return function(scope, element, attrs){
	        attrs.$observe('backImg', function(value) {
	            element.css({
	                'background-image': 'url(' + value +')',
	                'background-size' : 'cover'
	            });
	        });
	    }
	})

