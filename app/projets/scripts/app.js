'use strict';


/**
* projets Module
*
* Description
*/
angular.module('projets', ['ngAnimate'])
.controller('MainCtrl', ['$scope', function ($scope) {
	$scope.projets = json.projets;
	$scope.kcOk = false;
	var kc = new Konami(function(){
		$scope.kcOk = true;
		$scope.$apply();
	});

}])
.animation('.toggle', function(){
	return {
		enter:function(element,done){
			TweenMax.from(element, 0.5, {opacity:0, height:0, ease:Strong.easeOut, onComplete:done});
		},
		leave: function(element,done){
			TweenMax.to(element, 0.5, {opacity:0,height:0, ease:Strong.easeOut, onComplete:done});
		}
	};
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

var json = {
	projets:[
		{
			"title":"Serre à voeux",
			"client":"Interne",
			"thumb":"images/serre-a-voeux.png",
			"annee":"2011",
			"keywords":"Flash",
			"work":"Développement et animation",
			"url":"http://www.clairetnet.com/serre-a-voeux/",
			"size":"lg"
		},
		{
			"title":"Un voeu pour le développement",
			"client":"Interne",
			"thumb":"images/voeux-afd.png",
			"annee":"2012",
			"keywords":"Flash",
			"work":"Développement et animation",
			"url":"http://www.objectif-developpement.fr/voeux",
			"size":"lg"
		},
		{
			"title":"Calendrier de l'après",
			"client":"Interne",
			"thumb":"images/calendrier-apres.png",
			"annee":"2014",
			"keywords":"jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://www.clair-et-net.com/calendrier-apres/",
			"size":"lg"
		},
		{
			"title":"L'Angélique",
			"client":"Restaurant",
			"thumb":"images/l-angelique.png",
			"annee":"2010",
			"keywords":"Flash",
			"work":"Développement et animation",
			"url":"http://www.langelique.fr/",
			"size":"sm"
		},
		{
			"title":"Kreaman",
			"client":"Exacompta",
			"thumb":"images/kreaman.png",
			"annee":"2009",
			"keywords":"Flash",
			"work":"Développement et animation",
			"url":"http://www.exacompta.com/kreaman/",
			"size":"lg"
		},
		{
			"title":"Save the Web",
			"client":"Interne",
			"thumb":"images/save-the-web.png",
			"annee":"2012",
			"keywords":"Flash",
			"work":"Développement et animation",
			"url":"http://www.clairetnet.com/save-the-web/",
			"size":"sm"
		},
		{
			"title":"McKay",
			"client":"Cabinet d'avocats",
			"thumb":"images/mckay.png",
			"annee":"2012",
			"keywords":"jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://www.mckay-avocats.com/",
			"size":"sm"
		},
		{
			"title":"Galerie Barrere",
			"client":"Galerie d'art",
			"thumb":"images/galerie-barrere.png",
			"annee":"2012",
			"keywords":"jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://www.artasie.com/fr",
			"size":"sm"
		},
		{
			"title":"Configurateur de porte blindées",
			"client":"Picard Serrures",
			"thumb":"images/picard-serrures.png",
			"annee":"2013",
			"keywords":"jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://maporte.picard-serrures.com/",
			"size":"sm"
		},
		{
			"title":"Site personnel",
			"client":"Personnel",
			"thumb":"images/gd.png",
			"annee":"2015",
			"keywords":"AngularJS, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://www.gregorydorrifourt.fr/",
			"size":"sm"
		},
		{
			"title":"L'AFD en 2014",
			"client":"AFD",
			"thumb":"images/afd-chiffres.png",
			"annee":"2014",
			"keywords":"AngularJS, jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://www.afd.fr/webdav/site/afd/shared/L_AFD/AFD-2014/afd-chiffres/index.html",
			"size":"sm"
		},
		{
			"title":"AFD - Carte des projets",
			"client":"AFD",
			"thumb":"images/afd-carte.png",
			"annee":"2014",
			"keywords":"AngularJS, jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://carte.afd.fr/afd/fr/",
			"size":"sm"
		},
		{
			"title":"Playground jQuery",
			"client":"Personnel",
			"thumb":"images/test-pxl.png",
			"annee":"2013",
			"keywords":"Playground, jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://gregorydorrifourt.fr/projets/testGSAP/test3.html",
			"size":"sm"
		},
		{
			"title":"Playground Canvas",
			"client":"Personnel",
			"thumb":"images/test-canvas.png",
			"annee":"2013",
			"keywords":"Playground, jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://gregorydorrifourt.fr/projets/testGSAP/test2.html",
			"size":"sm"
		},
		{
			"title":"Playground Livres",
			"client":"Personnel",
			"thumb":"images/demo-livres.png",
			"annee":"2013",
			"keywords":"Playground, jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://gregorydorrifourt.fr/projets/demoLivres/",
			"size":"sm"
		},
		{
			"title":"Configurateur",
			"client":"Solar",
			"thumb":"images/solar.png",
			"annee":"2013",
			"keywords":"jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://www.solar-energeasy.com/be/fr/simulation-photovoltaique/calcul",
			"size":"sm"
		},
		{
			"title":"Actions traitements",
			"client":"Solar",
			"thumb":"images/actions.png",
			"annee":"2013",
			"keywords":"jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://www.actions-traitements.org/",
			"size":"sm"
		},
		{
			"title":"Etude",
			"client":"Etude",
			"thumb":"images/etude.png",
			"annee":"2015",
			"keywords":"AngularJS, jQuery/Javascript, HTML5, CSS3",
			"work":"Intégration, développement et animation",
			"url":"http://gregorydorrifourt.fr/projets/enquete/",
			"size":"sm"
		}


	]
};
