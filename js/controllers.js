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
      .when('/login',{
        templateUrl:'html/login.html',
        controller:'LoginCtrl'
      })
      .when('/register',{
        templateUrl:'html/register.html',
        controller:'RegisterCtrl'
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

beResponseApp.service('rateService', ['QuestionRes', function(QuestionRes){
    
    var rateQuestion = function(questionId,sign){
      console.log('Question:' ,questionId,' Rated ',sign);
      QuestionRes.query({questionId:'questions'},function(data){
        var questions = data;
        console.log(questions[0].text);
      });
    };
    var rateAnswer = function(questionId,answerId,sign){
      console.log('Answer with Id: ',answerId,' of Question ',questionId, ' rated ',sign);
    };
    return {
      rateQuestion: rateQuestion,
      rateAnswer: rateAnswer
    };
}]);

beResponseApp.service('sessionService', ['QuestionRes', function(){    

    var currentUser = null;
    var currentUserId = 0;
    var isUserSet = false;

    var checkCurrentUser = function(){
      console.log('sessionService checkCurrentUser');
      if(isUserSet){
        console.log('sending request to server to verify if the Id logged in');
      }else{
        console.log('redirecting to login screen');
        currentUser = null;
        currentUserId = 0;
        isUserSet = false;
      }
      return isUserSet;
    };

    var getCurrentUserId = function(){
      console.log('sessionService getCurrentUserId');
      return currentUserId;
    };

    var getCurrentUserMini = function(){
      console.log('sessionService getCurrentUserMini');
      return currentUser;
    };

    var logIn = function(email,password){
      console.log('sending request login request and updating parameters');
      currentUserId = 1;
      isUserSet = true;
      return isUserSet;
    };

    var register = function(username,nickname,password,description,userPhotoUrl){
      console.log('sending register request and updating parameters');
      return isUserSet;
    };

    return {
      checkCurrentUser: checkCurrentUser,
      getCurrentUserId: getCurrentUserId,
      getCurrentUserMini: getCurrentUserMini,
      logIn: logIn,
      register: register
    };
}]);


/****************************************************************** Services */

beResponseApp.controller('NewQuestionListCtrl',['$scope','$http','$location','QuestionRes','rateService','sessionService', function($scope,$http,$location,QuestionRes,rateService,sessionService) {$scope.title = 'New Questions';
    console.log('reached NewQuestionListCtrl');
    /* Session Check ********************************************************/
    $scope.isUserSet = sessionService.checkCurrentUser();
    if($scope.isUserSet){
        $scope.currentUserId = sessionService.getCurrentUserId();
        $scope.currentUser = sessionService.getCurrentUserMini();
    }else{
        $location.path('/login');
    }
    /******************************************************** Session Check */

    QuestionRes.query({questionId:'questions'},function(data){
      $scope.questions = data;
    });

    $scope.rateQuestion = function(questionId,sign){
        rateService.rateQuestion(questionId,sign);
    };
}]);

//Ask Your Question Controller
beResponseApp.controller('AskYourCtrl',['$scope','$http', '$location','sessionService','QuestionRes', function($scope, $http, $location,QuestionRes,sessionService) {
  console.log('reached AskYourCtrl');
    /* Session Check ********************************************************/
    $scope.isUserSet = sessionService.checkCurrentUser();
    if($scope.isUserSet){
        $scope.currentUserId = sessionService.getCurrentUserId();
        $scope.currentUser = sessionService.getCurrentUserMini();
    }else{
        $location.path('/login');
    }
    /******************************************************** Session Check */

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
beResponseApp.controller('ExistingCtrl',['$scope','$http','$location','QuestionRes','rateService','sessionService',function($scope, $http, $location,QuestionRes,rateService,sessionService) {
  console.log('reached ExistingCtrl');
    /* Session Check ********************************************************/
    $scope.isUserSet = sessionService.checkCurrentUser();
    if($scope.isUserSet){
        $scope.currentUserId = sessionService.getCurrentUserId();
        $scope.currentUser = sessionService.getCurrentUserMini();
    }else{
        $location.path('/login');
    }
    /******************************************************** Session Check */

    QuestionRes.query({questionId:'questions'},function(data){
      $scope.questions = data;
    });

    $scope.rateQuestion = function(questionId,sign){
        rateService.rateQuestion(questionId,sign);
    };
}]);

//Leaderboard Controller
beResponseApp.controller('LeaderboardCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
  console.log('reached LeaderboardCtrl');
    /* Session Check ********************************************************/
    $scope.isUserSet = sessionService.checkCurrentUser();
    if($scope.isUserSet){
        $scope.currentUserId = sessionService.getCurrentUserId();
        $scope.currentUser = sessionService.getCurrentUserMini();
    }else{
        $location.path('/login');
    }
    /******************************************************** Session Check */
}]);

//Browse Questions by Topics Controller
beResponseApp.controller('TopicsListCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
  console.log('reached TopicsListCtrl');
  /* Session Check ********************************************************/
  $scope.isUserSet = sessionService.checkCurrentUser();
  if($scope.isUserSet){
      $scope.currentUserId = sessionService.getCurrentUserId();
      $scope.currentUser = sessionService.getCurrentUserMini();
  }else{
      $location.path('/login');
  }
  /******************************************************** Session Check */

}]);

//Question List on a specific topic Controller
beResponseApp.controller('QuestionsOnTopicCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
  console.log('reached QuestionsOnTopicCtrl');
  /* Session Check ********************************************************/
  $scope.isUserSet = sessionService.checkCurrentUser();
  if($scope.isUserSet){
      $scope.currentUserId = sessionService.getCurrentUserId();
      $scope.currentUser = sessionService.getCurrentUserMini();
  }else{
      $location.path('/login');
  }
  /******************************************************** Session Check */
}]);

//User Profile Controller
beResponseApp.controller('UserProfileCtrl',['$scope','$http','sessionService', '$location', function($scope, $http, $location,sessionService) {
  console.log('reached UserProfileCtrl');
    /* Session Check ********************************************************/
    $scope.isUserSet = sessionService.checkCurrentUser();
    if($scope.isUserSet){
        $scope.currentUserId = sessionService.getCurrentUserId();
        $scope.currentUser = sessionService.getCurrentUserMini();
    }else{
        $location.path('/login');
    }
    /******************************************************** Session Check */
}]);

//Question full Controller
beResponseApp.controller('QuestionsFullCtrl',['$scope','$http','sessionService', '$location', function($scope, $http, $location,sessionService) {
  console.log('reached QuestionsFullCtrl');
    /* Session Check ********************************************************/
    $scope.isUserSet = sessionService.checkCurrentUser();
    if($scope.isUserSet){
        $scope.currentUserId = sessionService.getCurrentUserId();
        $scope.currentUser = sessionService.getCurrentUserMini();
    }else{
        $location.path('/login');
    }
    /******************************************************** Session Check */
}]);

//About Controller
beResponseApp.controller('AboutCtrl',['$scope','$http','sessionService', '$location', function($scope, $http, $location,sessionService) {
  console.log('reached AboutCtrl');
      /* Session Check ********************************************************/
    $scope.isUserSet = sessionService.checkCurrentUser();
    if($scope.isUserSet){
        $scope.currentUserId = sessionService.getCurrentUserId();
        $scope.currentUser = sessionService.getCurrentUserMini();
    }else{
        $location.path('/login');
    }
    /******************************************************** Session Check */
}]);

// Login Controller
beResponseApp.controller('LoginCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
  console.log('reached LoginCtrl');
  
  $scope.goRegister = function(){
    $location.path('/register');
  };

  $scope.login = function(email,password){
    $scope.status = sessionService.logIn(email,password);
    if($scope.status){
      console.log('LogIn Success');
      $location.path('/');
    }else{
      console.log('LogIn Error');
    }
  };

}]);

// Register Controller
beResponseApp.controller('RegisterCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
  console.log('reached RegisterCtrl');

  $scope.register = function(username,nickname,password,description,userPhotoUrl){
    $scope.status = sessionService.register(username,nickname,password,description,userPhotoUrl);
    if($scope.status){
      console.log('Register Success');
      $location.path('/');
    }else{
      console.log('Register Error');
    }
  };

}]);

