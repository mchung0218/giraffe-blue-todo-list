"use strict";

/**
 * TaskCtrl()
 * The todo-task controller.
 */
function TaskCtrl() {
    var vm = this;

    // Initially the options menu is closed
    vm.optionsMenuOpen = false;

    vm.toggleOptionsMenu = function() {
        vm.optionsMenuOpen = !vm.optionsMenuOpen;
    };
}

module.exports = {
    require: {
        parent: "^todo"
    },
    controller: TaskCtrl,
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "name": "@"
    }
};
