"use strict";

/**
 * Task()
 * Task object.
 * @param text: Name of task.
 * @param id: Task id.
 * @param priority: The priority level.
 * @param completed: Whether task is completed or not (0 or 1).
 */
function Task(text, id, priority, completed) {
    this.text = text;
    this.id = id;
    this.priority = priority;
    this.completed = completed;
}

/**
 * Task.prototype.changePriority()
 * Changes the priority level of the task.
 * @param priority: The new priority level.
 */
Task.prototype.changePriority = function(priority) {
    this.priority = priority;
};

/**
 * Task.prototype.editName()
 * Changes the task name.
 * @param name: The new name.
 */
Task.prototype.editName = function(text) {
    this.text = text;
};

// Exports
module.exports = function() {
    return Task;
};
