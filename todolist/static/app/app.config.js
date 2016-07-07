"use strict";

/**
 * httpConfig()
 * Configures the $http service.
 * @param $httpProvider: The $http provider.
 */
function httpConfig($httpProvider, $resourceProvider) {
    // Change the name of cookie to what Django uses
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

     // Change the name of header to what Django uses
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // Do not strip trailing slashes (e.g. /task/)
    $resourceProvider.defaults.stripTrailingSlashes = false;

    // Enable PATCH action
    // $httpProvider.defaults.headers.patch = {
    //     "Content-Type": "application/json-patch+json"
    // };
}

module.exports = httpConfig;
