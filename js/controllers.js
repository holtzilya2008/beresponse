/* Controllers js for beResponse app*/

'use strict';
/**
*  Module : beResponseApp
* Description : Main Angular Module for beResponse CQA project
*/

/* Controllers */
var beResponseApp = angular.module('beResponseApp', ['ngRoute','ngResource']);

beResponseApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
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

/************************************** Services *****************************/

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

// app.service('productService', function() {
//   var productList = [];

//   var addProduct = function(newObj) {
//       productList.push(newObj);
//   };

//   var getProducts = function(){
//       return productList;
//   };

//   return {
//     addProduct: addProduct,
//     getProducts: getProducts
//   };

// });

beResponseApp.service('rateService', ['QuestionRes', function(){
    var rate = function(type,Id,sign){
      console.log(type,' - ',Id,' Rated ',sign);
    };
    return {
      rate: rate
    };
  
}]);

/****************************************************************** Services */

beResponseApp.controller('NewQuestionListCtrl',['$scope','$http','$location','QuestionRes','rateService', function($scope,$http,$location,QuestionRes,rateService) {$scope.title = 'New Questions';

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
    console.log('New Questions -  rateService added!');
    $scope.rateIt = function(type,id,sign){
      /* type: 'Question' or 'Answer'
       * id: questionId or answerId
       * sign:  +1 or -1 
       */
       rateService.rate(type,id,sign);
    };
}]);

//Ask Your Question Controller
beResponseApp.controller('AskYourCtrl',['$scope','$http', '$location','QuestionRes', function($scope, $http, $location,QuestionRes) {
  //alert('pizda');
  $scope.submitQuestion = function(){

      QuestionRes.save({questionId:'q1'},$scope.newQuestion,function(){ //successcb
        console.log('We saved new question!!');
        $location.path('/');
     },function(error){  //errorcb
        alert('Error! Question submission failed!');
        console.log('Questiion submission failed - ',error.status);
        $location.path('/ask-your');
     });


     //        $scope.newQuestion.$save({questionId:'q1'},function(){ //successcb
     //    console.log('We saved new question!!');
     //    $location.path('/');
     // },function(error){  //errorcb
     //    alert('Error! Question submission failed!');
     //    console.log('Questiion submission failed - ',error.status);
     //    $location.path('/ask-your');
     // });
  };
}]);

//Browse Existing Questions Controller
beResponseApp.controller('ExistingCtrl',['$scope','$http', '$location','QuestionRes','rateService', function($scope, $http, $location,QuestionRes,rateService) {
    QuestionRes.query({questionId:'questions'},function(data){
      $scope.questions = data;  //This is happening on success
    });
    console.log('rateService added!');
    $scope.rateIt = function(type,id,sign){
      /* type: 'Question' or 'Answer'
       * id: questionId or answerId
       * sign:  +1 or -1 
       */
       rateService.rate(type,id,sign);
    };
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

