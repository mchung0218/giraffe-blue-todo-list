(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * httpConfig()
 * Configures the $http service.
 * @param $httpProvider: The $http provider.
 */
function httpConfig($httpProvider, $resourceProvider) {
    // Change the name of cookie to what Django uses
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

     // Change the name of header to what Django uses
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // Do not strip trailing slashes (e.g. /task/)
    $resourceProvider.defaults.stripTrailingSlashes = false;
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
    taskFact =          require("./components/list/task/todo-task.factory"),
    taskEnterEditMode = require("./components/list/task/todo-task.enterEditMode.directive.js"),
    taskExitEditMode =  require("./components/list/task/todo-task.exitEditMode.directive.js");

var footerComponent =   require("./components/footer/todo-footer.component"),
    counterComponent =  require("./components/footer/counter/todo-counter.component"),
    filterComponent =   require("./components/footer/filter/todo-filter.component");


// App module
var app = angular.module("todo", ["ngAnimate", "ngResource"]);

// Configurations
app.config(["$httpProvider", "$resourceProvider", httpConfig]);

// Services/factories
app.factory("todoFact", ["$resource", todoFact])
    .factory("taskFact", taskFact);

// Components
app.component("todo", mainComponent)
    .component("todoForm", formComponent)
    .component("todoList", listComponent)
    .component("todoTask", taskComponent)
    .component("todoFooter", footerComponent)
    .component("todoCounter", counterComponent)
    .component("todoFilter", filterComponent);

// Directives
app.directive("taskEnterEditMode", taskEnterEditMode)
    .directive("taskExitEditMode", taskExitEditMode);

},{"./app.config":1,"./components/footer/counter/todo-counter.component":3,"./components/footer/filter/todo-filter.component":4,"./components/footer/todo-footer.component":5,"./components/form/todo-form.component":6,"./components/list/task/todo-task.component":7,"./components/list/task/todo-task.enterEditMode.directive.js":8,"./components/list/task/todo-task.exitEditMode.directive.js":9,"./components/list/task/todo-task.factory":10,"./components/list/todo-list.component":11,"./components/todo.component":12,"./components/todo.factory":13}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

/**
 * FilterCtrl()
 * The controller for the filter component.
 */
function FilterCtrl(todo) {
    var vm = this;

    // 1. Place an ng-class on the <li> task element which would hide the element depending on what the priority number is.
}

// Exports
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
            alert("Failed to add task.");
        });
    };
}

// Exports
module.exports = {
    controller: ["todoFact", "$rootScope", FormCtrl],
    templateUrl: "/static/app/components/form/todo-form.html"
};

},{}],7:[function(require,module,exports){
"use strict";

/**
 * TaskCtrl()
 * The todo-task controller.
 */
function TaskCtrl(todo, $rootScope) {
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
        todo.deleteTask(taskId).then(function(res) {
            // If successful, update view.
            $rootScope.$broadcast("listUpdate");

        }, function(res) {
            alert("Task failed to get deleted.");
        });
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
    controller: ["todoFact", "$rootScope", TaskCtrl],
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "task": "="     // The Task object itself
    }
};

},{}],8:[function(require,module,exports){
/**
 * enterEditMode()
 * On click of task name box (as a <span>), enter edit mode.
 */
function enterEditMode() {
    return {
        restrict: "A",      // Attribute only
        link: function($scope, ele) {
            // Get the input box
            var theInput = ele.parent()[0].getElementsByClassName("todo-list__task-name--input")[0];

            ele.on("click", function() {
                ele.addClass("hide");

                angular.element(theInput).removeClass("hide");
                theInput.focus();
            });
        }
    };
}

// Exports
module.exports = enterEditMode;

},{}],9:[function(require,module,exports){
/**
 * exitEditMode()
 * On blur of task edit box, exit edit mode.
 */
function exitEditMode() {
    return {
        restrict: "A",      // Attribute only
        link: function($scope, ele) {
            // Get the task name box
            var theSpan = ele.parent()[0].getElementsByClassName("todo-list__task-name--span")[0];

            ele.on("blur", function() {
                ele.addClass("hide");

                angular.element(theSpan).removeClass("hide");
            });
        }
    };
}

// Exports
module.exports = exitEditMode;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 */
function ListCtrl(todo, $rootScope) {
    var vm = this;

    // List of tasks
    vm.taskList = [];

    // Get task list
    vm.getTaskList = function() {
        todo.getTaskList().then(function(response) {
            vm.taskList = response.tasks;
        });
    };

    // Create a listener where whenever tasks get deleted or added, the list should get updated.
    $rootScope.$on("listUpdate", function() {
        vm.getTaskList();
    });

    // Initial execution
    vm.getTaskList();
}

// Exports
module.exports = {
    controller: ["todoFact", "$rootScope", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
"use strict";

/**
 * todoFactory()
 * Todo factory containing all operations.
 */
function todoFactory($resource) {
    var todo = {};

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
     * getTaskList()
     * Gets the task list.
     * @return A promise of the GET operation.
     */
    todo.getTaskList = function() {
        var taskResource = $resource("/tasks/");

        return taskResource.get().$promise;
    };

    /**
     * addTask()
     * Adds a task.
     * @param params: Parameters for the task ({ name, priority, id }).
     * @return : A promise of the POST operation.
     */
    todo.addTask = function(params) {
        var taskResource = $resource("/task/0", {}, {
            save: {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "transformRequest": function(obj) {     // Convert the JSON to seralized POST data
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }
        });

        return taskResource.save({}, params).$promise;
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     */
    todo.deleteTask = function(taskId) {
        var taskResource = $resource("/task/:id", { id: taskId });

        return taskResource.delete({ id: taskId }).$promise;
    };

    /**
     * editTask()
     * Edits the task name.
     * @param taskId: The id of the task to edit.
     * @param name: The task name to change to.
     */
    todo.editTask = function(taskId, name) {
        var taskResource = $resource("/task/:id", { id: taskId });

        return taskResource.delete({ id: taskId }).$promise;
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
