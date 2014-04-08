/*global APP */

/* @SubModule: Model
 * Model that provides an interface to the underlying
 * data array
 *
 * @param model object namespaced under APP module
 * @return public interface
 */
APP.Model = (function () {
    var model = {}, // Public interface to return
        data = [], // Model data is backed by an array
        search, // Private method
        verify, // Private method
        ModelException; // Exception object for error handling

    /* @method search
     * Performs a simple binary search to find the index
     * of an object
     *
     * @param [REQUIRED] ID of object to search for
     * @return Index of object, or -1 if DNE
     *
     * Assumes each object has a unique ID
     */
    search = function (id) {
        // Error handling
        if ((typeof id !== "number") || id < 0) {
            throw new ModelException(".search - Invalid id: " + id);
        }

        var minIndex = 0,
            maxIndex = data.length - 1,
            currentIndex,
            currentId;

        while (minIndex <= maxIndex) {
            // Find midpoint and round down
            currentIndex = Math.floor((minIndex + maxIndex) / 2);
            currentId = data[currentIndex].id;

            if (id < currentId) {
                // Change index to search lower subarray
                maxIndex = currentIndex - 1;
            } else if (id > currentId) {
                // Change index to search upper subarray
                minIndex = currentIndex + 1;
            } else {
                return currentIndex;
            }
        }
        return -1; // Invalid index indicates DNEd
    };

    /* @method verify
     * Verifies that the object exists and has the correct properties (id and color)
     *
     * @param [REQUIRED] Object to verify
     * @return Boolean of verification
     */
    verify = function (obj) {
        // Validates object
        if (obj &&
                obj.hasOwnProperty("id") &&
                obj.hasOwnProperty("color")
                // Add properties to manifest
                ) {
            // Validates color
            return (obj.color === "red" ||
                obj.color === "green" ||
                obj.color === "blue"
                // Validate more properties here
                );
        }

        return false;
    };

    /* @method add
     * Inserts a new object at the end of the array
     * 
     * @param [REQUIRED] Object to be inserted
     * @return Index the object is inserted at
     *
     * ATTN: Should sort by id on every push
     */
    model.add = function (obj) {
        // Error handling
        if (!this.verify(obj)) {
            throw new ModelException(".add - Invalid object: " + obj);
        }

        data.push(obj);
        return data.length - 1;
    };

    /* @method modify
     * Provides a structure for modifying various
     * object properties
     */
    model.modify = {};

    /* @method color
     * Updates an object's color to a new color
     *
     * @param [REQUIRED] ID property of object
     * @param [REQUIRED] Color property to be updated
     * @return modified object or undefined for invalid input
     */
    model.modify.color = function (id, color) {
        var index = search(id),
            object;

        // Error handling
        if (index === -1) { // ID not found
            throw new ModelException(".modify.color - Invalid id: " + id);
        }
        if (!(color === "red" || color === "green" || color === "blue")) { // Invalid color
            throw new ModelException(".modify.color - Invalid color: " + color);
        }

        object = data[index];
        object.color = color;
        return object;
    };

    /* @method length
     * Returns the length of the data array
     *
     * @param NONE
     */
    model.length = function () {
        return data.length;
    };

    /* @method at
     * Returns the obj at a given index
     *
     * @param [REQUIRED] Index to access object at
     * @return data[index] or undefined if DNE
     */
    model.at = function (index) {
        // Error handling 
        if (index < 0 || index >= data.length) { // Invalid range
            throw new ModelException(".at - Index out of range: " + index);
        }
        if (!(/^\d+$/).test(index)) { // Is not number
            throw new ModelException(".at - Index is not a number: " + index);
        }

        return data[index];
    };

    // Custom exception for APP.Model
    ModelException = function (message) {
        this.message = "APP.Model" + message;
    };
    ModelException.prototype.toString = function () {
        return this.message;
    };

    // ATTN: Begin test | COMMENT OUT IN PRODUCTION
    model.search = search; // Public method
    model.verify = verify; // Public method
    model.data = data; // Public var
    model.ModelException = ModelException;
    // End test | END COMMENT

    return model; // Public interface
}());
