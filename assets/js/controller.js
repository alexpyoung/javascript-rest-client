/*global jQuery, Handlebars, APP */

/* @SubModule: Controller
 * Sub-module that handles all the business logic between
 * the model and the view, in other words, the brain.
 *
 * @param controller object namespaced under APP module
 * @return public interface
 */
APP.Controller = (function ($, Handlebars, service) {
    var controller = {}, // Public interface to return
        $objectsElement = $("#objects"), // Cache DOM query
        indexObjects, // Private method
        deleteObject, // Private method
        objectDeleteHandler, // Private method
        objectEditHandler, // Private method
        ControllerException; // Exception object for error handling

    /* ATTN: COMMENT OUT IN PRODUCTION
     * Counter increments any time a Controller.method
     * executes. Used in tests
     */
    controller.counter = 0;

    /* @method indexObjects
     * Uses Handlebars client-side templating to render
     * a JSON array of objects and append it to the DOM
     *
     * @param [REQUIRED] JSON array of objects
     * @param [REQUIRED] DOM element to append HTML
     */
    indexObjects = function (objects, $domElement) {
        // Error handling
        if (!Array.isArray(objects)) {
            throw new ControllerException(".indexObjects - Expected array");
        }
        if (!($domElement instanceof $)) {
            throw new ControllerException(".indexObjects - Expected jQuery object");
        }

        $domElement.empty();

        var objectTemplate = Handlebars.compile($("#object-template").html()),
            htmlWithData;

        /*jslint unparam: true */
        $.each(objects, function (i, object) {
            htmlWithData = objectTemplate(object);
            $domElement.append(htmlWithData);
        });
        /*jslint unparam: false */
    };

    /* @method deleteObject
     * Removes DOM node containing the object identified by given id
     *
     * @param [REQUIRED] ID of object to be removed
     * @param [REQUIRED] DOM element containing objects
     */
    deleteObject = function (id, $domElement) {
    // Error handling
        if (!(/^\d+$/).test(id) || id < 0) {
            throw new ControllerException(".deleteObject - Invalid ID: " + id);
        }
        if (!($domElement instanceof $)) {
            throw new ControllerException(".deleteObject - Expected jQuery object");
        }

        var dataIdAttribute = "li[data-id=\"" + id + "\"]";
        $domElement.find(dataIdAttribute).remove();
    };

    /* @method objectDeleteHandler
     * Event handler for deleting object
     */
    objectDeleteHandler = function () {
        var id = $(this).attr("data-id");

        controller.delete(id);
    };

    /* @method objectEditHandler
     * Event handler for editing object
     */
    objectEditHandler = function () {
        var id = $(this).attr("data-id");

        // controller.edit(id);
    };

    /* @method init
     * Constructor for controller, invoked with every controller-action
     * attribute pair in HTML, and by data-controller attribute 
     * with no action
     *
     * @param NONE
     */
    controller.init = function () {
        controller.counter++; // ATTN: COMMENT OUT IN PRODUCTION

        $objectsElement.on('click', '.object li.delete[data-id]', objectDeleteHandler);
        $objectsElement.on('click', '.object li.edit[data-id]', objectEditHandler);
    };

    /* @method index
     * Injects data from GET /objects request into view
     *
     * @param NONE
     */
    controller.index = function () {
        var promise = service.query.GET("/objects");

        promise.done(function (data) {
            var objects = data.objects;
            indexObjects(objects, $objectsElement);
        });
        /*jslint unparam: true */
        promise.fail(function (jqXHR, status, error) {
            throw new ControllerException(".index - GET /objects failed: " + status + ", " + error);
        });
        /*jslint unparam: false */

        controller.counter++; // ATTN: COMMENT OUT IN PRODUCTION
    };

    /* @method delete
     * Removes object from DOM and requests DELETE /objects/:id
     *
     * @param [REQUIRED] ID of object to be deleted
     */
    controller.delete = function (id) {
        // Error handling 
        if (!(/^\d+$/).test(id)) { // Is not number
            throw new ControllerException(".delete - ID is not a number: " + id);
        }
        if (id < 0) { // Invalid range
            throw new ControllerException(".at - ID out of range: " + id);
        }

        var promise = service.query.DELETE("/objects/" + id);
        console.log(promise);
        promise.done(function () {
            deleteObject(id, $objectsElement);
        });
        /*jslint unparam: true */
        promise.fail(function (jqXHR, status, error) {
            throw new ControllerException(".delete - DELETE /objects/" + id + " failed: " + status + ", " + error);
        });
        /*jslint unparam: false */
    };

    // Custom exception for APP.Controller
    ControllerException = function (message) {
        this.message = "APP.Controller" + message;
    };
    ControllerException.prototype.toString = function () {
        return this.message;
    };

    // ATTN: Begin test | COMMENT OUT IN PRODUCTION
    controller.indexObjects = indexObjects;
    controller.deleteObject = deleteObject;
    controller.ControllerException = ControllerException;
    // End test | END COMMENT

    return controller; // Public interface
}(jQuery, Handlebars, APP.Service));
