"use strict";

/**
 * todoListFilter()
 * Filter operations for todo-list.
 */
function todoListFilter() {
    // Filter by priority
    function filterPriority(priority) {
        return this.filter(function(taskObj) {
            return taskObj.priority === priority;
        });
    }

    // Filter by active tasks
    function filterActiveTasks() {
        return this.filter(function(taskObj) {
            return taskObj.priority !== "completed";
        });
    }

    return function(taskList, option) {
        if (option === "all") { 
            return taskList;
        }

        else if (option === "active") {
            return filterActiveTasks.call(taskList);
        }

        else {
            return filterPriority.call(taskList, option);
        }
    };
}

module.exports = todoListFilter;
