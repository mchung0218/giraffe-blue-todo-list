"use strict";

/**
 * todoFactory()
 * Todo factory containing all operations.
 * @param Task: The todo-task factory (a Task object).
 * @return : The todo object.
 */
function todoFactory(Task) {
    var todo = {};

    // Keep track of tasks listed
    todo.taskList = [];

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
     * addTask()
     * Adds a task and puts it to the list.
     * @param params: Parameters for the task ({ name, id }).
     */
    todo.addTask = function(params) {
        todo.taskList.push(new Task(params.name, params.id));
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     */
    todo.deleteTask = function(taskId) {
        var task = todo.getTask(taskId);

        todo.taskList.splice(task.index, 1);
    };

    /**
     * editTask()
     * Edits the task name.
     * @param taskId: The id of the task to edit.
     * @param name: The task name to change to.
     */
    todo.editTask = function(taskId, name) {
        var task = todo.getTask(taskId, name);
        
        task.object.editName(name);
    };

    /**
     * changePriority()
     * Changes the task priority.
     * @param taskId: The id of the task to change.
     * @param priority: The priority to change to for the task.
     */
    todo.changePriority = function(taskId, priority) {
        var task = todo.getTask(taskId);
        
        task.object.changePriority(priority);
    };

    return todo;
}


// Exports
module.exports = todoFactory;
