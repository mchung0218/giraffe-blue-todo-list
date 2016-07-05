/**
 * enterEditMode()
 * On click of task name box (as a <span>), enter edit mode.
 */
function enterEditMode() {
    return {
        restrict: "A",      // Attribute only
        link: function($scope, ele) {
            // Get the input box
            var theInput = ele.parent()[0].getElementsByClassName("todo-list__task-name--input")[0];

            ele.on("click", function() {
                ele.addClass("hide");

                angular.element(theInput).removeClass("hide");
                theInput.focus();
            });
        }
    };
}

// Exports
module.exports = enterEditMode;
