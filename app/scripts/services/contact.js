'use strict';

angular.module('planIt')
  .service('Contact', function Contact($q, $http, $cookies, $rootScope ) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {
        /* START CUSTOMIZATION HERE */
        // Change this to point to your Django REST Auth API
        // e.g. /api/rest-auth  (DO NOT INCLUDE ENDING SLASH)
        'API_URL': 'http://192.168.56.103:8000/api',
        // Set use_session to true to use Django sessions to store security token.
        // Set use_session to false to store the security token locally and transmit it as a custom header.
        'use_session': false,
        /* END OF CUSTOMIZATION */
        'authenticated': null,
        'authPromise': null,
                'request': function(args) {
            // Let's retrieve the token from the cookie, if available
            if($cookies.token){
                $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
            }
            // Continue
            params = args.params || {}
            args = args || {};
            var deferred = $q.defer(),
                url = this.API_URL + args.url,
                method = args.method || "GET",
                params = params,
                data = args.data || {};
            // Fire the request, as configured.
            $http({
                url: url,
                withCredentials: this.use_session,
                method: method.toUpperCase(),
                headers: {'X-CSRFToken': $cookies['csrftoken']},
                params: params,
                data: data
            })
            .success(angular.bind(this,function(data, status, headers, config) {
                deferred.resolve(data, status);
            }))
            .error(angular.bind(this,function(data, status, headers, config) {
                console.log("error syncing with: " + url);
                // Set request status
                if(data){
                    data.status = status;
                }
                if(status == 0){
                    if(data == ""){
                        data = {};
                        data['status'] = 0;
                        data['non_field_errors'] = ["Could not connect. Please try again."];
                    }
                    // or if the data is null, then there was a timeout.
                    if(data == null){
                        // Inject a non field error alerting the user
                        // that there's been a timeout error.
                        data = {};
                        data['status'] = 0;
                        data['non_field_errors'] = ["Server timed out. Please try again."];
                    }
                }
                deferred.reject(data, status, headers, config);
            }));
            return deferred.promise;
        },
        'fetchAll': function(){
            return this.request({
                'method': "GET",
                'url': "/contacts/"
            }); 
        },
        'addNew': function(user){
            var data = {
                'name':user.name,
                'email':user.mail
            }
            return this.request({
                'method': "POST",
                'url': "/contacts/",
                'data':data,
            }); 
        },
        'delete': function(user){
            return this.request({
                'method': "DELETE",
                'url': "/contacts/"+user.id+"/",
            }); 
        },
    }
    return service;
  });
