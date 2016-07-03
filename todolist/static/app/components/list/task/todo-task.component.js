"use strict";

module.exports = {
    require: {
        parent: "^todo"
    },
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "name": "@"
    }
};
