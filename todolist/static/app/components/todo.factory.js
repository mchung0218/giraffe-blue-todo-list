"use strict";

/**
 * todoFactory()
 * Todo factory.
 * @param Task: The todo-task factory (a Task object).
 * @return : The todo object.
 */
function todoFactory(Task) {
    var todo = {};

    // Keep track of tasks listed
    todo.taskList = [];

    /**
     * addTask()
     * Adds a task and puts it to the list.
     */
    todo.addTask = function(params) {
        todo.taskList.push(new Task(params.name, params.id));
        console.log(params);
    };

    /**
     * deleteTask()
     * Deletes a task.
     */
    todo.deleteTask = function() {
        
    };

    /**
     * editTask()
     * Edits the task (name?).
     */
    todo.editTask = function() {

    };

    /**
     * changePriority()
     * Sets the task priority.
     */
    todo.changePriority = function() {

    };

    return todo;
}


// Exports
module.exports = todoFactory;
