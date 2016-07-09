"use strict";

/**
* todoListFactory()
* A factory for managing todo-list (on the client side).
* @return todoList: The todoList object.
*/
function todoListFactory() {
    var todoList = {};

    // Array of tasks
    todoList.taskList = [];

    /**
     * copyServerList()
     * Copies the server list.
     * @param serverTaskList: The server's task list.
     */
    todoList.copyServerList = function(serverTaskList) {
        todoList.taskList = serverTaskList;
    };

    /**
     * getTask()
     * Gets a task from the list.
     * @param taskId: The id of the task to get.
     * @return : If the task exists, an object containing its object and index number in the list.
     */
    todoList.getTask = function(taskId) {
        // Go through the task list
        for (var index = 0; index < todoList.taskList.length; index++) {

            // For the entry found, return the task object and the index location in the list
            if (todoList.taskList[index].id === taskId) {
                return {
                    "object": todoList.taskList[index],
                    "index": index
                };
            }
        }
    };
    
    /**
     * addTask()
     * Adds a task and puts it to the list.
     * @param newTask: The new task object.
     */
    todoList.addTask = function(newTask) {
        todoList.taskList.push(newTask);
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     */
    todoList.deleteTask = function(taskId) {
        var task = todoList.getTask(taskId);

        todoList.taskList.splice(task.index, 1);
    };

    /**
     * editTask()
     * Changes the task name.
     * @param taskId: The id of the task to change.
     * @param name: The new name to change task to.
     */
    todoList.editTask = function(taskId, name) {
        var task = todoList.getTask(taskId);

        todoList.taskList[task.index].text = name;
    };

    /**
     * changePriority()
     * Changes the task priority.
     * @param taskId: The id of the task to change.
     * @param priority: The new priority to change the task to.
     */
    todoList.changePriority = function(taskId, priority) {
        var task = todoList.getTask(taskId);

        todoList.taskList[task.index].priority = priority;

        if (task.object.completed === 1) {
            todoList.taskList[task.index].completed = 0;
        }
    };

    /**
     * markCompleted
     * Marks task completed.
     * @param taskId: The id of the task to mark.
     */
    todoList.markCompleted = function(taskId) {
        var task = todoList.getTask(taskId);

        todoList.taskList[task.index].completed = 1;
    };

    return todoList;
}

module.exports = todoListFactory;
