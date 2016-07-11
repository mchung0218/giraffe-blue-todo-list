"use strict";

/**
 * userFactory()
 * A factory for user control.
 * @param userApi: The user API.
 * @return user: The user object.
 */
function userFactory(userApi) {
    var user = {
        username: ""
    };

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
     * @return : A promise of the resource.
     */
    user.logout = function(userParams) {
        return userApi.UserLogout.logout(userParams).$promise;
    };

    /**
     * checkLoggedIn()
     * Checks if a user is logged in or not.
     * @return : A promise of the resource.
     */
    user.checkLoggedIn = function() {
        return userApi.UserLoggedIn.check().$promise;
    };

    /**
     * update()
     * Updates the user object.
     */
    user.update = function(userParams) {
        for (var userKey in userParams) {
            user[userKey] = userParams[userKey];
        }
    };

    return user;
}


module.exports = userFactory;
