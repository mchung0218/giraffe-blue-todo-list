"use strict";

/**
 * Task()
 * Task object.
 * @param name: Name of task.
 * @param number: Task number.
 */
function Task(name, id) {
    this.name = name;
    this.id = id;
    this.priority = 1;  // Default: Low priority
}

/**
 * changePriority()
 * Changes the priority level of the task.
 * @param priority: The priority level as a number.
 */
Task.prototype.changePriority = function(priority) {
    // Priority levels
    // 0 = completed
    // 1 = low
    // 2 = moderate
    // 3 = important
    this.priority = priority;
};

/**
 * updateName()
 * Changes the task name.
 * @param name: The new name.
 */
Task.prototype.updateName = function(name) {
    this.name = name;
};

// Exports
module.exports = function() {
    return Task;
};
