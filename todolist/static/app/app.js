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
    todoFact =          require("./todo/todo.factory");

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
app.directive("taskEnterEditMode", taskEnterEditMode)
    .directive("taskExitEditMode", taskExitEditMode);
