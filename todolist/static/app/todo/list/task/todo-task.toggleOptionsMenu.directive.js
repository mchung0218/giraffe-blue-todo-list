"use strict";

/**
 * toggleOptionsMenu()
 * When options button is clicked, toggle options menu.
 */
function toggleOptionsMenu() {
    return {
        restrict: "A",      // Attribute only
        link: function($scope, ele) {

            ele.on("click", function() {
                ele.toggleClass("todo-list__task-btn-option--open");
                // Get all option boxes with "show" on it
                var openedOptionsMenus = document.getElementsByClassName("todo-list__task-btn-option--open");

                // Hide them
                Array.prototype.forEach.call(openedOptionsMenus, function(theMenuEle) {
                    angular.element(theMenuEle).removeClass("todo-list__task-btn-option--open");
                });
            });
        }
    };
}

// Exports
module.exports = toggleOptionsMenu;
