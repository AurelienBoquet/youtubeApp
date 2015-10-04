angular.module('youtubeApp')
  .config(function($stateProvider) {
    "use strict";

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('login', {
        url: "/login",
        templateUrl: "app/routes/login/login.html",
        controller: "LoginCtrl"
      })
  });
