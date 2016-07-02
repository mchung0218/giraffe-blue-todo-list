"use strict";

var formComponent = require("./components/form/todo-form.component");

var listComponent = require("./components/list/todo-list.component"),
    taskComponent = require("./components/list/task/todo-task.component"),
    optionsComponent = require("./components/list/task/options/todo-options.component");

var footerComponent = require("./components/footer/todo-footer.component"),
    counterComponent = require("./components/footer/counter/todo-counter.component"),
    filterComponent = require("./components/footer/filter/todo-filter.component");

var app = angular.module("todo", ["ngAnimate"]);

app.component("todoForm", formComponent)
    .component("todoList", listComponent)
    .component("todoTask", taskComponent)
    .component("todoOptions", optionsComponent)
    .component("todoFooter", footerComponent)
    .component("todoCounter", counterComponent)
    .component("todoFilter", filterComponent);
