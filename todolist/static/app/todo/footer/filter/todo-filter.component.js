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

    // On initial call, set to all
    vm.changeFilter("all");
}

// Exports
module.exports = {
    controller: ["filterFact", FilterCtrl],
    templateUrl: "/static/app/todo/footer/filter/todo-filter.html"
};
