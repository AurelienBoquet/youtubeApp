angular.module('youtubeApp')
  .config(function($stateProvider) {


    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "app/routes/login/login.html",
        controller: "LoginCtrl"
      })
  });
