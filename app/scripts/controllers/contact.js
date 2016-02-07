'use strict';

/**
 * @ngdoc function
 * @name planIt.controller:AuthrequiredCtrl
 * @description
 * # AuthrequiredCtrl
 * Controller of the planIt
 */
angular.module('planIt')
        .controller('ContactCtrl', function ($scope, Contact) {

            Contact.fetchAll().then(function (data) {
                $scope.contactList = data.results;
            });

            $scope.addNewContact = function (user) {

                Contact.addNew(user)
                        .then(function () {

                            Contact.fetchAll().then(function (data2) {
                                $scope.contactList = data2.results;
                                $('#contactModal').modal('hide');
                                console.log($scope.contactList);
                            });
                        },
                        function (data) {
                            console.log("error");
                        });

            };
            $scope.deleteContact = function (user) {
                Contact.delete(user).then(function () {
                    Contact.fetchAll().then(function (data2) {
                        $scope.contactList = data2.results;
                        $('#contactModal').modal('hide');
                        console.log($scope.contactList);
                    });
                });
            };

        });
