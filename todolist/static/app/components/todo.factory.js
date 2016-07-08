"use strict";

/**
 * todoFactory()
 * Todo factory containing all operations.
 * @param taskApi: The API factory for todo-tasks.
 * @return todo: The todo object.
 */
function todoFactory(taskApi) {
    var todo = {};

    /**
     * getTaskList()
     * Gets the task list.
     * @return A promise of the GET operation.
     */
    todo.getTaskList = function() {
        return taskApi.Tasks.get().$promise;
    };

    /**
     * addTask()
     * Adds a task.
     * @param params: Parameters for the task ({ name, priority }).
     * @return : A promise of the resource.
     */
    todo.addTask = function(params) {
        params.id = 0;  // The id for adding tasks
        return taskApi.Task.save(params).$promise;
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     * @return : A promise of the resource.
     */
    todo.deleteTask = function(taskId) {
        return taskApi.Task.delete({ id: taskId }).$promise;
    };

    /**
     * editTask()
     * Edits the task name.
     * @param taskId: The id of the task to edit.
     * @param name: The task name to change to.
     * @return : A promise of the resource.
     */
    todo.editTask = function(taskId, name) {
        return taskApi.Task.update({ id: taskId, text: name }).$promise;
    };

    /**
     * changePriority()
     * Changes the task priority.
     * @param taskId: The id of the task to change.
     * @param priority: The priority to change to for the task.
     * @return : A promise of the resource.
     */
    todo.changePriority = function(taskId, priority) {
        return taskApi.TaskPriority.update({ id: taskId, priority: priority }).$promise;
    };

    /**
     * markCompleted()
     * Marks task completed.
     * @param taskId: The id of the task to change.
     * @return : A promise of the resource.
     */
    todo.markCompleted = function(taskId) {
        return taskApi.TaskCompleted.update({ id: taskId }).$promise;
    };

    return todo;
}


// Exports
module.exports = todoFactory;
