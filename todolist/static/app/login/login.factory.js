"use strict";

/**
 * loginFactory()
 * A factory for login usage.
 * @param loginApi: The login API.
 * @return login: The login object.
 */
function loginFactory(loginApi) {
    var login = {};

    /**
     * registerUser()
     * Registers a user.
     * @param userParams: Params to create the user ({ username, email, password })
     * @return : A promise of the resource.
     */
    login.registerUser = function(userParams) {
        return loginApi.UserCreate.save(userParams).$promise;
    };

    return login;
}


module.exports = loginFactory;
