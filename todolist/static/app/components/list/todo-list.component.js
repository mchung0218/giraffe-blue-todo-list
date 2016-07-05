"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 */
function ListCtrl(todo) {
    var vm = this;

    // List of tasks
    vm.taskList = todo.taskList;
}

// Exports
module.exports = {
    controller: ["todoFact", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};
