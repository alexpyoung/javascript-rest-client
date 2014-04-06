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
        appendObjects; // Private method

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
        var objectTemplate = Handlebars.compile($("#object-template").html()),
            htmlWithData;

        $.each(objects, function (i, object) {
            htmlWithData = objectTemplate(object);
            $domElement.append(htmlWithData);
        });
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
        service.query.GET("/objects").done(function (data) {
            var objects = data.objects;
            appendObjects(objects, $objectsElement);
        });

        controller.counter++; // ATTN: COMMENT OUT IN PRODUCTION
    };

    return controller; // Public interface
}(jQuery, Handlebars, APP.Service));
