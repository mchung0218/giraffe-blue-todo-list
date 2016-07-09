"use strict";

/**
 * TodoCtrl()
 * The controller for the entire todo container.
 * @param todo: The todo factory.
 */
function TodoCtrl(todo) {
    var vm = this;
}

// Export the component (invoked in app.js)
module.exports = {
    controller: ["todoFact", TodoCtrl],
    templateUrl: "/static/app/todo/todo.html"
};
