/*global APP, module, asyncTest, start, strictEqual, ok */

(function (Service, verify) {
    "use strict";
    module("Service");

    /* @test: APP.Service.query.GET /objects
     * Test the GET HTTP request for valid # of elements and valid objects
     */
    asyncTest("query.GET /objects", function () {
        var url = "/objects";
        Service.query.GET(url).done(function (data, status) {
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
    });

    /* @test: APP.Service.query.GET /objects/:id
     * Test the GET HTTP request for valid object
     */
    asyncTest("query.GET /objects/:id", 2, function () {
        var url = "/objects/",
            objectId = 0; // Hard-coded in Mockjax

        url += objectId;
        Service.query.GET(url).done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            ok(verify(data), "Object verified");
            start();
        });
    });

    /* @test: APP.Service.query.POST /objects
     * Test the POST HTTP request for valid response
     */
    asyncTest("query.POST /objects", 1, function () {
        var url = "/objects";
        Service.query.POST(url).done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            start();
        });
    });

    /* @test: APP.Service.query.PUT /objects/:id
     * Test the PUT HTTP request for valid response
     */
    asyncTest("query.PUT /objects/:id", 1, function () {
        var url = "/objects/",
            objectId = 0; // Hard-coded in Mockjax

        url += objectId;
        Service.query.PUT(url).done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            start();
        });
    });

    /* @test: APP.Service.query.DELETE /objects/:id
     * Test the DELETE HTTP request for valid response
     */
    asyncTest("query.DELETE /objects/:id", 1, function () {
        var url = "/objects/",
            objectId = 0; // Hard-coded in Mockjax

        url += objectId;
        Service.query.DELETE(url).done(function (data, status) {
            strictEqual(status, "success", "Status: 200");
            start();
        });
    });
}(APP.Service, APP.Model.verify));
