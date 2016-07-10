"use strict";

/**
 * loginApi()
 * Login API resources.
 */
function loginApi($resource) {
    return {
        "User": $resource("/user/"),

        "UserCreate": $resource("/user/create", {}),

        "UserLogout": $resource("/user/logout", {}, {
            logout: {
                "method": "POST"
            }
        })
    };
}


module.exports = loginApi;
