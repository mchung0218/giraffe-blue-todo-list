"use strict";

/**
 * FooterCtrl()
 * The controller for the footer component.
 */
function FooterCtrl(todoList) {
    var vm = this;

    // Show only if the list has tasks, else hide.
    vm.show = function() {
        return todoList.taskList.length > 0;
    };
}


module.exports = {
    controller: ["listFact", FooterCtrl],
    templateUrl: "/static/app/todo/footer/todo-footer.html"
};
