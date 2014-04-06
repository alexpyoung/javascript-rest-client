/*global APP, module, test, ok */

(function (app) {
    "use strict";

    module("APP");

    /* @test: APP.Service
     * Verifies Service module is a sub-module of APP module
     */
    test("APP.Service", 1, function () {
        ok(app.Service, "APP.Service exists");
    });

    /* @test: APP.Model
     * Verifies Model module is a sub-module of APP module
     */
    test("APP.Model", 1, function () {
        ok(app.Model, "APP.Model exists");
    });

    /* @test: APP.Controller
     * Verifies Controller module is a sub-module of APP module
     */
    test("APP.Controller", 1, function () {
        ok(app.Controller, "APP.Controller exists");
    });
}(APP));
