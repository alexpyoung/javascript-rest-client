/*global jQuery, Handlebars, APP */

/* @SubModule: Controller
 * Sub-module that handles all the business logic between
 * the model and the view, in other words, the brain.
 *
 * @param: controller object namespaced under APP module
 * @return: public interface
 */
APP.Controller = (function ($, Handlebars, service) {
    var controller = {}, // Public interface to return
        $objectsElement = $("#objects"), // Cache DOM query
        appendObjects, // Private method
        ControllerException; // Exception object for error handling

    /* ATTN: COMMENT OUT IN PRODUCTION
     * Counter increments any time a Controller.method
     * executes. Used in tests
     */
    controller.counter = 0;

    /* @function: appendObjects
     * Uses Handlebars client-side templating to render
     * a JSON array of objects and append it to the DOM
     *
     * @param: [REQUIRED] JSON array of objects
     * @param: [REQUIRED] DOM element to append HTML
     */
    appendObjects = function (objects, $domElement) {
        // Error handling
        if (!Array.isArray(objects)) {
            throw new ControllerException(".appendObjects - Expected array");
        }
        if (!($domElement instanceof $)) {
            throw new ControllerException(".appendObjects - Expected jQuery object");
        }

        var objectTemplate = Handlebars.compile($("#object-template").html()),
            htmlWithData;

        /*jslint unparam: true */
        $.each(objects, function (i, object) {
            htmlWithData = objectTemplate(object);
            $domElement.append(htmlWithData);
        });
        /*jslint unparam: false */
    };

    /* @function: init
     * Constructor for controller, invoked with every controller-action
     * attribute pair in HTML, and by data-controller attribute 
     * with no action
     *
     * @param: NONE
     */
    controller.init = function () {
        controller.counter++; // ATTN: COMMENT OUT IN PRODUCTION
    };

    /* @function: show
     * Injects data from GET /objects request into view
     *
     * @param: NONE
     */
    controller.show = function () {
        var promise = service.query.GET("/objects");

        promise.done(function (data) {
            var objects = data.objects;
            appendObjects(objects, $objectsElement);
        });
        /*jslint unparam: true */
        promise.fail(function (jqXHR, status, error) {
            throw new ControllerException(".show - GET /objects failed: " + status + ", " + error);
        });
        /*jslint unparam: false */

        controller.counter++; // ATTN: COMMENT OUT IN PRODUCTION
    };

    // Custom exception for APP.Controller
    ControllerException = function (message) {
        this.message = "APP.Controller" + message;
    };
    ControllerException.prototype.toString = function () {
        return this.message;
    };

    // ATTN: Begin test | COMMENT OUT IN PRODUCTION
    controller.ControllerException = ControllerException;
    // End test | END COMMENT

    return controller; // Public interface
}(jQuery, Handlebars, APP.Service));
