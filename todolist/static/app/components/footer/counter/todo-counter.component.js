"use strict";

/**
 * CounterCtrl()
 * The controller for active tasks counter.
 * @param todo: The todo factory.
 */
function CounterCtrl(todo) {
    var vm = this;

    // 1. Check the todo list
    // 2. Filter out the tasks that are completed.
    // 3. Bind a model on the DOM element
}


// Exports
module.exports = {
    controller: CounterCtrl,
    templateUrl: "/static/app/components/footer/counter/todo-counter.html"
};
