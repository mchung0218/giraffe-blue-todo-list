"use strict";

/**
 * TaskCtrl()
 * The todo-task controller.
 * @param todo: The todo factory.
 * @param todoList: The todo-list factory.
 */
function TaskCtrl(todo, todoList) {
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
            // If successful, update the list view.
            todoList.deleteTask(taskId);

        }, function(res) {
            alert("Task failed to get deleted.");
        });
    };

    /**
     * editTask()
     * Edits the task.
     * @param taskId: The task id number.
     * @param name: The new task name to update to.
     */
    vm.editTask = function(taskId, name) {
        // If name changes and there is at least one character in it, then do the operation
        if (name.length > 0 && name !== vm.prevName) {
            todo.editTask(taskId, name).then(function(res) {
                // If successful, update the list view.
                todoList.editTask(taskId, name);

            }, function(res) {
                // If name changing fails, return it back to the way it was.
                vm.task.text = vm.prevName;
                
                alert("Task failed to update its name.");
            });
        }

        // Otherwise, return it back to the way it was.
        else {
            vm.task.text = vm.prevName;
        }
    };

    /**
     * changePriority()
     * Changes the priority of the task.
     * @param taskId: The task id number.
     * @param priority: The priority level to change to.
     */
    vm.changePriority = function(taskId, priority) {
        todo.changePriority(taskId, priority).then(function(res) {
            // If successful, update the list view.
            todoList.changePriority(taskId, priority);

        }, function(res) {
            alert("Task failed to change priority.");
        });
    };

    /**
     * markCompleted()
     * Mark task completed.
     * @param taskId: The task id number.
     */
    vm.markCompleted = function(taskId) {
        todo.markCompleted(taskId).then(function(res) {
            // If successful, update the list view.
            todoList.markCompleted(taskId);
            
        }, function(res) {
            alert("Task failed to mark completed.");
        });
    };
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", TaskCtrl],
    templateUrl: "/static/app/todo/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "task": "="     // The Task object itself
    }
};
