/*global jQuery, APP, module, asyncTest, ok, start */

(function ($, Controller) {
    "use strict";
    module("Controller", {
        teardown: function () {
            $("#objects").empty();
        }
    });

    asyncTest("index", function () {
        ok($("#objects").is(":empty"), "DOM is empty");
        Controller.index();
        setTimeout(function () {
            ok(!$("#objects").is(":empty"), "DOM is populated");
            start();
        }, 1000);
    });
}(jQuery, APP.Controller));
