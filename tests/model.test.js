/*global APP, module, test, ok, strictEqual, throws */

(function (Model) {
    "use strict";
    module("Model", {
        /* Adds an object to the underlying array so that accessor
         * functions have something to work with
         */
        setup: function () {
            Model.data.push({
                "id": 0,
                "color": "red"
            });
        },
        // Empties the array after Model tests are complete
        teardown: function () {
            Model.data.length = 0;
        }
    });

    /* @test: APP.Model.length
     * Ensures Model.length returns the length of the underlying array
     */
    test("length", 1, function () {
        strictEqual(Model.length(), 1, "Model.length is 1");
    });

    /* @test: APP.Model.at(index)
     * Validates the index (must be a number and in the range of the array indices)
     * and checks that the object returned is a valid object
     */
    test("at", 4, function () {
        var obj = Model.at(0);
        throws(function () { Model.at(-1); },
            Model.ModelException,
            "Model.at(-1) throws error");
        throws(function () { Model.at(Model.length()); },
            Model.ModelException,
            "Model.at(length) throws error");
        throws(function () { Model.at("foo"); },
            Model.ModelException,
            "Model.at(String) throws error");

        ok(Model.verify(obj), "Returned object is verified");
    });

    /* @test: APP.Model.verify(obj)
     * Ensures that the object is defined, has Id and Color properties and
     * that the color is either "red", "green", or "blue"
     */
    test("verify", 5, function () {
        var noId = {
                "color": "red"
            },
            noColor = {
                "id": 0
            },
            invalidColor = {
                "id": 0,
                "color": "yellow"
            };
        ok(Model.verify(Model.at(0)), "Good object verifies");
        ok(!Model.verify(undefined), "Undefined object does not verify");
        ok(!Model.verify(noId), "Missing ID property does not verify");
        ok(!Model.verify(noColor), "Missing color property does not verify");
        ok(!Model.verify(invalidColor), "Invalid color property does not verify");
    });

    /* @test: APP.Model.add(obj)
     * Ensures that adding an object is successful and returns the proper
     * index of the object in the underlying array
     */
    test("add", 5, function () {
        var validObj = {
                "id": 1,
                "color": "green"
            },
            invalidObj = {
                "color": "purple"
            },
            index;

        throws(function () { Model.add(invalidObj); },
            Model.ModelException,
            "Adding invalid object to Model throws error");
        strictEqual(Model.length(), 1, "Model.length initially 1");
        index = Model.add(validObj);
        strictEqual(index, 1, "Model.add returned the proper index");
        strictEqual(Model.at(index), validObj, "Object in model is equal to object added");
        strictEqual(Model.length(), 2, "Model.length finally 2");
    });

    /* @test: APP.Model.search(id)
     * Ensures that searching for an invalid Id returns a non-existent index (-1)
     * and that searching for a valid Id returns the proper index
     */
    test("search", 2, function () {
        throws(function () { Model.search(-1); },
            Model.ModelException,
            "Model.search of non-existent ID returns -1");
        strictEqual(Model.search(0), 0, "Model.search(id) returns the proper index");
    });

    /* @test: APP.Model.modify.color(id)
     * Ensures that an object's, with a valid Id, color can be properly modified 
     * with a valid color (red, green, or blue)
     */
    test("modify.color", 4, function () {
        var obj = Model.at(0);

        throws(function () { Model.modify.color(-1, "green"); },
            Model.ModelException,
            "Modifying an object with invalid Id throws error");
        throws(function () { Model.modify.color(0, "purple"); },
            Model.ModelException,
            "Modifying an object with invalid color throws error");
        strictEqual(obj.color, "red", "Model.at(0).color initially \"red\"");
        Model.modify.color(obj.id, "green");
        strictEqual(obj.color, "green", "Model.at(0) color finally \"green\"");
    });
}(APP.Model));
