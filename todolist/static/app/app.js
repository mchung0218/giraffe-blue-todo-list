"use strict";

// Requires
var httpConfig =        require("./app.config");

var mainComponent =     require("./todo/todo.component"),
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
var app = angular.module("todo", ["ngAnimate", "ngResource"]);

// Configurations
app.config(["$httpProvider", "$resourceProvider", httpConfig]);

// Filters
app.filter("priority", listFilter);

// Services/factories
app.factory("todoFact", ["taskApi", todoFact])
    .factory("listFact", listFact)
    .factory("taskApi", ["$resource", taskApiFact])
    .factory("filterFact", filterFact);

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
