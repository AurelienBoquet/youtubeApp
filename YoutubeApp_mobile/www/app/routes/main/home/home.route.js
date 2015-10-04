angular.module('youtubeApp')
  .config(function($stateProvider) {
    "use strict";

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('main.home', {
        url: "/home",
        templateUrl: "app/routes/main/home/home.html",
        controller: "HomeCtrl"
      })
  });
