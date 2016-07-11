"use strict";

/**
 * CounterCtrl()
 * The controller for active tasks counter.
 * @param todoList: The todo-list factory.
 * @param todoFilter: The todo-filter factory.
 */
function CounterCtrl(todoList, todoFilter) {
    var vm = this;

    /**
     * activeTaskCount()
     * Get active task count, given a filter.
     * @return : A count of tasks for the filter applied.
     */
    vm.activeTaskCount = function() {
        var currentFilter = todoFilter.option;
        var filterTasks = [];

        if (currentFilter !== "completed") {
            filterTasks = todoList.taskList.filter(function(obj) {
                if (currentFilter === "all" || currentFilter === "active") {
                    return !obj["completed"];
                }

                else {
                    return obj.priority === currentFilter;
                }
            });
        }

        return filterTasks.length;
    };
}


// Exports
module.exports = {
    controller: ["listFact", "filterFact", CounterCtrl],
    templateUrl: "/static/app/todo/footer/counter/todo-counter.html"
};
