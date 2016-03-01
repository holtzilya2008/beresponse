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
      .when('/home',{
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
beResponseApp.factory('ServerRes', [
  '$resource', function($resource) {
    return $resource('data/:id.:format', {
      questionId: '@_id',
      format: 'json'
    });
  }
]);

beResponseApp.service('rateService', ['ServerRes', function(ServerRes){
    
    var rateQuestion = function(questionId,sign){
      console.log('Question:' ,questionId,' Rated ',sign);
      ServerRes.query({id:'questions'},function(data){
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

beResponseApp.service('sessionService', ['ServerRes', function(ServerRes){    

    var currentUser = null;
    var allowAccess = false;
    var loginOperation = false;

    var checkSessionOnServer = function(){
      console.log('sessionService checkSessionOnServer');
      // ServerRes.query({id:'current'},function(data){ //success cb
      //   console.log('currentUser querry success!');
      //   allowAccess = true;
      //   currentUser = data[0];
      // },function(){                                  //Error cb
      //   console.log('currentUser querry ERROR!!!');
      //   allowAccess = false;
      //   currentUser = null;
      // });  
    };

    var setLoginOperation = function(value){
        console.log('sessionService setLoginOperation');
        loginOperation = value;  //true or false
    };

    var isLoginOperation = function(){
        console.log('sessionService isLoginOperation');
        return loginOperation;
    };

    var isLoggedIn = function(){
      console.log('sessionService isLoggedIn');
      return allowAccess;
    };

    var getCurrentUserMini = function(){
      console.log('sessionService getCurrentUserMini');
      return currentUser;
    };

    var login = function(user){   // Called by LoginCtrl or RegisterCtrl with received data
      console.log('sessionService login');
      if(user){
        currentUser = user;
        allowAccess = true;
        loginOperation = false;
      }else{
        currentUser = null;
        allowAccess = false;
      }
      return allowAccess;
    };

    var close = function(){
      console.log('sessionService close');
      currentUser = null;
      allowAccess = false;
      loginOperation = false;
    }

    return {
      checkSessionOnServer: checkSessionOnServer,
      setLoginOperation: setLoginOperation,
      isLoginOperation: isLoginOperation,
      isLoggedIn: isLoggedIn,
      getCurrentUserMini: getCurrentUserMini,
      login: login,
      close: close
    };
}]);


/****************************************************************** Services */

beResponseApp.run(['$rootScope', '$location', 'sessionService', function ($rootScope, $location, sessionService) {    
     $rootScope.$on('$routeChangeStart', function (event) {
          if(!sessionService.isLoginOperation()){
             sessionService.checkSessionOnServer();
             if (!sessionService.isLoggedIn()) {
                 console.log('DENY');
                 event.preventDefault();
                 sessionService.setLoginOperation(true);
                 $location.path('/login');
             }
             else {
                 sessionService.setLoginOperation(false);
                 console.log('ALLOW');
             }
          }else{
              console.log('ALLOW LOGIN OPERATION');
          }
     });
}]);

beResponseApp.controller('NewQuestionListCtrl',['$scope','$http','$location','ServerRes','rateService','sessionService', function($scope,$http,$location,ServerRes,rateService,sessionService) {$scope.title = 'New Questions';
    console.log('reached NewQuestionListCtrl');
    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);

    ServerRes.query({id:'questions'},function(data){ //success cb
      console.log('Question List querry success!');
      $scope.questions = data;
    },function(){                                        //Error cb
      console.log('Question List querry ERROR!!!');
    });

    $scope.rateQuestion = function(questionId,sign){
        rateService.rateQuestion(questionId,sign);
    };

    /* Reply box Handler *********************/
    $scope.replyShow = false; 
    $scope.showReplyBox = function(){
      $scope.replyShow = true;
    };
    $scope.submitReply = function(questionId,replyText){
      console.log('reply button pressed');
      $scope.replyShow = false;
    };
    /********************* Reply box Handler */


}]);

//Ask Your Question Controller
beResponseApp.controller('AskYourCtrl',['$scope','$http', '$location','sessionService','ServerRes', function($scope, $http, $location,sessionService,ServerRes) {
    console.log('reached AskYourCtrl');

    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);

  $scope.submitQuestion = function(){

      ServerRes.save({id:'q1'},$scope.newQuestion,function(){ //successcb
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
beResponseApp.controller('ExistingCtrl',['$scope','$http','$location','ServerRes','rateService','sessionService',function($scope, $http, $location,ServerRes,rateService,sessionService) {
  console.log('reached ExistingCtrl');

    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);

    ServerRes.query({id:'questions'},function(data){ //success cb
      console.log('Exiting Question List querry success!');
      $scope.questions = data;
    },function(){                                        //Error cb
      console.log('Exiting Question List querry ERROR!!!');
    });

    $scope.rateQuestion = function(questionId,sign){
        rateService.rateQuestion(questionId,sign);
    };

    /* Reply box Handler *********************/
    $scope.replyShow = false;    
    $scope.showReplyBox = function(){
      $scope.replyShow = true;
    };
    $scope.submitReply = function(questionId,replyText){
      console.log('reply button pressed');
      $scope.replyShow = false;
    };
    /********************* Reply box Handler */


}]);

//Leaderboard Controller
beResponseApp.controller('LeaderboardCtrl',['$scope','$http', '$location','ServerRes','sessionService', function($scope, $http, $location,ServerRes,sessionService) {
    console.log('reached LeaderboardCtrl');

    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);

    ServerRes.query({id:'users'},function(data){ //success cb
      console.log('Top Rated User List querry success!');
      $scope.users = data;
    },function(){                                        //Error cb
      console.log('Top Rated User List querry ERROR!!!');
    });    

}]);

//Browse Questions by Topics Controller
beResponseApp.controller('TopicsListCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
    console.log('reached TopicsListCtrl');

    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);

}]);

//Question List on a specific topic Controller
beResponseApp.controller('QuestionsOnTopicCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
    console.log('reached QuestionsOnTopicCtrl');

    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);
}]);

//User Profile Controller
beResponseApp.controller('UserProfileCtrl',['$scope','$http','sessionService', '$location', function($scope, $http, $location,sessionService) {
  console.log('reached UserProfileCtrl');

  $scope.currentUser = sessionService.getCurrentUserMini();
  console.log($scope.currentUser);
}]);

//Question full Controller
beResponseApp.controller('QuestionsFullCtrl',['$scope','$http','$location','$routeParams','sessionService','ServerRes', function($scope, $http, $location,$routeParams,sessionService,ServerRes) {
  console.log('reached QuestionsFullCtrl');

    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);

    ServerRes.query({id: $routeParams.questionId},function(data){ //success cb
      console.log('Question querry success!');
      $scope.question = data[0];
    },function(){                                        //Error cb
      console.log('Question querry ERROR!!!');
    });

    /* Reply box Handler *********************/
    $scope.replyShow = false;

    $scope.showReplyBox = function(){
      $scope.replyShow = true;
    };

    $scope.submitReply = function(questionId,replyText){
      console.log('reply button pressed');
      $scope.replyShow = false;
    };
    /********************* Reply box Handler */

}]);

//About Controller
beResponseApp.controller('AboutCtrl',['$scope','$http','sessionService', '$location', function($scope, $http, $location,sessionService) {
  console.log('reached AboutCtrl');

    $scope.currentUser = sessionService.getCurrentUserMini();
    console.log($scope.currentUser);
}]);

// Login Controller
beResponseApp.controller('LoginCtrl',['$scope','$http', '$location','ServerRes','sessionService', function($scope, $http, $location,ServerRes,sessionService) {
  console.log('reached LoginCtrl');
  
  if(!sessionService.isLoginOperation){
    console.log('BUG - reached LoginCtrl when it is not Login Operation');
  }
  $scope.goRegister = function(){
    $location.path('/register');
  };

  $scope.login = function(email,password){
    ServerRes.query({id:'current'},function(data){ //success cb
      console.log('login success!');
      $scope.currentUser = data[0];
      sessionService.login($scope.currentUser);
      $location.path('/home');
    },function(){
      sessionService.close();              //Error cb
      alert('login ERROR!!!');
    }); 
  };

}]);

// Register Controller
beResponseApp.controller('RegisterCtrl',['$scope','$http', '$location','sessionService','ServerRes', function($scope, $http, $location,sessionService,ServerRes) {
  console.log('reached RegisterCtrl');

  if(!sessionService.isLoginOperation){
    console.log('BUG - reached RegisterCtrl when it is not Login Operation');
  }
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


// beResponseApp.controller('SessionCtrl',['$scope','$http','$location','ServerRes','sessionService', function($scope,$http,$location,ServerRes,sessionService) {
//     console.log('reached SessionCtrl');
//     if(sessionService.checkCurrentUser() == true){
//         $scope.isUserSet = true;
//         $scope.currentUserId = sessionService.getCurrentUserId();
//         $scope.currentUser = sessionService.getCurrentUserMini();
//     }else{
//         $location.path('/login');
//     }
//     console.log($scope.currentUser);
// }]);