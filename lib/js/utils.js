/*global APP */

/* @Module: UTIL
 * Provides site-wide utilites for entire application
 *
 * @param NONE
 * @return public interface
 */
var UTIL = (function (app) {
    var util = {}, // Public interface to return
        exec; // 

    /* @method exec
     * Executes a controller action based on data-controller 
     * and data-action attributes in HTML. If action is null,
     * invokes "init" action

     * @param [REQUIRED] Controller that hosts @param[action]
     * @param [Optional] Action to be executed
     */
    exec = function (controller, action) {
        action = (!action) ? "init" : action; // If no action is passed in, call "init()"

        // If the controller exists and action is a function
        if (controller && app[controller] && typeof app[controller][action] === "function") {
            app[controller][action](); // Execute action
        }
    };

    /* @method init
     * Finds all elements with data-controller and data-action attributes
     * and for each element, executes controller-action method
     *
     * @param NONE
     */
    util.init = function () {
        /*jslint unparam: true */
        // Returns all elements with data-controller/data-action attributes
        $.each(document.querySelectorAll("[data-controller][data-action]"), function (i, element) {
            var controller = element.getAttribute("data-controller"),
                action = element.getAttribute("data-action");

            exec(controller);
            exec(controller, action);
        });
        /*jslint unparam: false */
    };

    // ATTN: Begin test | COMMENT OUT IN PRODUCTION
    util.exec = exec;
    // End test | END COMMENT

    return util; // Public interface
}(APP));

Number.prototype.isNumber = function (value) {
    return (/^\d+$/).test(value);
};
