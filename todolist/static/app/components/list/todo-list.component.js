"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 * @param todoList: The todo-list factory.
 */
function ListCtrl(todo, todoList) {
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

    // Initial execution
    vm.getTaskList();
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};
