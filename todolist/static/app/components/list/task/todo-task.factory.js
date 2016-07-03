"use strict";

/**
 * Task()
 * Task object.
 * @param name: Name of task.
 */
function Task(name) {
    this.name = name;
}

// Exports
module.exports = function() {
    return {
        create: function(name) {
            return new Task(name);
        }
    };
};
