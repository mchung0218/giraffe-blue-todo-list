"use strict";

/**
 * FormCtrl()
 * The todo-form controller (input box).
 * @param todo: The todo object.
 */
function FormCtrl(todo) {
    var vm = this;

    // Use this to assign task id numbers
    var taskNum = 1;

    /**
     * submit()
     * On submit of the input box.
     */
    vm.submit = function() {
        // Take the form data, put it as an object
        var formData = {
            "name": vm.form.taskName,
            "id": taskNum
        };

        // Add the task
        todo.addTask(formData);

        taskNum++;
    };
}

// Exports
module.exports = {
    controller: ["todoFact", FormCtrl],
    templateUrl: "/static/app/components/form/todo-form.html"
};
