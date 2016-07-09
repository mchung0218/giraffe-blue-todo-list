"use strict";

/**
 * CounterCtrl()
 * The controller for active tasks counter.
 * @param todoList: The todo-list factory.
 */
function CounterCtrl(todoList) {
    var vm = this;

    vm.activeTaskCount = function() {
        var incompleteTasks = todoList.taskList.filter(function(obj) {
            return !obj.completed;
        });

        return incompleteTasks.length || 0;
    };
}


// Exports
module.exports = {
    controller: ["listFact", CounterCtrl],
    templateUrl: "/static/app/todo/footer/counter/todo-counter.html"
};
