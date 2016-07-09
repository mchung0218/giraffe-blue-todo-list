"use strict";

/**
 * loginApi()
 * Login API resources.
 */
function loginApi($resource) {
    return {
        "User": $resource("/user/"),

        "UserCreate": $resource("/user/create", {}, {
            save: {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "transformRequest": function(obj) {     // Convert the JSON to seralized POST data
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }
        }),

        "UserLogout": $resource("/user/logout", {}, {
            logout: {
                "method": "POST"
            }
        })
    };
}


module.exports = loginApi;
