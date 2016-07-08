"use strict";

/**
* todoListFactory()
* A factory for managing todo-list (on the client side).
* @param Task: The Task object.
* @return todoList: The todoList object.
*/
function todoListFactory(Task) {
    var todoList = {};

    todoList.taskList = [];

    /**
     * convertToTaskObjs()
     * Converts the entire list to Task objects.
     * @param serverTaskList: The server's task list.
     */
    todoList.convertToTaskObjs = function(serverTaskList) {
        todoList.taskList = serverTaskList.map(function(oldObj) {

            var taskObj = Object.create(Task.prototype, {
                text: { value: oldObj.text, writable: true },
                id: { value: oldObj.id, writable: true },
                priority: { value: oldObj.priority, writable: true },
                completed: { value: oldObj.completed, writable: true }
            });

            return taskObj;
        });
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
     * @param params: Parameters for the task ({ text, id, priority, completed }).
     */
    todoList.addTask = function(params) {
        todoList.taskList.push(Object.create(Task.prototype, {
            text: { value: params.text, writable: true },
            id: { value: params.id, writable: true },
            priority: { value: params.priority, writable: true },
            completed: { value: params.completed, writable: true }
        }));
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
