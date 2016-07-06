"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 */
function ListCtrl(todo, $rootScope) {
    var vm = this;

    // List of tasks
    vm.taskList = [];

    // Get task list
    vm.getTaskList = function() {
        todo.getTaskList().then(function(response) {
            vm.taskList = response.tasks;
        });
    };

    // Create a listener where whenever tasks get deleted or added, the list should get updated.
    $rootScope.$on("listUpdate", function() {
        vm.getTaskList();
    });

    // Initial execution
    vm.getTaskList();
}

// Exports
module.exports = {
    controller: ["todoFact", "$rootScope", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};
