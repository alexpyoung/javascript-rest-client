/*global jQuery, APP, module, asyncTest, ok, start */

(function ($, Controller) {
    "use strict";
    module("Controller", {
        teardown: function () {
            $("#objects").empty();
        }
    });

    asyncTest("show", function () {
        ok($("#objects").is(":empty"), "DOM is empty");
        Controller.show();
        setTimeout(function () {
            ok(!$("#objects").is(":empty"), "DOM is populated");
            start();
        }, 1000);
    });
}(jQuery, APP.Controller));
