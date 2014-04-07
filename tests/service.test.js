/*global APP, module, test, asyncTest, start, throws, strictEqual, ok */
/*jslint unparam: true */

(function (Service, verify) {
    "use strict";
    module("Service");

    /* @test: APP.Service.validateURL
     * Checks all types except string to throw exception
     */
    test("validateURL", 5, function () {
        throws(function () { Service.validateURL(undefined); },
            Service.ServiceException,
            "Validating undefined throws exception");
        throws(function () { Service.validateURL(null); },
            Service.ServiceException,
            "Validating null throws exception");
        throws(function () { Service.validateURL(true); },
            Service.ServiceException,
            "Validating boolean throws exception");
        throws(function () { Service.validateURL(Number); },
            Service.ServiceException,
            "Validating number throws exception");
        throws(function () { Service.validateURL(Array); },
            Service.ServiceException,
            "Validating array throws exception");
    });

    /* @test: APP.Service.query.GET /objects
     * Test the GET HTTP request for valid # of elements and valid objects
     */
    asyncTest("query.GET /objects", function () {
        var url = "/objects",
            promise;
        promise = Service.query.GET(url);
        promise.done(function (data, status) {
            var i,
                length = data.objects.length,
                obj;
            strictEqual(status, "success", "Status: 200");
            strictEqual(length, data.size, "GET request returns proper # of elements");
            for (i = 0; i < length; i++) {
                obj = data.objects[i];
                ok(verify(obj), "Object verified");
            }
            start();
        });
        promise.fail(function (jqXHR, status, error) {
            ok(false, "query.GET failed - Status: " + status + ", Error: " + error);
        });
    });

    /* @test: APP.Service.query.GET /objects/:id
     * Test the GET HTTP request for valid object
     */
    asyncTest("query.GET /objects/:id", 2, function () {
        var url = "/objects/",
            objectId = 0, // Hard-coded in Mockjax
            promise;

        url += objectId;
        promise = Service.query.GET(url);
        promise.done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            ok(verify(data), "Object verified");
            start();
        });
        promise.fail(function (jqXHR, status, error) {
            ok(false, "query.GET failed - Status: " + status + ", Error: " + error);
        });
    });

    /* @test: APP.Service.query.POST /objects
     * Test the POST HTTP request for valid response
     */
    asyncTest("query.POST /objects", 1, function () {
        var url = "/objects",
            promise;
        promise = Service.query.POST(url);
        promise.done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            start();
        });
        promise.fail(function (jqXHR, status, error) {
            ok(false, "query.POST failed - Status: " + status + ", Error: " + error);
        });
    });

    /* @test: APP.Service.query.PUT /objects/:id
     * Test the PUT HTTP request for valid response
     */
    asyncTest("query.PUT /objects/:id", 1, function () {
        var url = "/objects/",
            objectId = 0, // Hard-coded in Mockjax
            promise;

        url += objectId;
        promise = Service.query.PUT(url);
        promise.done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            start();
        });
        promise.fail(function (jqXHR, status, error) {
            ok(false, "query.PUT failed - Status: " + status + ", Error: " + error);
        });
    });

    /* @test: APP.Service.query.DELETE /objects/:id
     * Test the DELETE HTTP request for valid response
     */
    asyncTest("query.DELETE /objects/:id", 1, function () {
        var url = "/objects/",
            objectId = 0, // Hard-coded in Mockjax
            promise;

        url += objectId;
        promise = Service.query.DELETE(url);
        promise.done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            start();
        });
        promise.fail(function (jqXHR, status, error) {
            ok(false, "query.DELETE failed - Status: " + status + ", Error: " + error);
        });
    });
}(APP.Service, APP.Model.verify));
