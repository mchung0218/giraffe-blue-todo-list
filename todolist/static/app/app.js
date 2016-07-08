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
