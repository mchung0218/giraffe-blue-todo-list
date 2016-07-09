/**
 * exitEditMode()
 * On blur/enter of task edit box, exit edit mode.
 */
function exitEditMode() {
    return {
        restrict: "A",      // Attribute only
        link: function($scope, ele) {
            // Get the task name box
            var theSpan = ele.parent()[0].getElementsByClassName("todo-list__task-name--span")[0];

            // Called when blurred or enter key is pressed
            var blurredFunc = function() {
                ele.addClass("hide");

                angular.element(theSpan).removeClass("hide");
            };

            // On blur
            ele.on("blur", blurredFunc);

            // On keypress
            ele.on("keypress", function(e) {
                var code = e.keyCode || e.which;

                if (e.keyCode === 13) {
                    blurredFunc();
                }
            });
        }
    };
}

// Exports
module.exports = exitEditMode;
