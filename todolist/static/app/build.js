(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * httpConfig()
 * Configures the $http service.
 * @param $httpProvider: The $http provider.
 */
function httpConfig($httpProvider) {

    console.log($httpProvider.defaults);
}

module.exports = httpConfig;

},{}],2:[function(require,module,exports){
"use strict";

// Requires
var httpConfig = require("./app.config");

var formComponent = require("./components/form/todo-form.component");

var listComponent = require("./components/list/todo-list.component"),
    taskComponent = require("./components/list/task/todo-task.component"),
    optionsComponent = require("./components/list/task/options/todo-options.component");

var footerComponent = require("./components/footer/todo-footer.component"),
    counterComponent = require("./components/footer/counter/todo-counter.component"),
    filterComponent = require("./components/footer/filter/todo-filter.component");





// Instance of the app
var app = angular.module("todo", ["ngAnimate"]);

// Configurations
app.config(["$httpProvider", httpConfig]);

// Components
app.component("todoForm", formComponent)
    .component("todoList", listComponent)
    .component("todoTask", taskComponent)
    .component("todoOptions", optionsComponent)
    .component("todoFooter", footerComponent)
    .component("todoCounter", counterComponent)
    .component("todoFilter", filterComponent);

},{"./app.config":1,"./components/footer/counter/todo-counter.component":3,"./components/footer/filter/todo-filter.component":4,"./components/footer/todo-footer.component":5,"./components/form/todo-form.component":6,"./components/list/task/options/todo-options.component":7,"./components/list/task/todo-task.component":8,"./components/list/todo-list.component":9}],3:[function(require,module,exports){
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

function FormCtrl() {

}


module.exports = {
    controller: FormCtrl,
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

function TaskCtrl() {

}


module.exports = {
    controller: TaskCtrl,
    templateUrl: "/static/app/components/list/task/todo-task.html"

};

},{}],9:[function(require,module,exports){
"use strict";

function ListCtrl() {

}

module.exports = {
    controller: ListCtrl,
    templateUrl: "/static/app/components/list/todo-list.html"
};

},{}]},{},[2]);
