/* Controllers js for beResponse app*/

'use strict';
/**
*  Module : beResponseApp
* Description : Main Angular Module for beResponse CQA project
*/

/* Controllers */
var beResponseApp = angular.module('beResponseApp', []);

beResponseApp.controller('QuestionListCtrl',['$scope','$http', '$location', function($scope,$http,$location) {$scope.title = 'Телефоны';

    $http.get('json/questions.json').success(function(data, status, headers, config) {
        $scope.questions = data;
    });

}]);

// beResponseApp.controller('QuestionListCtrl',['$scope', function($scope){
// 	$scope.title = 'List of Questions';
// 	$scope.questions = [
// 		{'username': 'Eskimos1',
// 		 'userphoto': 'img/tux.png',
// 		 'time': '20/02/2016 at 16:00',
// 		 'title': 'Pochemu eskimos ebet kokos?',
// 		 'text': 'The Edmonton Eskimos are a professional Canadian football team based in Edmonton, Alberta, competing in the West Division of the Canadian Football League (CFL). The Eskimos play their home games at Commonwealth Stadium and are the third-youngest franchise in the CFL. The Eskimos were founded in 1949, although there were clubs with the name Edmonton Eskimos as early as 1895. The Eskimos are the most successful CFL franchise of the modern era (1954) having won the league's Grey Cup championship fourteen times, second overall only to the Toronto Argonauts who',
// 		 'rating': '6 / 7'
// 		},
// 		{'username': 'Eskimos2',
// 		 'userphoto': 'img/tux.png',
// 		 'time': '20/02/2016 at 16:00',
// 		 'title': 'Pochemu eskimos ebet kokos?',
// 		 'text': 'The Edmonton Eskimos are a professional Canadian football team based in Edmonton, Alberta, competing in the West Division of the Canadian Football League (CFL). The Eskimos play their home games at Commonwealth Stadium and are the third-youngest franchise in the CFL. The Eskimos were founded in 1949, although there were clubs with the name Edmonton Eskimos as early as 1895. The Eskimos are the most successful CFL franchise of the modern era (1954) having won the league's Grey Cup championship fourteen times, second overall only to the Toronto Argonauts who',
// 		 'rating': '6 / 7'
// 		},
// 		{'username': 'Eskimos3',
// 		 'userphoto': 'img/tux.png',
// 		 'time': '20/02/2016 at 16:00',
// 		 'title': 'Pochemu eskimos ebet kokos?',
// 		 'text': 'The Edmonton Eskimos are a professional Canadian football team based in Edmonton, Alberta, competing in the West Division of the Canadian Football League (CFL). The Eskimos play their home games at Commonwealth Stadium and are the third-youngest franchise in the CFL. The Eskimos were founded in 1949, although there were clubs with the name Edmonton Eskimos as early as 1895. The Eskimos are the most successful CFL franchise of the modern era (1954) having won the league's Grey Cup championship fourteen times, second overall only to the Toronto Argonauts who',
// 		 'rating': '6 / 7'
// 		},
// 		{'username': 'Eskimos4',
// 		 'userphoto': 'img/tux.png',
// 		 'time': '20/02/2016 at 16:00',
// 		 'title': 'Pochemu eskimos ebet kokos?',
// 		 'text': 'The Edmonton Eskimos are a professional Canadian football team based in Edmonton, Alberta, competing in the West Division of the Canadian Football League (CFL). The Eskimos play their home games at Commonwealth Stadium and are the third-youngest franchise in the CFL. The Eskimos were founded in 1949, although there were clubs with the name Edmonton Eskimos as early as 1895. The Eskimos are the most successful CFL franchise of the modern era (1954) having won the league's Grey Cup championship fourteen times, second overall only to the Toronto Argonauts who',
// 		 'rating': '6 / 7'
// 		},
// 		{'username': 'Eskimos5',
// 		 'userphoto': 'img/tux.png',
// 		 'time': '20/02/2016 at 16:00',
// 		 'title': 'Pochemu eskimos ebet kokos?',
// 		 'text': 'The Edmonton Eskimos are a professional Canadian football team based in Edmonton, Alberta, competing in the West Division of the Canadian Football League (CFL). The Eskimos play their home games at Commonwealth Stadium and are the third-youngest franchise in the CFL. The Eskimos were founded in 1949, although there were clubs with the name Edmonton Eskimos as early as 1895. The Eskimos are the most successful CFL franchise of the modern era (1954) having won the league's Grey Cup championship fourteen times, second overall only to the Toronto Argonauts who',
// 		 'rating': '6 / 7'
// 		}
// 	];
// 	$scope.replys = [
// 		{'username': 'Kokos1',
// 		 'userphoto': '../img/lux.png',
// 		 'text': 'Cheburator mudak!'
// 		},
// 		{'username': 'Kokos2',
// 		 'userphoto': '../img/lux.png',
// 		 'text': 'Cheburator mudak!'
// 		},
// 		{'username': 'Kokos3',
// 		 'userphoto': '../img/lux.png',
// 		 'text': 'Cheburator mudak!'
// 		},
// 		{'username': 'Kokos4',
// 		 'userphoto': '../img/lux.png',
// 		 'text': 'Cheburator mudak!'
// 		},
// 		{'username': 'Kokos5',
// 		 'userphoto': '../img/lux.png',
// 		 'text': 'Cheburator mudak!'
// 		}				
// 	];
// }])




