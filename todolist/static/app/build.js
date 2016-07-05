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

module.exports = {
    require: {
        parent: "^todoTask"
    },
    templateUrl: "/static/app/components/list/task/options/todo-options.html"
};

},{}],8:[function(require,module,exports){
"use strict";

/**
 * TaskCtrl()
 * The todo-task controller.
 */
function TaskCtrl(todo) {
    var vm = this;

    // Initially the options menu is closed
    vm.optionsMenuOpen = false;

    /**
     * toggleOptionsMenu()
     * Toggles the option menu.
     */
    vm.toggleOptionsMenu = function() {
        vm.optionsMenuOpen = !vm.optionsMenuOpen;
    };

    /**
     * deleteTask()
     * Deletes the task.
     * @param taskId: The task id number.
     */
    vm.deleteTask = function(taskId) {
        todo.deleteTask(taskId);
    };

    /**
     * changePriority()
     * Changes the priority of the task.
     * @param taskId: The task id number.
     * @param priority: The priority level as a number (see the Task object for the details).
     */
    vm.changePriority = function(taskId, priority) {
        todo.changePriority(taskId, priority);
    };
}

// Exports
module.exports = {
    controller: ["todoFact", TaskCtrl],
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "task": "="     // The Task object itself
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
 * Task.prototype.changePriority()
 * Changes the priority level of the task.
 * @param priority: The new priority level as a number.
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
 * Task.prototype.editName()
 * Changes the task name.
 * @param name: The new name.
 */
Task.prototype.editName = function(name) {
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
 * Todo factory containing all operations.
 * @param Task: The todo-task factory (a Task object).
 * @return : The todo object.
 */
function todoFactory(Task) {
    var todo = {};

    // Keep track of tasks listed
    todo.taskList = [];

    /**
     * getTask()
     * Gets a task from the list.
     * @param taskId: The id of the task to get.
     */
    todo.getTask = function(taskId) {
        // Go through the task list
        for (var index = 0; index < todo.taskList.length; index++) {

            // For the entry found, return the task object and the index location in the list
            if (todo.taskList[index].id === taskId) {
                return {
                    "object": todo.taskList[index],
                    "index": index
                };
            }
        }
    };

    /**
     * addTask()
     * Adds a task and puts it to the list.
     * @param params: Parameters for the task ({ name, id }).
     */
    todo.addTask = function(params) {
        todo.taskList.push(new Task(params.name, params.id));
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     */
    todo.deleteTask = function(taskId) {
        var task = todo.getTask(taskId);

        todo.taskList.splice(task.index, 1);
    };

    /**
     * editTask()
     * Edits the task name.
     * @param taskId: The id of the task to edit.
     * @param name: The task name to change to.
     */
    todo.editTask = function(taskId, name) {
        var task = todo.getTask(taskId, name);
        
        task.object.editName(name);
    };

    /**
     * changePriority()
     * Changes the task priority.
     * @param taskId: The id of the task to change.
     * @param priority: The priority to change to for the task.
     */
    todo.changePriority = function(taskId, priority) {
        var task = todo.getTask(taskId);
        
        task.object.changePriority(priority);
    };

    return todo;
}


// Exports
module.exports = todoFactory;

},{}]},{},[2]);
