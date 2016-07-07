"use strict";

/**
 * taskApi()
 * Factory containing all task API resources.
 */
function taskApi($resource) {
    return {
        // All tasks
        "Tasks": $resource("/tasks/"),

        // Single task
        "Task": $resource("/task/:id", { id: "@id" }, {
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

        // Completed tasks
        "TaskCompleted": $resource("/task/completed/:id", { id: "@id" }, {
            update: {
                "method": "PATCH"
            }
        }),

        // Priority tasks
        "TaskPriority": $resource("/task/priority/:id", { id: "@id" }, {
            update: {
                "method": "PATCH"
            }
        })
    };
}

module.exports = taskApi;
