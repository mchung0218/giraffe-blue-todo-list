/**
 * exitEditMode()
 * On blur of task edit box, exit edit mode.
 */
function exitEditMode() {
    return {
        restrict: "A",      // Attribute only
        link: function($scope, ele) {
            // Get the task name box
            var theSpan = ele.parent()[0].getElementsByClassName("todo-list__task-name--span")[0];

            ele.on("blur", function() {
                ele.addClass("hide");

                angular.element(theSpan).removeClass("hide");
            });
        }
    };
}

// Exports
module.exports = exitEditMode;
