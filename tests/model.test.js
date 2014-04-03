/*global APP, module, test, ok, strictEqual */

module("Model", {
    /* Adds an object to the underlying array so that accessor
     * functions have something to work with
     */
    setup: function () {
        APP.Model.data.push({
            "id": 0,
            "color": "red"
        });
    },
    // Empties the array after Model tests are complete
    teardown: function () {
        APP.Model.data.length = 0;
    }
});

/* @test: Model.length
 * Ensures Model.length returns the length of the underlying array
 */
test("length", 1, function () {
    strictEqual(APP.Model.length(), 1, "Model.length is 1");
});

/* @test: Model.at(index)
 * Validates the index (must be a number and in the range of the array indices)
 * and checks that the object returned is a valid object
 */
test("at", 4, function () {
    var obj = APP.Model.at(0);
    strictEqual(APP.Model.at(-1), null, "Model.at(-1) returns null");
    strictEqual(APP.Model.at(APP.Model.length()), null, "Model.length returns null");
    strictEqual(APP.Model.at("foo"), null, "Model.at(NaN) returns null");
    ok(APP.Model.verify(obj), "Returned object is verified");
});

/* @test: Model.verify(obj)
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
    ok(APP.Model.verify(APP.Model.at(0)), "Good object verifies");
    ok(!APP.Model.verify(undefined), "Undefined object does not verify");
    ok(!APP.Model.verify(noId), "Missing ID property does not verify");
    ok(!APP.Model.verify(noColor), "Missing color property does not verify");
    ok(!APP.Model.verify(invalidColor), "Invalid color property does not verify");
});

/* @test: Model.add(obj)
 * Ensures that adding an object is successful and returns the proper
 * index of the object in the underlying array
 */
test("add", 4, function () {
    var obj = {
        "id": 1,
        "color": "green"
    },
        index = APP.Model.add(obj);

    strictEqual(APP.Model.length(), 1, "Model.length initially 1");
    strictEqual(index, 1, "Model.add returned the proper index");
    strictEqual(APP.Model.at(index), obj, "Object in model is equal to object added");
    strictEqual(APP.Model.length(), 2, "Model.length finally 2");
});

/* @test: Model.search(id)
 * Ensures that searching for an invalid Id returns a non-existent index (-1)
 * and that searching for a valid Id returns the proper index
 */
test("search", 2, function () {
    strictEqual(APP.Model.search(-1), -1, "Model.search of non-existent ID returns -1");
    strictEqual(APP.Model.search(0), 0, "Model.search(id) returns the proper index");
});

/* @test: Model.modify.color(id)
 * Ensures that an object's, with a valid Id, color can be properly modified 
 * with a valid color (red, green, or blue)
 */
test("modify.color", 3, function () {
    var obj = APP.Model.at(0);

    strictEqual(APP.Model.modify.color(-1, "green"), undefined, "Modifying an object with invalid Id fails");
    strictEqual(obj.color, "red", "Model.at(0).color initially \"red\"");
    APP.Model.modify.color(obj.id, "green");
    strictEqual(obj.color, "green", "Model.at(0) color finally \"green\"");
});