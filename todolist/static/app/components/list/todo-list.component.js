"use strict";

function ListCtrl(Task) {
    var vm = this;

    // List of tasks
    vm.taskList = [];
}

module.exports = {
    controller: ["taskFact", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};
