"use strict";

/**
 * todoFactory()
 * Todo factory containing all operations.
 */
function todoFactory($resource, $http) {
    var todo = {};

    /**
     * getTask()
     * Gets a task from the list.
     * @param taskId: The id of the task to get.
     */
    todo.getTask = function(taskId) {
        // Go through the task list
        for (var index = 0; index < todo.taskList.length; index++) {

            // For the entry found, return the task object and the index location in the list
            if (todo.taskList[index].id === taskId) {
                return {
                    "object": todo.taskList[index],
                    "index": index
                };
            }
        }
    };

    /**
     * getTaskList()
     * Gets the task list.
     * @return A promise of the GET operation.
     */
    todo.getTaskList = function() {
        var taskResource = $resource("/tasks/");

        return taskResource.get().$promise;
    };

    /**
     * addTask()
     * Adds a task.
     * @param params: Parameters for the task ({ name, priority, id }).
     * @return : A promise of the POST operation.
     */
    todo.addTask = function(params) {
        var taskResource = $resource("/task/0", {}, {
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
        });

        return taskResource.save({}, params).$promise;
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     */
    todo.deleteTask = function(taskId) {
        var taskResource = $resource("/task/:id", { id: taskId });

        return taskResource.delete({ id: taskId }).$promise;
    };

    /**
     * editTask()
     * Edits the task name.
     * @param taskId: The id of the task to edit.
     * @param name: The task name to change to.
     */
    todo.editTask = function(taskId, name) {
        // var taskResource = $resource("/task/:id", { id: taskId, text: name }, {
        //     update: {
        //         "method": "PATCH"
        //     }
        // });

        // // taskResource.prototype.$save = function() {
        // //     if ( !this.id ) {
        // //         return this.$create();
        // //     }
        // //     else {
        // //         return this.$update();
        // //     }
        // // };

        // console.log(taskResource);
        // return taskResource.update({ id: taskId, text: name }).$promise;
        return $http.patch("/task/" + taskId, { id: taskId, text: name }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    };

    /**
     * markCompleted()
     * Mark task completed.
     */
    todo.markCompleted = function(taskId) {
        var taskResource = $resource("/task/completed/:id", { id: taskId }, {
            update: {
                "method": "PATCH"
            }
        });

        return taskResource.update({ id: taskId }).$promise;
    };

    /**
     * changePriority()
     * Changes the task priority.
     * @param taskId: The id of the task to change.
     * @param priority: The priority to change to for the task.
     */
    todo.changePriority = function(taskId, priority) {
        var taskResource = $resource("/task/priority/:id", { id: taskId }, {
            update: {
                "method": "PATCH"
            }
        });

        return taskResource.update(priority).$promise;
    };

    return todo;
}


// Exports
module.exports = todoFactory;
