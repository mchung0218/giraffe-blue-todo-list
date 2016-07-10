"use strict";

/**
 * userFactory()
 * A factory for user control.
 * @param userApi: The user API.
 * @return user: The user object.
 */
function userFactory(userApi) {
    var user = {};

    // By default, user is not logged in.
    user.isLoggedIn = false;

    /**
     * register()
     * Registers a user.
     * @param userParams: Params to create the user ({ email, password })
     * @return : A promise of the resource.
     */
    user.register = function(userParams) {
        return userApi.UserCreate.save(userParams).$promise;
    };

    /**
     * login()
     * Logins a user.
     * @param userParams: Params to log in the user ({ email, password })
     * @return : A promise of the resource.
     */
    user.login = function(userParams) {
        return userApi.UserLogin.login(userParams).$promise;
    };

    /**
     * logout()
     * Logs out a user.
     * @param userParams: Params to log out
     * @return : A promise of the resource.
     */
    user.logout = function(userParams) {
        return userApi.UserLogout.logout(userParams).$promise;
    };

    user.checkLoggedIn = function() {
        return userApi.UserLoggedIn.check().$promise;
    };


    return user;
}


module.exports = userFactory;
