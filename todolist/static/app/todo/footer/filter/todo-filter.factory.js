"use strict";

/**
 * filterFactory()
 * The factory for filtering option.
 */
function filterFactory() {
    var filter = {
        option: "all"
    };

    // Get current option
    filter.getCurrentOption = function(option) {
        return filter.option;
    };

    // Change filter options
    filter.changeOption = function(option) {
        filter.option = option;
    };

    return filter;
}

module.exports = filterFactory;
