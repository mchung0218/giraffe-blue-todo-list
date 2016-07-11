"use strict";

/**
 * userApi()
 * User API resources.
 */
function userApi($resource) {
    return {
        "User": $resource("/user/"),

        "UserLoggedIn": $resource("/user/loggedin", {}, {
            check: {
                "method": "POST"
            }
        }),

        "UserCreate": $resource("/user/create", {}),

        "UserLogin": $resource("/user/auth", {}, {
            login: {
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
        }),

        "UserChangePass": $resource("/user/changepass", {}, {
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
        })
    };
}


module.exports = userApi;
