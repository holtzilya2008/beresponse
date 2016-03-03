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
      .when('/session',{
        templateUrl:'html/session.html',
        controller:'SessionCtrl'
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

beResponseApp.service('dateService', [function(){
    
    var currentDate = null;
    var dateString = '';
    var timeString = '';

    var updateCurrentDate = function(){
      currentDate = new Date();
      var day = currentDate.getDate();
      var mounth = currentDate.getMonth()+1;
      var year = currentDate.getFullYear();
      var hours = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();

      dateString = day+'/'+mounth+'/'+year;
      timeString = hours+':'+min+':'+sec;
    };

    var getFullDate = function(){
      return currentDate;
    };

    var getDate = function(){
      return dateString;
    };

    var getTime = function(){
      return timeString;
    };


    return {
      updateCurrentDate: updateCurrentDate,
      getFullDate: getFullDate,
      getDate: getDate,
      getTime: getTime
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

    var getCurrentUserMini = function(){
      console.log('sessionService getCurrentUserMini');
      return currentUser;
    };

    var setAllowAccess = function(value){
      allowAccess = value;
    };

    var isAllowAccess = function(){
      return allowAccess;
    };

    return {
      checkSessionOnServer: checkSessionOnServer,
      setLoginOperation: setLoginOperation,
      isLoginOperation: isLoginOperation,
      getCurrentUserMini: getCurrentUserMini,
      setAllowAccess: setAllowAccess,
      isAllowAccess: isAllowAccess
    };
}]);


/****************************************************************** Services */

beResponseApp.run(['$rootScope', '$location', 'sessionService','ServerRes', function ($rootScope, $location, sessionService,ServerRes) {    
     $rootScope.$on('$routeChangeStart', function (event) {
        if(!sessionService.isAllowAccess()){
            console.log('current pathe is ', $location.path());
            if($location.path() == '/login'){
              console.log('ALLOW LOGIN');
            }
            else if($location.path() == '/register'){
              console.log('ALLOW REGISTER');
            }else if($location.path() == '/session'){
              console.log('ALLOW SESSION CHECK');
            }else{
                  $rootScope.currentPath = $location.path();
                  event.preventDefault();
                  $location.path('/session');
            }
        }else{
          console.log('ALLOW!');
        }
     });
}]);

beResponseApp.controller('NewQuestionListCtrl',['$scope','$http','$location','ServerRes','rateService','sessionService','dateService', function($scope,$http,$location,ServerRes,rateService,sessionService,dateService) {$scope.title = 'New Questions';
    console.log('reached NewQuestionListCtrl');
    sessionService.setAllowAccess(false);
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

    $scope.getCurrentDate = function(){
      dateService.updateCurrentDate();
      console.log('current Date is - ', dateService.getDate());
      console.log('current Time is - ', dateService.getTime());
      console.log('full Date Value is - ', dateService.getFullDate());
    };
}]);

//Ask Your Question Controller
beResponseApp.controller('AskYourCtrl',['$scope','$http', '$location','sessionService','ServerRes', function($scope, $http, $location,sessionService,ServerRes) {
    console.log('reached AskYourCtrl');
    sessionService.setAllowAccess(false);
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
    sessionService.setAllowAccess(false);
    console.log($scope.currentUser);

    ServerRes.query({id:'questions'},function(data){ //success cb
      console.log('Exiting Question List querry success!');
      $scope.questions = data;
    },function(){                                     //Error cb
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

    sessionService.setAllowAccess(false);
    console.log($scope.currentUser);

    ServerRes.query({id:'users'},function(data){ //success cb
      console.log('Top Rated User List querry success!');
      $scope.users = data;
    },function(){                                        //Error cb
      console.log('Top Rated User List querry ERROR!!!');
    });    

}]);

//Browse Questions by Topics Controller
beResponseApp.controller('TopicsListCtrl',['$scope','$http', '$location','sessionService','ServerRes', function($scope, $http, $location,sessionService,ServerRes) {
    console.log('reached TopicsListCtrl');

    sessionService.setAllowAccess(false);
    console.log($scope.currentUser);

    ServerRes.query({id:'questions'},function(data){ //success cb
      console.log('Topics List querry success!');
      $scope.topics = data;
    },function(){                                        //Error cb
      console.log('Topics List querry ERROR!!!');
    });    

}]);

//Question List on a specific topic Controller
beResponseApp.controller('QuestionsOnTopicCtrl',['$scope','$http', '$location','sessionService', function($scope, $http, $location,sessionService) {
    console.log('reached QuestionsOnTopicCtrl');

    sessionService.setAllowAccess(false);
    console.log($scope.currentUser);
}]);

//User Profile Controller
beResponseApp.controller('UserProfileCtrl',['$scope','$http','sessionService', '$location', function($scope, $http, $location,sessionService) {
  console.log('reached UserProfileCtrl');

  sessionService.setAllowAccess(false);
  console.log($scope.currentUser);
}]);

//Question full Controller
beResponseApp.controller('QuestionsFullCtrl',['$scope','$http','$location','$routeParams','sessionService','ServerRes', function($scope, $http, $location,$routeParams,sessionService,ServerRes) {
  console.log('reached QuestionsFullCtrl');

    sessionService.setAllowAccess(false);
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

    sessionService.setAllowAccess(false);
    console.log($scope.currentUser);
}]);

// Login Controller
beResponseApp.controller('LoginCtrl',['$scope','$http', '$location','ServerRes','sessionService', function($scope, $http, $location,ServerRes,sessionService) {
  console.log('reached LoginCtrl');
  sessionService.setAllowAccess(false);

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
  sessionService.setAllowAccess(false);
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


beResponseApp.controller('SessionCtrl',['$scope','$http','$location','$rootScope','ServerRes','sessionService', function($scope,$http,$location,$rootScope,ServerRes,sessionService) {
    console.log('reached SessionCtrl');

        ServerRes.query({id:'current'},function(data){ //success cb
        console.log('Session aprooved!');
        $rootScope.currentUser = data[0];
        sessionService.setAllowAccess(true);
        $location.path($rootScope.currentPath);
      },function(){
        console.log('login error!');
        $location.path('/login');      
      }); 

}]);