"use strict";

/**
 * LoginCtrl()
 * Login controller.
 * @param user: The user factory.
 */
function LoginCtrl(user, $state) {
    var vm = this;

    // No error by default
    vm.error = "";

    /**
     * registerUser()
     * Registers a user.
     */
    vm.registerUser = function() {
        // Only register if both fields are filled
        if (vm.form.password && vm.form.email) {
            var formData = {
                email: vm.form.email,
                password: vm.form.password,
            };

            user
                .register(formData)
                .then(function(res) {
                    // If register is successful, attempt to log in user.
                    vm.loginUser(formData);

                }, function(res) {
                    vm.error = "badRegisterEmail";
                });
        }

        // Otherwise, show error
        else {
            vm.error = "badRegisterMissing";
        }
    };

    /**
     * loginUser()
     * Logins the user.
     */
    vm.loginUser = function() {
        var formData = {
            email: vm.form.email,
            password: vm.form.password,
        };

        user.login(formData).then(function(res) {
            console.log(res);
            // If the user is authenticated, then move to list
            if (res.login === 'true') {
                $state.go("todo");
            }

            // Otherwise, show an error
            else {
                vm.error = "badLogin";
            }
        }, function(res) {
            console.log(res);
            vm.error = "badLogin";
        });
    };

    /**
     * logoutUser()
     * Logs out the user.
     */
    vm.logoutUser = function() {
        user.logout().then(function(res) {
            $state.go("login");
        }, function(res) {
            alert("Failed to log out");
        });
    };
}


module.exports = {
    controller: ["userFact", "$state", LoginCtrl],
    templateUrl: "/static/app/login/login.html"
};
