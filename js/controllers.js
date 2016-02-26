/* Controllers js for beResponse app*/

'use strict';
/**
*  Module : beResponseApp
* Description : Main Angular Module for beResponse CQA project
*/

/* Controllers */
var beResponseApp = angular.module('beResponseApp', ['ngRoute']);

beResponseApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
  $routeProvide
      .when('/',{
        templateUrl:'html/questions-list.html',
        controller:'NewQuestionListCtrl'
      })
      .when('/ask-your',{  //TODO
        templateUrl:'html/ask-your.html',
        controller:'AskYourCtrl'
      })
      .when('/existing',{  //TODO
        templateUrl:'html/questions-list.html',
        controller:'ExistingCtrl'
      })
      .when('/leaderboard',{	//TODO
        templateUrl:'html/leaderboard.html',
        controller:'LeaderboardCtrl'
      })      
      .when('/topics-list',{  //TODO
        templateUrl:'html/topics-list.html',
        controller:'TopicsListCtrl'
      })
      .when('/topics/:topicId', {  //TODO
        templateUrl:'html/questions-list.html',
        controller:'QuestionsOnTopicCtrl'
      })       
      .when('/users/:userId', {  //TODO
        templateUrl:'html/user-profile.html',
        controller:'UserProfileCtrl'
      })             
      .when('/questions/:questionId', {  //TODO
        templateUrl:'html/question-full.html',
        controller:'QuestionsFullCtrl'
      })
      .when('/about',{
        templateUrl:'html/about.html',
        controller:'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

beResponseApp.controller('NewQuestionListCtrl',['$scope','$http', '$location', function($scope,$http,$location) {$scope.title = 'Телефоны';

    $http.get('json/questions.json').success(function(data, status, headers, config) {
        $scope.questions = data;
    });

}]);

//Ask Your Question Controller
beResponseApp.controller('AskYourCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

//Browse Existing Questions Controller
beResponseApp.controller('ExistingCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

//Leaderboard Controller
beResponseApp.controller('LeaderboardCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

//Browse Questions by Topics Controller
beResponseApp.controller('TopicsListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

//Question List on a specific topic Controller
beResponseApp.controller('QuestionsOnTopicCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

//User Profile Controller
beResponseApp.controller('UserProfileCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

//Question full Controller
beResponseApp.controller('QuestionsFullCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

//About Controller
beResponseApp.controller('AboutCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);


