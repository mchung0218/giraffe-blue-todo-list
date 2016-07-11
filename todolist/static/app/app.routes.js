"use strict";

/**
 * routesConfig()
 * Configuration for routes.
 */
function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
        
    $stateProvider
        .state("login", {
            url: "/",
            template: "<login></login>",
            resolve: {
                checkLoggedIn: ["$q", "$state", "userFact", function($q, $state, user) {
                    var deferred = $q.defer();
                    
                    // Check if the user is logged in
                    user.checkLoggedIn().then(function(res) {
                        // Update the username
                        user.update({
                            username: res.username
                        });

                        // If they are, redirect to list
                        if (res.login === 'true') {
                            deferred.resolve();
                            $state.go("todo");
                        }
                        
                        // Otherwise, stay
                        else {
                            deferred.resolve();
                        }
                    }, function(res) {
                        deferred.resolve();
                    });

                    return deferred.promise;
                }]
            }
        })
        .state("todo", {
            template: "<todo></todo>"
        })
        .state("forgot", {
            template: "<forgot></forgot>"
        });
}

module.exports = routesConfig;
