var APP = APP || {
};

APP.Model = {
    data: [], // Data model is backed by an array

    /* @function: add
     * Inserts a new object at the end of the array
     * 
     * @param: [REQUIRED] Object to be inserted
     * @return: Index the object is inserted at
     *
     * ATTN: Should sort by id
     */
    add: function (obj) {
        'use strict';
        if (!this.verify(obj)) {
            return;
        }

        this.data.push(obj);
        return this.data.length - 1;
    },

    /* @function: modify
     * Provides a structure for modifying various
     * object attributes
     */
    modify: {
        /* @function: color
         * Updates an object's color to a new color
         *
         * @param: [REQUIRED] ID attribute of object
         * @param: [REQUIRED] Color attribute to be updated
         */
        color: function (id, newColor) {
            'use strict';
            var index = APP.Model.search(id);
            if (index === -1 || !(newColor === "red" || newColor === "green" || newColor === "blue")) {
                return;
            }

            APP.Model.data[index].color = newColor;
        }
    },

    /* @function: length
     * Returns the length of the data array
     *
     * @param: NONE
     */
    length: function () {
        'use strict';
        return this.data.length;
    },

    /* @function: at
     * Returns the obj at a given index
     *
     * @param: [REQUIRED] Index to access object at
     * @return: data[index] or null if DNE
     */
    at: function (index) {
        'use strict';
        if (index < 0 || index > this.data.length - 1 || isNaN(index)) {
            return null;
        }

        return this.data[index];
    },

    /* @function: search
     * Performs a simple binary search to find the index
     * of an object
     *
     * @param: [REQUIRED] ID of object to search for
     * @return: Index of object, or -1 if DNE
     *
     * Assumes each object has a unique ID
     */
    search: function (id) {
        'use strict';
        var minIndex = 0,
            maxIndex = this.data.length - 1,
            currentIndex,
            currentId;

        while (minIndex <= maxIndex) {
            // Find midpoint and round down
            currentIndex = Math.floor((minIndex + maxIndex) / 2);
            currentId = this.data[currentIndex].id;

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
        return -1;
    },

    /* @function: verify
     * Verifies that the object exists and has the correct properties (id and color)
     *
     * @param: [REQUIRED] Object to verify
     * @return: Boolean of verification
     */
    verify: function (obj) {
        'use strict';
        // Validates object
        if (obj && obj.hasOwnProperty("id") && obj.hasOwnProperty("color")) {
            // Validates color
            return (obj.color === "red" || obj.color === "green" || obj.color === "blue");
        }

        return false;
    }
};