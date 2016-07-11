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

    // Keep track of errors
    vm.error = {
        permissionEdit: false,
        failEdit: false,
        permissionDelete: false,
        failDelete: false,
        changePriority: false,
        markCompleted: false
    };

    /**
     * resetErrors()
     * Reset errors.
     */
    vm.resetErrors = function() {
        for (var error in vm.error) {
            vm.error[error] = false;
        }
    };

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
        vm.resetErrors();

        todo.deleteTask(taskId).then(function(res) {
            if (res.error === "true") {
                if (res.errorMessage === "Permission Denied") {
                    vm.error.permissionDelete = true;
                }

                else {
                    vm.error.failDelete = true;
                }
            }

            // If successful, update the list view.
            else {
                todoList.deleteTask(taskId);
            }
        }, function(res) {
            vm.error.failDelete = true;
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
            vm.resetErrors();

            todo.editTask(taskId, name).then(function(res) {
                if (res.error === "true") {
                    // If error, return it back to the way it was.
                    vm.task.text = vm.prevName;

                    if (res.errorMessage === "Permission Denied") {
                        vm.error.permissionEdit = true;
                    }

                    else {
                        vm.error.failEdit = true;
                    }
                }
                
                // If successful, update the list view.
                else {
                    todoList.editTask(taskId, name);
                }
            }, function(res) {
                // If name changing fails, return it back to the way it was.
                vm.task.text = vm.prevName;
                
                vm.error.failEdit = true;
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
        vm.resetErrors();

        todo.changePriority(taskId, priority).then(function(res) {
            if (res.error === "true") {
                vm.error.changingPriority = true;
            }

            // If successful, update the list view.
            else {
                todoList.changePriority(taskId, priority);
            }

        }, function(res) {
            vm.error.changingPriority = true;
        });
    };

    /**
     * markCompleted()
     * Mark task completed.
     * @param taskId: The task id number.
     */
    vm.markCompleted = function(taskId) {
        vm.resetErrors();

        todo.markCompleted(taskId).then(function(res) {
            if (res.error === "true") {
                vm.error.markCompleted = true;
            }
            
            // If successful, update the list view.
            else {
                todoList.markCompleted(taskId);
            }
            
        }, function(res) {
            vm.error.markCompleted = true;
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
