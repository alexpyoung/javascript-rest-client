/*global UTIL, APP, module, test, strictEqual */

(function (util, controller) {
    "use strict";

    module("UTIL", {
        teardown: function () {
            controller.counter = 0;
        }
    });

    /* @test: UTIL.exec
     * Tests that controller.init is invoked for exec() with no action
     */
    test("UTIL.exec", function () {
        var counter = controller.counter;
        util.exec("Controller");
        strictEqual(controller.counter, counter + 1, "Controller.init invoked");
    });

    /* @test: UTIL.init
     * Tests that each controller-action attribute pair in the DOM
     * executes the init and action methods for that controller
     */
    test("UTIL.init", function () {
        var counter = controller.counter,
            numActions = document.querySelectorAll("[data-controller][data-action]").length;
        UTIL.init();
        // Test for init and action for each controller-action pair
        strictEqual(controller.counter, counter + 2 * numActions, numActions + "Controller.action(s) invoked");
    });
}(UTIL, APP.Controller));
