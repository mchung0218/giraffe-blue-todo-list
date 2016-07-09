"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 * @param todoList: The todo-list factory.
 * @param todoFilter: The todo-filter factory.
 */
function ListCtrl(todo, todoList, todoFilter) {
    var vm = this;

    // List of tasks
    vm.taskList = todoList.taskList;

    // Get task list
    vm.getTaskList = function() {
        todo.getTaskList().then(function(response) {
            // Once the list is retrieved from the server, copy it to the client side
            todoList.copyServerList(response.tasks);

            // Update model
            vm.taskList = todoList.taskList;
        });
    };

    // Get the filter option
    vm.listFilter = function() {
        return todoFilter.option;
    };

    // Initial execution
    vm.getTaskList();
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", "filterFact", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};
