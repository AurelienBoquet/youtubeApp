angular.module('youtubeApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('main.home', {
        url: "/home",
        templateUrl: "app/routes/main/home/home.html",
        controller: "HomeCtrl"
      })
  });
