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
            template: "<login></login>"
        })
        .state("todo", {
            url: "/todo",
            template: "<todo></todo>"
        });
}

module.exports = routesConfig;
