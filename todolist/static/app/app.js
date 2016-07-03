"use strict";

// Requires
var httpConfig =        require("./app.config");

var mainComponent =     require("./components/todo.component");

var formComponent =     require("./components/form/todo-form.component");

var listComponent =     require("./components/list/todo-list.component"),
    taskComponent =     require("./components/list/task/todo-task.component"),
    optionsComponent =  require("./components/list/task/options/todo-options.component"),
    taskFact =          require("./components/list/task/todo-task.factory");

var footerComponent =   require("./components/footer/todo-footer.component"),
    counterComponent =  require("./components/footer/counter/todo-counter.component"),
    filterComponent =   require("./components/footer/filter/todo-filter.component");


// Instance of the app
var app = angular.module("todo", ["ngAnimate"]);

// Configurations
app.config(["$httpProvider", httpConfig]);

// Services/factories
app.factory("taskFact", taskFact);

// Components
app.component("todo", mainComponent)
    .component("todoForm", formComponent)
    .component("todoList", listComponent)
    .component("todoTask", taskComponent)
    .component("todoOptions", optionsComponent)
    .component("todoFooter", footerComponent)
    .component("todoCounter", counterComponent)
    .component("todoFilter", filterComponent);
