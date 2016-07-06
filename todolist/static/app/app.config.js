"use strict";

/**
 * httpConfig()
 * Configures the $http service.
 * @param $httpProvider: The $http provider.
 */
function httpConfig($httpProvider) {
    // Change the name of cookie to what Django uses
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

     // Change the name of header to what Django uses
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}

module.exports = httpConfig;
