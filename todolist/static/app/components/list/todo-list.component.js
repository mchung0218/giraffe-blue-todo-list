"use strict";

function ListCtrl(taskFact) {
    var vm = this;

    // List of tasks
    vm.taskList = [];
}

module.exports = {
    controller: ListCtrl,
    templateUrl: ["taskFact", function(taskFact) {
        return "/static/app/components/list/todo-list.html";
    }]
};
