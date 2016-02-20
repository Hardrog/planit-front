'use strict';

/**
 * @ngdoc function
 * @name planIt.controller:AuthrequiredCtrl
 * @description
 * # AuthrequiredCtrl
 * Controller of the planIt
 */
angular.module('planIt')
        .controller('NewEvenementCtrl', function ($scope, Evenement) {

             $scope.addNewEvenement = function (evenement) {

                Evenement.addNew(evenement);
            };

        });
