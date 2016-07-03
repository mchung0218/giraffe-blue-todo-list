(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * httpConfig()
 * Configures the $http service.
 * @param $httpProvider: The $http provider.
 */
function httpConfig($httpProvider) {
    //console.log($httpProvider.defaults);
}

module.exports = httpConfig;

},{}],2:[function(require,module,exports){
"use strict";

// Requires
var httpConfig =        require("./app.config");

var mainComponent =     require("./components/todo.component"),
    todoFact =          require("./components/todo.factory");

var formComponent =     require("./components/form/todo-form.component");

var listComponent =     require("./components/list/todo-list.component"),
    taskComponent =     require("./components/list/task/todo-task.component"),
    optionsComponent =  require("./components/list/task/options/todo-options.component"),
    taskFact =          require("./components/list/task/todo-task.factory");

var footerComponent =   require("./components/footer/todo-footer.component"),
    counterComponent =  require("./components/footer/counter/todo-counter.component"),
    filterComponent =   require("./components/footer/filter/todo-filter.component");


// App module
var app = angular.module("todo", ["ngAnimate"]);

// Configurations
app.config(["$httpProvider", httpConfig]);

// Services/factories
app.factory("todoFact", ["taskFact", todoFact])
    .factory("taskFact", taskFact);

// Components
app.component("todo", mainComponent)
    .component("todoForm", formComponent)
    .component("todoList", listComponent)
    .component("todoTask", taskComponent)
    .component("todoOptions", optionsComponent)
    .component("todoFooter", footerComponent)
    .component("todoCounter", counterComponent)
    .component("todoFilter", filterComponent);

},{"./app.config":1,"./components/footer/counter/todo-counter.component":3,"./components/footer/filter/todo-filter.component":4,"./components/footer/todo-footer.component":5,"./components/form/todo-form.component":6,"./components/list/task/options/todo-options.component":7,"./components/list/task/todo-task.component":8,"./components/list/task/todo-task.factory":9,"./components/list/todo-list.component":10,"./components/todo.component":11,"./components/todo.factory":12}],3:[function(require,module,exports){
"use strict";

function CounterCtrl() {

}


module.exports = {
    controller: CounterCtrl,
    templateUrl: "/static/app/components/footer/counter/todo-counter.html"
};

},{}],4:[function(require,module,exports){
"use strict";

function FilterCtrl() {

}


module.exports = {
    controller: FilterCtrl,
    templateUrl: "/static/app/components/footer/filter/todo-filter.html"
};

},{}],5:[function(require,module,exports){
"use strict";

function FooterCtrl() {

}


module.exports = {
    controller: FooterCtrl,
    templateUrl: "/static/app/components/footer/todo-footer.html"
};

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";

function OptionsCtrl() {

}


module.exports = {
    controller: OptionsCtrl,
    templateUrl: "/static/app/components/list/task/options/todo-options.html"

};

},{}],8:[function(require,module,exports){
"use strict";

module.exports = {
    require: {
        parent: "^todo"
    },
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "name": "@"
    }
};

},{}],9:[function(require,module,exports){
"use strict";

/**
 * Task()
 * Task object.
 * @param name: Name of task.
 * @param number: Task number.
 */
function Task(name, id) {
    this.name = name;
    this.id = id;
    this.priority = 1;  // Default: Low priority
}

/**
 * changePriority()
 * Changes the priority level of the task.
 * @param priority: The priority level as a number.
 */
Task.prototype.changePriority = function(priority) {
    // Priority levels
    // 0 = completed
    // 1 = low
    // 2 = moderate
    // 3 = important
    this.priority = priority;
};

/**
 * updateName()
 * Changes the task name.
 * @param name: The new name.
 */
Task.prototype.updateName = function(name) {
    this.name = name;
};

// Exports
module.exports = function() {
    return Task;
};

},{}],10:[function(require,module,exports){
"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 */
function ListCtrl(todo) {
    var vm = this;

    // List of tasks
    vm.taskList = todo.taskList;
}

// Exports
module.exports = {
    require: {  // Get access to TodoCtrl
        parent: "^todo"
    },
    controller: ["todoFact", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};

},{}],11:[function(require,module,exports){
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
    templateUrl: "/static/app/components/todo.html"
};

},{}],12:[function(require,module,exports){
"use strict";

/**
 * todoFactory()
 * Todo factory.
 * @param Task: The todo-task factory (a Task object).
 * @return : The todo object.
 */
function todoFactory(Task) {
    var todo = {};

    // Keep track of tasks listed
    todo.taskList = [];

    /**
     * addTask()
     * Adds a task and puts it to the list.
     */
    todo.addTask = function(params) {
        todo.taskList.push(new Task(params.name, params.id));
        console.log(params);
    };

    /**
     * deleteTask()
     * Deletes a task.
     */
    todo.deleteTask = function() {
        
    };

    /**
     * editTask()
     * Edits the task (name?).
     */
    todo.editTask = function() {

    };

    /**
     * changePriority()
     * Sets the task priority.
     */
    todo.changePriority = function() {

    };

    return todo;
}


// Exports
module.exports = todoFactory;

},{}]},{},[2]);
