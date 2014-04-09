/*global jQuery, APP, module, test, asyncTest, throws, ok, start */

(function ($, Controller) {
    "use strict";

    var $objects = $("#objects");

    module("Controller", {
        teardown: function () {
            $("#objects").empty();
        }
    });


    asyncTest("index", function () {
        ok($objects.is(":empty"), "DOM is empty");
        try {
            Controller.index();
        } catch (exception) {
            console.log("Error in Controller.index test: " + exception);
        }

        setTimeout(function () {
            ok(!$objects.is(":empty"), "DOM is populated");
            start();
        }, 1000);
    });

    asyncTest("delete", function () {
        $objects.append("<li data-id=\"0\"></li>");

        throws(function () { Controller.delete(-1); },
            Controller.ControllerException,
            "Deleting an object with invalid index throws error");

        var id = 0; // Testing DELETE /objects/0
            // liElement = $objects.has("li[data-id=\"" + id + "\"]"); // Actually an array of elements matching jQuery selector

        try {
            Controller.delete(id);
        } catch (exception) {
            console.log("Error in Controller.delete test: " + exception);
        }

        setTimeout(function () {
            ok($objects.is(":empty"), "<li data-id=\"" + id + "\"> removed");
            start();
        }, 1000);
    });
}(jQuery, APP.Controller));
