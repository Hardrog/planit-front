'use strict';

/**
 * @ngdoc function
 * @name planIt.controller:RestrictedCtrl
 * @description
 * # RestrictedCtrl
 * Controller of the planIt
 */
angular.module('planIt')
  .controller('RestrictedCtrl', function ($scope, $location) {
    $scope.$on('djangoAuth.logged_in', function() {
      $location.path('/');
    });
  });
