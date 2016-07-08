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
    listFact =          require("./components/list/todo-list.factory"),
    taskComponent =     require("./components/list/task/todo-task.component"),
    taskApiFact =       require("./components/list/task/todo-task.api.factory"),
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
app.factory("todoFact", ["taskApi", todoFact])
    .factory("listFact", listFact)
    .factory("taskApi", ["$resource", taskApiFact]);

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

},{"./app.config":1,"./components/footer/counter/todo-counter.component":3,"./components/footer/filter/todo-filter.component":4,"./components/footer/todo-footer.component":5,"./components/form/todo-form.component":6,"./components/list/task/todo-task.api.factory":7,"./components/list/task/todo-task.component":8,"./components/list/task/todo-task.enterEditMode.directive.js":9,"./components/list/task/todo-task.exitEditMode.directive.js":10,"./components/list/todo-list.component":11,"./components/list/todo-list.factory":12,"./components/todo.component":13,"./components/todo.factory":14}],3:[function(require,module,exports){
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
    templateUrl: "/static/app/components/form/todo-form.html"
};

},{}],7:[function(require,module,exports){
"use strict";

/**
 * taskApi()
 * Factory containing all task API resources.
 */
function taskApi($resource) {
    return {
        // All tasks
        "Tasks": $resource("/tasks/"),

        // Single task
        "Task": $resource("/task/:id", { id: "@id" }, {
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
            },

            update: {
                "method": "PATCH",
            }
        }),

        // Completed tasks
        "TaskCompleted": $resource("/task/completed/:id", { id: "@id" }, {
            update: {
                "method": "PATCH"
            }
        }),

        // Priority tasks
        "TaskPriority": $resource("/task/priority/:id", { id: "@id" }, {
            update: {
                "method": "PATCH"
            }
        })
    };
}

module.exports = taskApi;

},{}],8:[function(require,module,exports){
"use strict";

/**
 * TaskCtrl()
 * The todo-task controller.
 * @param todo: The todo factory.
 * @param todoList: The todo-list factory.
 */
function TaskCtrl(todo, todoList) {
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
            // If successful, update the list view.
            todoList.deleteTask(taskId);

        }, function(res) {
            alert("Task failed to get deleted.");
        });
    };

    /**
     * editTask()
     * Edits the task.
     * @param taskId: The task id number.
     * @param name: The new task name to update to.
     */
    vm.editTask = function(taskId, name) {
        // If name changes and there is at least one character in it, then do the operation
        if (name.length > 0 && name !== vm.prevName) {
            todo.editTask(taskId, name).then(function(res) {
                // If successful, update the list view.
                todoList.editTask(taskId, name);

            }, function(res) {
                // If name changing fails, return it back to the way it was.
                vm.task.text = vm.prevName;
                
                alert("Task failed to update its name.");
            });
        }

        // Otherwise, return it back to the way it was.
        else {
            vm.task.text = vm.prevName;
        }
    };

    /**
     * changePriority()
     * Changes the priority of the task.
     * @param taskId: The task id number.
     * @param priority: The priority level to change to.
     */
    vm.changePriority = function(taskId, priority) {
        todo.changePriority(taskId, priority).then(function(res) {
            // If successful, update the list view.
            todoList.changePriority(taskId, priority);
        }, function(res) {
            alert("Task failed to change priority.");
        });
    };

    /**
     * markCompleted()
     * Mark task completed.
     * @param taskId: The task id number.
     */
    vm.markCompleted = function(taskId) {
        todo.markCompleted(taskId).then(function(res) {
            // If successful, update the list view.
            todoList.markCompleted(taskId);
            
        }, function(res) {
            alert("Task failed to mark completed.");
        });
    };
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", TaskCtrl],
    templateUrl: "/static/app/components/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "task": "="     // The Task object itself
    }
};

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
/**
 * exitEditMode()
 * On blur/enter of task edit box, exit edit mode.
 */
function exitEditMode() {
    return {
        restrict: "A",      // Attribute only
        link: function($scope, ele) {
            // Get the task name box
            var theSpan = ele.parent()[0].getElementsByClassName("todo-list__task-name--span")[0];

            // Called when blurred or enter key is pressed
            var blurredFunc = function() {
                ele.addClass("hide");

                angular.element(theSpan).removeClass("hide");
            };

            // On blur
            ele.on("blur", blurredFunc);

            // On keypress
            ele.on("keypress", function(e) {
                var code = e.keyCode || e.which;

                if (e.keyCode === 13) {
                    blurredFunc();
                }
            });
        }
    };
}

// Exports
module.exports = exitEditMode;

},{}],11:[function(require,module,exports){
"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 * @param todoList: The todo-list factory.
 */
function ListCtrl(todo, todoList) {
    var vm = this;

    // List of tasks
    vm.taskList = todoList.taskList;

    // Get task list
    vm.getTaskList = function() {
        todo.getTaskList().then(function(response) {
            // Once the list is retrieved from the server, copy it to the client side
            todoList.copyServerList(response.tasks);

            // Update model
            vm.taskList = todoList.taskList;
        });
    };

    // Initial execution
    vm.getTaskList();
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", ListCtrl],
    templateUrl: "/static/app/components/list/todo-list.html"
};

},{}],12:[function(require,module,exports){
"use strict";

/**
* todoListFactory()
* A factory for managing todo-list (on the client side).
* @return todoList: The todoList object.
*/
function todoListFactory() {
    var todoList = {};

    // Array of tasks
    todoList.taskList = [];

    /**
     * copyServerList()
     * Copies the server list.
     * @param serverTaskList: The server's task list.
     */
    todoList.copyServerList = function(serverTaskList) {
        todoList.taskList = serverTaskList;
    };

    /**
     * getTask()
     * Gets a task from the list.
     * @param taskId: The id of the task to get.
     * @return : If the task exists, an object containing its object and index number in the list.
     */
    todoList.getTask = function(taskId) {
        // Go through the task list
        for (var index = 0; index < todoList.taskList.length; index++) {

            // For the entry found, return the task object and the index location in the list
            if (todoList.taskList[index].id === taskId) {
                return {
                    "object": todoList.taskList[index],
                    "index": index
                };
            }
        }
    };
    
    /**
     * addTask()
     * Adds a task and puts it to the list.
     * @param newTask: The new task object.
     */
    todoList.addTask = function(newTask) {
        todoList.taskList.push(newTask);
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     */
    todoList.deleteTask = function(taskId) {
        var task = todoList.getTask(taskId);

        todoList.taskList.splice(task.index, 1);
    };

    /**
     * editTask()
     * Changes the task name.
     * @param taskId: The id of the task to change.
     * @param name: The new name to change task to.
     */
    todoList.editTask = function(taskId, name) {
        var task = todoList.getTask(taskId);

        todoList.taskList[task.index].text = name;
    };

    /**
     * changePriority()
     * Changes the task priority.
     * @param taskId: The id of the task to change.
     * @param priority: The new priority to change the task to.
     */
    todoList.changePriority = function(taskId, priority) {
        var task = todoList.getTask(taskId);

        todoList.taskList[task.index].priority = priority;

        if (task.object.completed === 1) {
            todoList.taskList[task.index].completed = 0;
        }
    };

    /**
     * markCompleted
     * Marks task completed.
     * @param taskId: The id of the task to mark.
     */
    todoList.markCompleted = function(taskId) {
        var task = todoList.getTask(taskId);

        todoList.taskList[task.index].completed = 1;
    };

    return todoList;
}

module.exports = todoListFactory;

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
"use strict";

/**
 * todoFactory()
 * Todo factory containing all operations.
 * @param taskApi: The API factory for todo-tasks.
 * @return todo: The todo object.
 */
function todoFactory(taskApi) {
    var todo = {};

    /**
     * getTaskList()
     * Gets the task list.
     * @return A promise of the GET operation.
     */
    todo.getTaskList = function() {
        return taskApi.Tasks.get().$promise;
    };

    /**
     * addTask()
     * Adds a task.
     * @param params: Parameters for the task ({ name, priority }).
     * @return : A promise of the resource.
     */
    todo.addTask = function(params) {
        params.id = 0;  // The id for adding tasks
        return taskApi.Task.save(params).$promise;
    };

    /**
     * deleteTask()
     * Deletes a task.
     * @param taskId: The id of the task to delete.
     * @return : A promise of the resource.
     */
    todo.deleteTask = function(taskId) {
        return taskApi.Task.delete({ id: taskId }).$promise;
    };

    /**
     * editTask()
     * Edits the task name.
     * @param taskId: The id of the task to edit.
     * @param name: The task name to change to.
     * @return : A promise of the resource.
     */
    todo.editTask = function(taskId, name) {
        return taskApi.Task.update({ id: taskId, text: name }).$promise;
    };

    /**
     * changePriority()
     * Changes the task priority.
     * @param taskId: The id of the task to change.
     * @param priority: The priority to change to for the task.
     * @return : A promise of the resource.
     */
    todo.changePriority = function(taskId, priority) {
        return taskApi.TaskPriority.update({ id: taskId, priority: priority }).$promise;
    };

    /**
     * markCompleted()
     * Marks task completed.
     * @param taskId: The id of the task to change.
     * @return : A promise of the resource.
     */
    todo.markCompleted = function(taskId) {
        return taskApi.TaskCompleted.update({ id: taskId }).$promise;
    };

    return todo;
}


// Exports
module.exports = todoFactory;

},{}]},{},[2]);
