/*global jQuery, APP, module, test, ok */

(function ($, Controller) {
    "use strict";
    module("Controller");

    test("show", function () {
        ok($("#objects").is(":empty"), "DOM is empty");
        Controller.show();
        ok($("#objects:has(li)"), "DOM is populated");
    });
}(jQuery, APP.Controller));
