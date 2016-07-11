"use strict";

/**
 * LoginCtrl()
 * Login controller.
 * @param user: The user factory.
 */
function LoginCtrl(user, $state) {
    var vm = this;

    // Error tracker
    vm.error = {
        badRegisterEmail: false,
        badMissingFields: false,
        badLogin: false,
        changePassNoUserFound: false,
        changePassFail: false,
    };

    /**
     * resetErrors()
     * Reset errors.
     */
    vm.resetErrors = function() {
        for (var error in vm.error) {
            vm.error[error] = false;
        }
    };

    /**
     * registerUser()
     * Registers a user.
     */
    vm.registerUser = function() {
        vm.resetErrors();

        // Only register if both fields are filled
        if (vm.form.password && vm.form.email) {
            var formData = {
                email: vm.form.email,
                password: vm.form.password,
            };

            user.register(formData).then(function(res) {
                // If register is successful, attempt to log in user.
                vm.loginUser(formData);

            }, function(res) {
                vm.error.badRegisterEmail = true;
                vm.clearPassFields();
            });
        }

        // Otherwise, show error
        else {
            vm.error.badMissingFields = true;
        }
    };

    /**
     * loginUser()
     * Logins the user.
     */
    vm.loginUser = function() {
        vm.resetErrors();

        var formData = {
            email: vm.form.email,
            password: vm.form.password,
        };

        user.login(formData).then(function(res) {
            user.update({
                username: formData.email
            });

            // If the user is authenticated, then move to list
            if (res.login === 'true') {
                $state.go("todo");
            }

            // Otherwise, show an error
            else {
                vm.error.badLogin = true;
                vm.clearPassFields();
            }
        }, function(res) {
            vm.error.badLogin = true;
            vm.clearPassFields();
        });
    };

    /**
     * changePass()
     * Changes the user's password.
     */
    vm.changePass = function() {
        vm.resetErrors();

        // Only register if both fields are filled
        if (vm.form.new_password && vm.form.email) {
            var formData = {
                email: vm.form.email,
                new_password: vm.form.new_password,
            };

            user.changePass(formData).then(function(res) {
                if (res.error === "true") {
                    // If no user is found
                    if (res.errorMessage === "User not found") {
                        vm.error.changePassNoUserFound = true;
                    }

                    // For all other change password errors
                    else {
                        vm.error.changePassFail = true;
                    }

                    vm.clearPassFields();
                }

                // If successful, turn back into login mode
                else {
                    vm.forgotMode = false;
                }
            }, function(res) {
                vm.error.changePassFail = true;

                vm.clearPassFields();
            });
        }

        // Otherwise, error missing field
        else {
            vm.error.badMissingFields = true;
        }
    };


    /**
     * clearPassFields()
     * Clear password fields (for unsuccessful logins).
     */
    vm.clearPassFields = function() {
        vm.form.password = "";
        vm.form.new_password = "";
    };
}


module.exports = {
    controller: ["userFact", "$state", LoginCtrl],
    templateUrl: "/static/app/login/login.html"
};
