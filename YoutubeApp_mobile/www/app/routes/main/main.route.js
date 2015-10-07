angular.module('youtubeApp')
  .config(function($stateProvider) {


    $stateProvider
      .state('main', {
        url: "",
        abstract: true,
        templateUrl: "app/routes/main/main.html",
        controller: "MainCtrl"
      })
  });
