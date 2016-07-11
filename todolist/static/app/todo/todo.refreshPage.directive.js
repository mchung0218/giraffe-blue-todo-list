"use strict";

/**
 * refreshPage()
 * When user is changed while view remains, force refresh the page.
 * @param: user: User factory.
 */
function refreshPage(user, $window) {
    return {
        restrict: "A",
        link: function($scope, ele) {
            ele.on("click", function() {
                // Using checkLoggedIn, find the current logged in user
                user.checkLoggedIn().then(function(res) {
                    // If the current logged in user is different than the one initially set, refresh
                    if (user.username !== res.username) {
                        $window.location.reload();
                    }
                });
            });
        }
    };
}

module.exports = refreshPage;
