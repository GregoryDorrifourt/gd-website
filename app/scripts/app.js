'use strict';

/**
 * @ngdoc overview
 * @name gdApp
 * @description
 * # gdApp
 *
 * Main module of the application.
 */
angular
  .module('gdApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/a-propos', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/veille', {
        templateUrl: 'views/veille.html',
        controller: 'VeilleCtrl'
      })
      .when('/prive', {
        templateUrl: 'views/private.html',
        controller: 'PriveCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
  }])
  .run(['$rootScope','$timeout', function ($rootScope,$timeout) {
    $rootScope.introComplete = false;
    $rootScope.$on('INTRO_START',function(){
      $rootScope.introComplete = false;
      $timeout(function(){$rootScope.$apply();});
    });
    $rootScope.$on('INTRO_COMPLETE',function(){
      $rootScope.introComplete = true;
      $timeout(function(){$rootScope.$apply();})
    });
    $rootScope.isIntroComplete = function (){
      return $rootScope.introComplete;
    };

    $rootScope.menuOpened = false;
    $rootScope.menuOpenedResp = false;

    $rootScope.showMenu = function(){
      var viewpane = $('.viewpane');
      var navBtns =$('li', 'nav[data-type="desktop"] ul');
      var nav =$('nav[data-type="desktop"]');


      var tl = new TimelineMax();
      if(!$rootScope.menuOpened){
        //tl.set($('body'),{backgroundColor:$scope.rColor});
        //tl.set(viewpane, {transformPerspective:600, transformOrigin:"left 50%", autoAlpha:1, rotationY:0},0);
        //tl.to(viewpane, 0.8, {autoAlpha:0.5, rotationY:5, scale:0.8, left:100, ease:Power2.easeOut},0);
        tl.staggerTo(navBtns, 0.5, {marginLeft:0, ease:Power2.easeOut},0.1,0);
        tl.set(nav,{top:0},0);
        tl.to(nav,0.5,{top:'50%', ease:Power2.easeOut},0);
        tl.to(nav,0.5,{marginTop:-nav.height()/2, ease:Power2.easeOut},0.5);
        $rootScope.menuOpened = true;
      }
      else{
        tl.staggerTo(navBtns, 0.5, {marginLeft:'4em', ease:Power2.easeOut},-0.1,0);
        tl.to(nav,0.5, { marginTop:0, ease:Power2.easeOut},0.3);
        //tl.to(viewpane, 0.5, {autoAlpha:1, rotationY:0, scale:1, left:0, ease:Power2.easeOut},0);
        $rootScope.menuOpened = false;
      }   
    };
    $rootScope.showMenuResp = function(){
      $rootScope.menuOpenedResp = !$rootScope.menuOpenedResp;
    };
  }]);
  
