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
     * editTask()
     * Edits the task.
     * @param taskId: The task id number.
     * @param name: The new task name to update to.
     */
    vm.editTask = function(taskId, name) {
        console.log(name);

        if (name.length > 0) {
            todo.editTask(taskId, name).then(function(res) {
                console.log(res);
                // If successful, update view.
                $rootScope.$broadcast("listUpdate");

            }, function(res) {
                vm.task.text = vm.prevName;
                document.write(res.data);
                alert("Task failed to update its name.");
            });
        }

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
            console.log(res);
            $rootScope.$broadcast("listUpdate");
        }, function(res) {
            console.log(res);
            // alert("Task failed to change priority");
            document.write(res.data);
        });
    };

    /**
     * markCompleted()
     * Mark task completed.
     * @param taskId: The task id number.
     */
    vm.markCompleted = function(taskId) {
        todo.markCompleted(taskId).then(function(res) {
            $rootScope.$broadcast("listUpdate");
        }, function(res) {
            alert("Task failed to mark completed");
        });
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
