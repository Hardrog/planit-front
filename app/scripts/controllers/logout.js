'use strict';

angular.module('planIt')
  .controller('LogoutCtrl', function ($scope, $location, djangoAuth) {
    djangoAuth.logout();
  });
