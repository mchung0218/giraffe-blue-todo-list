"use strict";

/**
 * TaskCtrl()
 * The todo-task controller.
 */
function TaskCtrl(todo, $rootScope) {
    var vm = this;

    // Initially the options menu is closed
    vm.optionsMenuOpen = false;

    /**
     * toggleOptionsMenu()
     * Toggles the option menu.
     */
    vm.toggleOptionsMenu = function() {
        vm.optionsMenuOpen = !vm.optionsMenuOpen;
    };

    /**
     * deleteTask()
     * Deletes the task.
     * @param taskId: The task id number.
     */
    vm.deleteTask = function(taskId) {
        todo.deleteTask(taskId).then(function(res) {
            // If successful, update view.
            $rootScope.$broadcast("listUpdate");

        }, function(res) {
            alert("Task failed to get deleted.");
        });
    };

    /**
     * changePriority()
     * Changes the priority of the task.
     * @param taskId: The task id number.
     * @param priority: The priority level as a number (see the Task object for the details).
     */
    vm.changePriority = function(taskId, priority) {
        todo.changePriority(taskId, priority);
    };
}

// Exports
module.exports = {
    controller: ["todoFact", "$rootScope", TaskCtrl],
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "task": "="     // The Task object itself
    }
};
