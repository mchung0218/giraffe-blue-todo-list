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
var httpConfig =        require("./app.config"),
    routesConfig =      require("./app.routes");

// Login components
var loginComponent =    require("./login/login.component"),
    userFact =         require("./login/user/user.factory"),
    userApiFact =      require("./login/user/user.api.factory");

// Todo components
var todoComponent =     require("./todo/todo.component"),
    todoFact =          require("./todo/todo.factory"),
    todoRefreshPage =   require("./todo/todo.refreshPage.directive");

var formComponent =     require("./todo/form/todo-form.component");

var listComponent =     require("./todo/list/todo-list.component"),
    listFact =          require("./todo/list/todo-list.factory"),
    listFilter =        require("./todo/list/todo-list.filter"),
    taskComponent =     require("./todo/list/task/todo-task.component"),
    taskApiFact =       require("./todo/list/task/todo-task.api.factory"),
    taskEnterEditMode = require("./todo/list/task/todo-task.enterEditMode.directive.js"),
    taskExitEditMode =  require("./todo/list/task/todo-task.exitEditMode.directive.js");

var footerComponent =   require("./todo/footer/todo-footer.component"),
    counterComponent =  require("./todo/footer/counter/todo-counter.component"),
    filterComponent =   require("./todo/footer/filter/todo-filter.component"),
    filterFact =        require("./todo/footer/filter/todo-filter.factory");


// App module
var app = angular.module("todo", ["ui.router", "ngAnimate", "ngResource"]);

// Configurations
app.config(["$httpProvider", "$resourceProvider", httpConfig])
    .config(["$stateProvider", "$urlRouterProvider", routesConfig]);

// Filters
app.filter("priority", listFilter);

// Services/factories
app.factory("userFact", ["userApi", userFact])
    .factory("userApi", ["$resource", userApiFact])
    .factory("todoFact", ["taskApi", todoFact])
    .factory("listFact", listFact)
    .factory("taskApi", ["$resource", taskApiFact])
    .factory("filterFact", filterFact);

// Components
app.component("login", loginComponent)
    .component("todo", todoComponent)
    .component("todoForm", formComponent)
    .component("todoList", listComponent)
    .component("todoTask", taskComponent)
    .component("todoFooter", footerComponent)
    .component("todoCounter", counterComponent)
    .component("todoFilter", filterComponent);

// Directives
app.directive("refreshPage", ["userFact", "$window", todoRefreshPage])
    .directive("taskEnterEditMode", taskEnterEditMode)
    .directive("taskExitEditMode", taskExitEditMode);

},{"./app.config":1,"./app.routes":3,"./login/login.component":4,"./login/user/user.api.factory":5,"./login/user/user.factory":6,"./todo/footer/counter/todo-counter.component":7,"./todo/footer/filter/todo-filter.component":8,"./todo/footer/filter/todo-filter.factory":9,"./todo/footer/todo-footer.component":10,"./todo/form/todo-form.component":11,"./todo/list/task/todo-task.api.factory":12,"./todo/list/task/todo-task.component":13,"./todo/list/task/todo-task.enterEditMode.directive.js":14,"./todo/list/task/todo-task.exitEditMode.directive.js":15,"./todo/list/todo-list.component":16,"./todo/list/todo-list.factory":17,"./todo/list/todo-list.filter":18,"./todo/todo.component":19,"./todo/todo.factory":20,"./todo/todo.refreshPage.directive":21}],3:[function(require,module,exports){
"use strict";

/**
 * routesConfig()
 * Configuration for routes.
 */
function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
        
    $stateProvider
        .state("login", {
            url: "/",
            template: "<login></login>",
            resolve: {
                checkLoggedIn: ["$q", "$state", "userFact", function($q, $state, user) {
                    var deferred = $q.defer();
                    
                    // Check if the user is logged in
                    user.checkLoggedIn().then(function(res) {
                        // Update the username
                        user.update({
                            username: res.username
                        });

                        // If they are, redirect to list
                        if (res.login === 'true') {
                            deferred.resolve();
                            $state.go("todo");
                        }
                        
                        // Otherwise, stay
                        else {
                            deferred.resolve();
                        }
                    }, function(res) {
                        deferred.resolve();
                    });

                    return deferred.promise;
                }]
            }
        })
        .state("todo", {
            template: "<todo></todo>",
        });
}

module.exports = routesConfig;

},{}],4:[function(require,module,exports){
"use strict";

/**
 * LoginCtrl()
 * Login controller.
 * @param user: The user factory.
 */
function LoginCtrl(user, $state) {
    var vm = this;

    // No error by default
    vm.error = "";

    /**
     * registerUser()
     * Registers a user.
     */
    vm.registerUser = function() {
        // Only register if both fields are filled
        if (vm.form.password && vm.form.email) {
            var formData = {
                email: vm.form.email,
                password: vm.form.password,
            };

            user.register(formData).then(function(res) {
                // If register is successful, attempt to log in user.
                vm.loginUser(formData);

            }, function(res) {
                vm.error = "badRegisterEmail";
            });
        }

        // Otherwise, show error
        else {
            vm.error = "badRegisterMissing";
        }
    };

    /**
     * loginUser()
     * Logins the user.
     */
    vm.loginUser = function() {
        var formData = {
            email: vm.form.email,
            password: vm.form.password,
        };

        user.login(formData).then(function(res) {
            user.update({
                username: formData.email
            });

            // If the user is authenticated, then move to list
            if (res.login === 'true') {
                $state.go("todo");
            }

            // Otherwise, show an error
            else {
                vm.error = "badLogin";
            }
        }, function(res) {
            vm.error = "badLogin";
        });
    };
}


module.exports = {
    controller: ["userFact", "$state", LoginCtrl],
    templateUrl: "/static/app/login/login.html"
};

},{}],5:[function(require,module,exports){
"use strict";

/**
 * userApi()
 * User API resources.
 */
function userApi($resource) {
    return {
        "User": $resource("/user/"),

        "UserLoggedIn": $resource("/user/loggedin", {}, {
            check: {
                "method": "POST"
            }
        }),

        "UserCreate": $resource("/user/create", {}),

        "UserLogin": $resource("/user/auth", {}, {
            login: {
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
        }),

        "UserLogout": $resource("/user/logout", {}, {
            logout: {
                "method": "POST"
            }
        })
    };
}


module.exports = userApi;

},{}],6:[function(require,module,exports){
"use strict";

/**
 * userFactory()
 * A factory for user control.
 * @param userApi: The user API.
 * @return user: The user object.
 */
function userFactory(userApi) {
    var user = {
        username: ""
    };

    /**
     * register()
     * Registers a user.
     * @param userParams: Params to create the user ({ email, password })
     * @return : A promise of the resource.
     */
    user.register = function(userParams) {
        return userApi.UserCreate.save(userParams).$promise;
    };

    /**
     * login()
     * Logins a user.
     * @param userParams: Params to log in the user ({ email, password })
     * @return : A promise of the resource.
     */
    user.login = function(userParams) {
        return userApi.UserLogin.login(userParams).$promise;
    };

    /**
     * logout()
     * Logs out a user.
     * @return : A promise of the resource.
     */
    user.logout = function() {
        return userApi.UserLogout.logout().$promise;
    };

    /**
     * checkLoggedIn()
     * Checks if a user is logged in or not.
     * @return : A promise of the resource.
     */
    user.checkLoggedIn = function() {
        return userApi.UserLoggedIn.check().$promise;
    };

    /**
     * update()
     * Updates the user object.
     * @param userParams: Parameters to update.
     */
    user.update = function(userParams) {
        for (var userKey in userParams) {
            user[userKey] = userParams[userKey];
        }
    };

    return user;
}


module.exports = userFactory;

},{}],7:[function(require,module,exports){
"use strict";

/**
 * CounterCtrl()
 * The controller for active tasks counter.
 * @param todoList: The todo-list factory.
 */
function CounterCtrl(todoList) {
    var vm = this;

    vm.activeTaskCount = function() {
        var incompleteTasks = todoList.taskList.filter(function(obj) {
            return !obj.completed;
        });

        return incompleteTasks.length || 0;
    };
}


// Exports
module.exports = {
    controller: ["listFact", CounterCtrl],
    templateUrl: "/static/app/todo/footer/counter/todo-counter.html"
};

},{}],8:[function(require,module,exports){
"use strict";

/**
 * FilterCtrl()
 * The controller for the filter component.
 * @param todoFilter: The todo-filter factory.
 */
function FilterCtrl(todoFilter) {
    var vm = this;

    // Default menu is closed
    vm.menuOpen = false;

     // Current filter used
    vm.currentFilter = todoFilter.getCurrentOption;

    // Change filter
    vm.changeFilter = function(option) {
        todoFilter.changeOption(option);
    };

    // Toggle menu
    vm.toggleFilterMenu = function() {
        vm.menuOpen = !vm.menuOpen;
    };
}

// Exports
module.exports = {
    controller: ["filterFact", FilterCtrl],
    templateUrl: "/static/app/todo/footer/filter/todo-filter.html"
};

},{}],9:[function(require,module,exports){
"use strict";

/**
 * filterFactory()
 * The factory for filtering option.
 */
function filterFactory() {
    var filter = {
        option: "all"
    };

    // Get current option
    filter.getCurrentOption = function(option) {
        return filter.option;
    };

    // Change filter options
    filter.changeOption = function(option) {
        filter.option = option;
    };

    return filter;
}

module.exports = filterFactory;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

    // Keep track of errors
    vm.error = {
        permissionEdit: false,
        failEdit: false,
        permissionDelete: false,
        failDelete: false,
        changePriority: false,
        markCompleted: false
    };

    /**
     * resetErrors()
     * Reset errors.
     */
    vm.resetErrors = function() {
        for (var error in vm.error) {
            vm.error[error] = false;
        }
    };

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
        vm.resetErrors();

        todo.deleteTask(taskId).then(function(res) {
            if (res.error === "true") {
                if (res.errorMessage === "Permission Denied") {
                    vm.error.permissionDelete = true;
                }

                else {
                    vm.error.failDelete = true;
                }
            }

            // If successful, update the list view.
            else {
                todoList.deleteTask(taskId);
            }
        }, function(res) {
            vm.error.failDelete = true;
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
            vm.resetErrors();

            todo.editTask(taskId, name).then(function(res) {
                if (res.error === "true") {
                    // If error, return it back to the way it was.
                    vm.task.text = vm.prevName;

                    if (res.errorMessage === "Permission Denied") {
                        vm.error.permissionEdit = true;
                    }

                    else {
                        vm.error.failEdit = true;
                    }
                }
                
                // If successful, update the list view.
                else {
                    todoList.editTask(taskId, name);
                }
            }, function(res) {
                // If name changing fails, return it back to the way it was.
                vm.task.text = vm.prevName;
                
                vm.error.failEdit = true;
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
        vm.resetErrors();

        todo.changePriority(taskId, priority).then(function(res) {
            if (res.error === "true") {
                vm.error.changingPriority = true;
            }

            // If successful, update the list view.
            else {
                todoList.changePriority(taskId, priority);
            }

        }, function(res) {
            vm.error.changingPriority = true;
        });
    };

    /**
     * markCompleted()
     * Mark task completed.
     * @param taskId: The task id number.
     */
    vm.markCompleted = function(taskId) {
        vm.resetErrors();

        todo.markCompleted(taskId).then(function(res) {
            if (res.error === "true") {
                vm.error.markCompleted = true;
            }
            
            // If successful, update the list view.
            else {
                todoList.markCompleted(taskId);
            }
            
        }, function(res) {
            vm.error.markCompleted = true;
        });
    };
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", TaskCtrl],
    templateUrl: "/static/app/todo/list/task/todo-task.html",
    bindings: {     
        // These are HTML attributes passed as parameters to the controller
        "task": "="     // The Task object itself
    }
};

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";

/**
 * ListCtrl()
 * Controller for list.
 * @param todo: The todo factory.
 * @param todoList: The todo-list factory.
 * @param todoFilter: The todo-filter factory.
 */
function ListCtrl(todo, todoList, todoFilter) {
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

    // Get the filter option
    vm.listFilter = function() {
        return todoFilter.option;
    };

    // Initial execution
    vm.getTaskList();
}

// Exports
module.exports = {
    controller: ["todoFact", "listFact", "filterFact", ListCtrl],
    templateUrl: "/static/app/todo/list/todo-list.html"
};

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";

/**
 * todoListFilter()
 * Filter operations for todo-list.
 */
function todoListFilter() {
    // Filter by priority
    function filterPriority(priority) {
        return this.filter(function(taskObj) {
            return taskObj.priority === priority;
        });
    }

    // Filter by active tasks
    function filterActiveTasks() {
        return this.filter(function(taskObj) {
            return taskObj.priority !== "completed";
        });
    }

    return function(taskList, option) {
        if (option === "all") { 
            return taskList;
        }

        else if (option === "active") {
            return filterActiveTasks.call(taskList);
        }

        else {
            return filterPriority.call(taskList, option);
        }
    };
}

module.exports = todoListFilter;

},{}],19:[function(require,module,exports){
"use strict";

/**
 * TodoCtrl()
 * The controller for the entire todo container.
 * @param user: The user factory.
 */
function TodoCtrl(user, $state) {
    var vm = this;

    vm.username = user.username;

    /**
     * logoutUser()
     * Logs out the user.
     */
    vm.logoutUser = function() {
        user.logout().then(function(res) {
            // Once successful logout, go back to login view
            $state.go("login");
        }, function(res) {
            alert("Failed to log out for some reason.");
        });
    };
}

// Export the component (invoked in app.js)
module.exports = {
    controller: ["userFact", "$state", TodoCtrl],
    templateUrl: "/static/app/todo/todo.html"
};

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
"use strict";

/**
 * refreshPage()
 * When user is changed while view remains, force refresh the page.
 * @param: user: User factory.
 */
function refreshPage(user, $window) {
    return {
        restrict: "A",
        link: function($scope, ele) {
            ele.on("click", function() {
                // Using checkLoggedIn, find the current logged in user
                user.checkLoggedIn().then(function(res) {
                    // If the current logged in user is different than the one initially set, refresh
                    if (user.username !== res.username) {
                        $window.location.reload();
                    }
                });
            });
        }
    };
}

module.exports = refreshPage;

},{}]},{},[2]);
