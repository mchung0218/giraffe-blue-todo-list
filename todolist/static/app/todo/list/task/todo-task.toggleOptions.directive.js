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
                // If the same button whose menu is opened already is clicked, close it.
                if (ele.hasClass("todo-list__task-btn-option--open")) {
                    ele.removeClass("todo-list__task-btn-option--open");
                }

                // Otherwise...
                else {
                    // Get all option buttons with "open" in it.
                    var openedOptionsMenus = document.getElementsByClassName("todo-list__task-btn-option--open");

                    // Remove the class (hide the options menu)
                    Array.prototype.forEach.call(openedOptionsMenus, function(theMenuEle) {
                        angular.element(theMenuEle).removeClass("todo-list__task-btn-option--open");
                    });

                    // Show the current task's option menu
                    ele.addClass("todo-list__task-btn-option--open");
                }
            });
        }
    };
}

// Exports
module.exports = toggleOptionsMenu;
