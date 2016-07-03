"use strict";

function TaskCtrl() {

}

module.exports = {
    controller: TaskCtrl,
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "name": "@"
    }
};
