"use strict";

/**
 * TodoCtrl()
 * The controller for the entire todo container.
 * @param user: The user factory.
 */
function TodoCtrl(user, $state) {
    var vm = this;

    // Keep track of username
    vm.username = user.username;

    /**
     * logoutUser()
     * Logs out the user.
     */
    vm.logoutUser = function() {
        user.logout().then(function(res) {
            // Once successful logout, go back to login view
            $state.go("login");
        }, function(res) {
            alert("Failed to log out for some reason.");
        });
    };
}

// Export the component (invoked in app.js)
module.exports = {
    controller: ["userFact", "$state", TodoCtrl],
    templateUrl: "/static/app/todo/todo.html"
};
