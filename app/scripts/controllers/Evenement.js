'use strict';

/**
 * @ngdoc function
 * @name planIt.controller:AuthrequiredCtrl
 * @description
 * # AuthrequiredCtrl
 * Controller of the planIt
 */
angular.module('planIt')
        .controller('EvenementCtrl', function ($scope, Evenement) {

            Evenement.fetchAll().then(function (data) {
                $scope.evenementList = data.results;
            });

            

        });
