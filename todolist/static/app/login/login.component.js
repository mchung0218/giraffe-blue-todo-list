"use strict";

/**
 * LoginCtrl()
 * Login controller.
 * @param login: The login factory.
 */
function LoginCtrl(login) {
    var vm = this;

    /**
     * registerUser()
     * Registers a user.
     */
    vm.registerUser = function() {
        var formData = {
            username: vm.form.username,
            email: vm.form.email,
            password: vm.form.password,
        };

        console.log(formData);

        login.registerUser(formData).then(function(res) {
            console.log("Created user");
            console.log(res);
        }, function(res) {
            console.log("Failed to create user");
            document.write(res.data);
        });
    };

    /**
     * loginUser()
     * Logins a user.
     */
    vm.signinUser = function() {

    };
}


module.exports = {
    controller: ["loginFact", LoginCtrl],
    templateUrl: "/static/app/login/login.html"
};
