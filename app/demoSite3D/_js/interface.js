$(document).ready(function(e) {
	$(".btnmenu", "#container").click(function(e) {
		showMenu()
	});
	$(".btnclose", "#menu").click(function(e) {
		hideMenu()
	});
});

function showMenu(){
	var container = $("#container");
	var tl = new TimelineMax();
	tl.to(container, 0, {transformPerspective:600, transformOrigin:"left 50%", autoAlpha:1, rotationY:0})
	tl.to(container, 0.5, {autoAlpha:0.5, rotationY:20, scale:0.8, left:100, ease:Power2.easeOut})
	$("li", "#menu").each(function(index, element) {
		tl.to($(element), 0, {autoAlpha:0, marginLeft:200},0)
		tl.to($(element), 0.5, {autoAlpha:1, marginLeft:0},0+0.1*index)
	});
}

function hideMenu(){
	var container = $("#container");
	var tl = new TimelineMax();
	tl.to(container, 0.5, {autoAlpha:1, rotationY:0, scale:1, left:0, ease:Power2.easeOut})
	
}