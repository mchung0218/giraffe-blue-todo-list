"use strict";

/**
 * FormCtrl()
 * The todo-form controller (input box).
 * @param todo: The todo factory.
 * @param todoList: The todo-list factory. 
 */
function FormCtrl(todo, todoList) {
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
            // Add it to the client side list
            var newTask = res.task;

            todoList.addTask(newTask);
            
        }, function(res) {
            alert("Failed to add task.");
        });
    };
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", FormCtrl],
    templateUrl: "/static/app/todo/form/todo-form.html"
};
