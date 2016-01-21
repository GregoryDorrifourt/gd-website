'use strict'

angular.module('ipeaProjectApp')
	.animation('.fadeScreen', function(){
		return {
			enter:function(element,done){
				TweenMax.from(element, 1, {delay:0.5,opacity:0, ease:Strong.easeOut, onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 1, {opacity:0, ease:Strong.easeOut, onComplete:done});
			}
		};
	})
	.animation('.fadeLoading', function(){
		return {
			enter:function(element,done){
				TweenMax.from(element, 1, {opacity:0, ease:Strong.easeOut, onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 1, {opacity:0, ease:Strong.easeOut, onComplete:done});
			}
		};
	})
	.animation('.toggle', function(){
		return {
			enter:function(element,done){
				TweenMax.from(element, 0.5, {opacity:0, height:0, ease:Strong.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.5, {opacity:0,height:0, ease:Strong.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.toggleBtn', function(){
		return {
			enter:function(element,done){
				TweenMax.from(element, 0.5, {opacity:0, ease:Strong.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.5, {opacity:0,ease:Strong.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.toggleSlow', function(){
		return {
			enter:function(element,done){
				TweenMax.from(element, 1, {opacity:0, height:0, ease:Strong.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 1, {delay:1,opacity:0,height:0, margin:0, padding:0, ease:Strong.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.toggleSlowNow', function(){
		return {
			enter:function(element,done){
				TweenMax.from(element, 1, {opacity:0, height:0, ease:Strong.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 1, {opacity:0,height:0, margin:0, padding:0, ease:Strong.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.slideup', function(){
		return {
			enter:function(element,done){
				TweenMax.from($("img",element), 1, {marginTop:150, delay:0.3, ease:Strong.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to($("img",element), 1, {marginTop:150, ease:Strong.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.flecheToggle', function(){
		return {
			enter:function(element,done){
				TweenMax.from(element, 1, {top:0, delay:0.8, ease:Strong.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 1, {top:0, ease:Strong.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.random-tl', function(){
		return {
			enter:function(element,done){
				TweenMax.set(element, {rotation:22-Math.random()*45});
				TweenMax.from(element, 1+Math.random(), {delay:1,rotation:10-Math.random()*20, top:-1000, left:-1000,autoAlpha:0, marginTop:150 , ease:Expo.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.8, {delay:0,autoAlpha:0,rotation:10-Math.random()*20,top:-1000, left:-1000, marginTop:-150, ease:Sine.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.random-t', function(){
		return {
			enter:function(element,done){
				TweenMax.set(element, {rotation:22-Math.random()*45});
				TweenMax.from(element, 1+Math.random(), {delay:1,rotation:10-Math.random()*20, top:-1000, autoAlpha:0, marginTop:150 , ease:Expo.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.8, {delay:0.1,autoAlpha:0,rotation:10-Math.random()*20,top:-1000, marginTop:-150, ease:Sine.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.random-tr', function(){
		return {
			enter:function(element,done){
				TweenMax.set(element, {rotation:22-Math.random()*45});
				TweenMax.from(element, 1+Math.random(), {delay:1,rotation:10-Math.random()*20, top:-1000, right:-1000,autoAlpha:0, marginTop:150 , ease:Expo.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.8, {delay:0.2,autoAlpha:0,rotation:10-Math.random()*20,top:-1000, right:-1000, marginTop:-150, ease:Sine.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.random-bl', function(){
		return {
			enter:function(element,done){
				TweenMax.set(element, {rotation:22-Math.random()*45});
				TweenMax.from(element, 1+Math.random(), {delay:1,rotation:10-Math.random()*20, top:"1000px!important", left:-1000,autoAlpha:0, marginTop:150 , ease:Expo.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.8, {delay:0.3,autoAlpha:0,rotation:10-Math.random()*20,top:"1000px!important", left:-1000, marginTop:-150, ease:Sine.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.random-b', function(){
		return {
			enter:function(element,done){
				TweenMax.set(element, {rotation:22-Math.random()*45});
				TweenMax.from(element, 1+Math.random(), {delay:1,rotation:10-Math.random()*20, top:"1000px!important", autoAlpha:0, marginTop:150 , ease:Expo.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.8, {delay:0.4,autoAlpha:0,rotation:10-Math.random()*20,top:"1000px!important", marginTop:-150, ease:Sine.easeOut,  onComplete:done});
			}
		};
	})
	.animation('.random-br', function(){
		return {
			enter:function(element,done){
				TweenMax.set(element, {rotation:22-Math.random()*45});
				TweenMax.from(element, 1+Math.random(), {delay:1,rotation:10-Math.random()*20, top:"1000px!important", right:-1000,autoAlpha:0, marginTop:150 , ease:Expo.easeOut,  onComplete:done});
			},
			leave: function(element,done){
				TweenMax.to(element, 0.8, {delay:0.5,autoAlpha:0,rotation:10-Math.random()*20,top:"1000px!important", right:-1000, marginTop:-150, ease:Sine.easeOut,  onComplete:done});
			}
		};
	});
