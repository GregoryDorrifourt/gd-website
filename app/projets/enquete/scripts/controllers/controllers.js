'use strict';
var json_data = [{
	cat:"canapes",
	label:"Canapés",
	phrase:"un canapé",
	items:[{id: "1_1"},{id: "1_2"},{id: "1_3"},{id: "1_4"},{id: "1_5"},{id: "1_6"},{id: "1_7"},{id: "1_8"},{id: "1_9"},{id: "1_10"},{id: "1_11"},{id: "1_12"},{id: "1_13"},{id: "1_14"},{id: "1_15"},{id: "1_16"},{id: "1_17"},{id: "1_18"},{id: "1_19"},{id: "1_20"},{id: "1_21"},{id: "1_22"},{id: "1_23"},{id: "1_24"},{id: "1_25"},{id: "1_26"},{id: "1_27"},{id: "1_28"},{id: "1_29"},{id: "1_30"},{id: "1_31"},{id: "1_32"},{id: "1_33"},{id: "1_34"},{id: "1_35"},{id: "1_36"}]
	},
	{
	cat:"tables_basses",
	label:"Tables basses",
	phrase:"une table basse",
	items:[{id: "2_37"},{id: "2_38"},{id: "2_39"},{id: "2_40"},{id: "2_41"},{id: "2_42"},{id: "2_43"},{id: "2_44"},{id: "2_45"},{id: "2_46"},{id: "2_47"},{id: "2_48"},{id: "2_49"},{id: "2_50"},{id: "2_51"},{id: "2_52"},{id: "2_53"},{id: "2_54"},{id: "2_55"},{id: "2_56"},{id: "2_57"},{id: "2_58"},{id: "2_59"},{id: "2_60"},{id: "2_61"},{id: "2_62"},{id: "2_63"},{id: "2_64"},{id: "2_65"},{id: "2_66"},{id: "2_67"},{id: "2_68"},{id: "2_69"},{id: "2_70"},{id: "2_71"},{id: "2_72"}]
	}];

var json_form_data = [
	{question:"Comment allez-vous ?"},
	{question:"Il fait beau aujourd'hui ?"},
	{question:"Quelle heure est-il ?"},
	{question:"Comment allez-vous ?"},
	{question:"Il fait beau aujourd'hui ?"},
	{question:"Quelle heure est-il ?"}
	];

angular.module('ipeaProjectApp')
	.controller('AppCtrl', ["$scope", "$http", "$timeout", function ($scope, $http,$timeout) {
		
		//CUSTOM EVENT LISTENERS
		$scope.loading = false;
		$scope.$on('LOADING', function(){
			$scope.loading = true;
		});
		$scope.$on('LOADING_COMPLETE', function(){
			$timeout(function(){
				$scope.loading = false;
			},1000);
		});


		/*/ VARIABLES /*/
		//{"id":"1_9"},{"id":"2_53"},{"id":"3_81"},{"id":"4_117"}
		$scope.moodboard = [];
		$scope.questionnaire = [];
		

		/*/ PAGES
			+	home : 
			+	form : 
			+	board : 
			+	end : 
		/*/
		$scope.currentPage = "home";
		$scope.setPage = function(page){
			$scope.currentPage = page;
		};
		$scope.isPage = function(page){
			return page === $scope.currentPage;
		};

	}])
	.controller('MainCtrl', function ($scope) {
		
	})
	.controller('BoardCtrl', ["$scope", "$http", "$timeout","$modal", function ($scope, $http, $timeout, $modal) {
		$scope.currentFamily = 0;
		$scope.currentStep = 0;
		$scope.currentSlide = 0;
		$scope.maxSlides = 6;
		$scope.maxStep;
		$scope.selectedItems = [];

		
		//on affiche l'écran de chargement.
		$scope.$emit("LOADING");

		$timeout(function(){
			$scope.data = json_data;
			startBoard();
			$scope.$emit("LOADING_COMPLETE");
		},0);
		
		
		//1ere planche et 1ere catégorie
		function startBoard(){
			$scope.currentStep = 0;
			$scope.currentSlide = 0;
			$scope.currentData = $scope.data[0];
			$scope.maxStep = $scope.data.length;
			$scope.stepProgression = [];
			for(var i=0; i<$scope.data.length; i++){
				$scope.stepProgression.push(0);
			}
			$scope.selectedItems = [];
		}

		// Catégories suivantes
		function nextStep(){
			$scope.currentStep++;
			if($scope.currentStep<$scope.maxStep){
				$scope.currentSlide = 0;
				$scope.selectedItems = [];
				$scope.currentData = $scope.data[$scope.currentStep];
			}
			else{
				$scope.setPage("moodboard");
			}
		}

		//Planches 
		function nextSlide(){
			$scope.currentSlide++;
			$scope.stepProgression[$scope.currentStep]++;


//			$timeout(function(){
				if($scope.currentSlide == 6) {
					//logAction("Affichage moodboard cat "+$scope.data[$scope.currentStep].cat);
				} else {
					//logAction("Affichage cat "+$scope.data[$scope.currentStep].cat+" planche "+($scope.currentSlide+1));
				}
//			},2000 );

			if($scope.isLastSlide()){
				var h = $(window).height() - $('.board-header').height() -38;
				TweenMax.to($(".selection-header"), 1, {delay:1.5,height:0});
				TweenMax.to($(".board-selection"), 1, {delay:1.5,height:h, ease:Expo.easeOut});
			}
		}
		
		$scope.isActiveStep = function(step){
			return step <= $scope.currentStep;
		};

		$scope.isLastSlide = function(){
			return $scope.currentSlide === $scope.maxSlides;
		};
		$scope.isVisible = function(index){
			var range = [$scope.currentSlide*6, $scope.currentSlide*6+5];
			return index >= range[0] && index <= range[1];
		};

		// Au choix du user
		$scope.addToSelection = function(index){
			$scope.selectedItems.push($scope.currentData.items[index]);

			//logAction("Sélection de l'object", $scope.currentData.items[index].id);

			nextSlide();
		};

		// Choix final de la catégorie
		$scope.addToMoodboard = function(index){
			var obj = $scope.selectedItems[index];
			
			obj.cat = $scope.data[$scope.currentStep].cat;
			$scope.moodboard.push(obj);
			nextStep();
		};

		$scope.toLC = function(str){
			str = str ? str:"";
			return str.toLowerCase();
		};

		$scope.getPolaroidPos = function(index){
			var posArr = ["tl","t","tr","bl","b","br"];
			return posArr[index%6]+" random-"+posArr[index%6];
		};

		$scope.getStepProgression = function(index){
			var percent = ($scope.stepProgression[index]/6)*100;
			return percent+"%";
		};
		$scope.showImg = function(id){
			var modalInstance = $modal.open({
			    animation: true,
			    templateUrl: 'imageViewer.html',
			    controller: 'ImageViewerCtrl',
			    size: 'lg',
			    resolve: {
			        id: function () {
			          	return id;
			        }
			    }
    		});
		};
	}])
	.controller("FormCtrl",["$scope","$http","$timeout",function($scope,$http,$timeout){

		$scope.currentQuestion = 0;
		$scope.nbQuestions = 0;

		$scope.$emit("LOADING");

		$timeout(function() {
			var data = json_form_data;
			for(var i=0;i<data.length;i++){
				if(data[i].answers!=null){
					data[i].answers.splice(0,0,{"value":"-1", "label":"Choisissez"});
					$scope.questionnaire.push("-1");
				}
				else $scope.questionnaire.push(null);
			}

			$scope.form_data = data;
			$scope.nbQuestions = data.length;
			$scope.$emit("LOADING_COMPLETE");

		});

		
		$scope.showSelect = function(index){
			return $scope.form_data[index].answers!==undefined;
		};
		$scope.nextQuestion = function(){
			if($scope.currentQuestion<=$scope.nbQuestions-1) $scope.currentQuestion++;
		};
		$scope.showNext = function(){
			var mc = $scope.questionnaire[$scope.currentQuestion];
			return mc != null && mc != "-1";
		};
		$scope.lastQuestion = function(frombtn){
			var delta = frombtn ? 1:0;

			return $scope.currentQuestion===$scope.nbQuestions-delta;
		};
		$scope.submitForm = function(){
			$scope.currentQuestion++;

			var data = {};
			data.paneliste = sid;
			data.answers = [];
			
			for(var i=0; i<$scope.questionnaire.length;i++){
				data.answers[i] = {id:$scope.form_data[i].id,value:$scope.questionnaire[i]};
			}
			
			$scope.answers = data;

			
		};


	}])
	.controller("ImageViewerCtrl",["$scope","id" ,function($scope,id){
		$scope.id = id;
	}]);
