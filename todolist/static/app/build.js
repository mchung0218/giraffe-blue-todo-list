(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var formComponent = require("./components/form/todo-form.component");

var listComponent = require("./components/list/todo-list.component"),
    taskComponent = require("./components/list/todo-task.component"),
    optionsComponent = require("./components/list/todo-options.component");

var footerComponent = require("./components/footer/todo-footer.component"),
    counterComponent = require("./components/footer/todo-counter.component"),
    filterComponent = require("./components/footer/todo-filter.component");

var app = angular.module("todo", ["ngAnimate"]);

app.component("todoForm", formComponent)
    .component("todoList", listComponent)
    .component("todoTask", taskComponent)
    .component("todoOptions", optionsComponent)
    .component("todoFooter", footerComponent)
    .component("todoCounter", counterComponent)
    .component("todoFilter", filterComponent);

},{"./components/footer/todo-counter.component":2,"./components/footer/todo-filter.component":3,"./components/footer/todo-footer.component":4,"./components/form/todo-form.component":5,"./components/list/todo-list.component":6,"./components/list/todo-options.component":7,"./components/list/todo-task.component":8}],2:[function(require,module,exports){
"use strict";

function CounterCtrl() {

}


module.exports = {
    controller: CounterCtrl,
    templateUrl: "/static/app/components/footer/todo-counter.html"
};

},{}],3:[function(require,module,exports){
"use strict";

function FilterCtrl() {

}


module.exports = {
    controller: FilterCtrl,
    templateUrl: "/static/app/components/footer/todo-filter.html"
};

},{}],4:[function(require,module,exports){
"use strict";

function FooterCtrl() {

}


module.exports = {
    controller: FooterCtrl,
    templateUrl: "/static/app/components/footer/todo-footer.html"
};

},{}],5:[function(require,module,exports){
"use strict";

function FormCtrl() {

}


module.exports = {
    controller: FormCtrl,
    templateUrl: "/static/app/components/form/todo-form.html"
};

},{}],6:[function(require,module,exports){
"use strict";

function ListCtrl() {

}

module.exports = {
    controller: ListCtrl,
    templateUrl: "/static/app/components/list/todo-list.html"
};

},{}],7:[function(require,module,exports){
"use strict";

function OptionsCtrl() {

}


module.exports = {
    controller: OptionsCtrl,
    templateUrl: "/static/app/components/list/todo-options.html"

};

},{}],8:[function(require,module,exports){
"use strict";

function TaskCtrl() {

}


module.exports = {
    controller: TaskCtrl,
    templateUrl: "/static/app/components/list/todo-task.html"

};

},{}]},{},[1]);
