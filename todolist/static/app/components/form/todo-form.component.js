"use strict";

/**
 * FormCtrl()
 * The todo-form controller (input box).
 * @param todo: The todo object.
 */
function FormCtrl(todo, $rootScope) {
    var vm = this;

    /**
     * submit()
     * On submit of the input box.
     */
    vm.submit = function() {
        // Take the form data, put it as an object
        var formData = {
            "text": vm.form.taskName,
            "priority": "low"
        };

        // Add the task
        todo.addTask(formData).then(function(res) {
            // If successful, update the list.
            $rootScope.$broadcast("listUpdate");

        }, function(res) {


        });
    };
}

// Exports
module.exports = {
    controller: ["todoFact", "$rootScope", FormCtrl],
    templateUrl: "/static/app/components/form/todo-form.html"
};
