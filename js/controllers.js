/* Controllers js for beResponse app*/

'use strict';
/**
*  Module : beResponseApp
* Description : Main Angular Module for beResponse CQA project
*/

/* Controllers */
var beResponseApp = angular.module('beResponseApp', ['ngRoute','ngResource']);

beResponseApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
  $routeProvide
      .when('/',{
        templateUrl:'html/questions-list.html',
        controller:'NewQuestionListCtrl'
      })
      .when('/ask-your',{  
        templateUrl:'html/ask-your.html',
        controller:'AskYourCtrl'
      })
      .when('/existing',{
        templateUrl:'html/questions-list.html',
        controller:'ExistingCtrl'
      })
      .when('/leaderboard',{	
        templateUrl:'html/leaderboard.html',
        controller:'LeaderboardCtrl'
      })      
      .when('/topics-list',{ 
        templateUrl:'html/topics-list.html',
        controller:'TopicsListCtrl'
      })
      .when('/data/topics/:topicId', { 
        templateUrl:'html/questions-list.html',
        controller:'QuestionsOnTopicCtrl'
      })       
      .when('/data/users/:userId', {
        templateUrl:'html/user-profile.html',
        controller:'UserProfileCtrl'
      })             
      .when('/data/questions/:questionId', { 
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

/* Questions Factory 
   Will handle Question Objects 
   Will be used in Question Lists or in single question
 */
beResponseApp.factory('QuestionRes', [
  '$resource', function($resource) {
    return $resource('data/questions/:questionId.:format', {
      questionId: '@_questionId',
      format: 'json',
      apiKey: 'someKeyThis'
    });
  }
]);

beResponseApp.controller('NewQuestionListCtrl',['$scope','$http','$location','QuestionRes', function($scope,$http,$location,QuestionRes) {$scope.title = 'New Questions';

    QuestionRes.query({questionId:'questions'},function(data){
      $scope.questions = data;
    });

    //     Phone.query({phoneId: 'phones'}, function(data) {
    //   $scope.phones = data;
    // });

    //Phone.query(params, successcb, errorcb)

    //Phone.get(params, successcb, errorcb)

    //Phone.save(params, payloadData, successcb, errorcb)

    //Phone.delete(params, successcb, errorcb)


    // $http.get('json/questions.json').success(function(data, status, headers, config) {
    //     $scope.questions = data;
    // });
}]);

//Ask Your Question Controller
beResponseApp.controller('AskYourCtrl',['$scope','$http', '$location','QuestionRes', function($scope, $http, $location,QuestionRes) {
  //alert('pizda');
  $scope.submitQuestion = function(){

      $scope.newQuestion = new QuestionRes();
      $scope.newQuestion.$save({questionId:'q1'},function(){
        console.log('We saved new question!!');
        $location.path('/');
     });
  };
}]);

//Browse Existing Questions Controller
beResponseApp.controller('ExistingCtrl',['$scope','$http', '$location','QuestionRes', function($scope, $http, $location,QuestionRes) {
    QuestionRes.query({questionId:'questions'},function(data){
      $scope.questions = data;  //This is happening on success
    });
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

//Current User controller
beResponseApp.controller('CurrentUserCtrl',['$scope','$http', '$location', function($scope, $http, $location) {
	   //  $http.get('json/user-test.json').success(function(data, status, headers, config) {
    //     $scope.user = data;
    // });
	   //  this.currentUser = $scope.user;
}]);

