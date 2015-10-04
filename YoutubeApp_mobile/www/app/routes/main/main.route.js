angular.module('youtubeApp')
  .config(function($stateProvider) {
    "use strict";

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('main', {
        url: "",
        abstract: true,
        templateUrl: "app/routes/main/main.html",
        controller: "MainCtrl"
      })
  });
