/*global APP, Handlebars */

/* @SubModule: Controller
 * Sub-module that handles all the business logic between
 * the model and the view, in other words, the brain.
 *
 * @param: controller object namespaced under APP module
 * @return: public interface
 */
APP.Controller = (function (service, Handlebars) {
    var controller = {}, // Public interface to return
        $objectsElement = $("objects"), // Cache DOM query
        appendObjects; // Private method

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

    /* @function: show
     * Injects data from GET /objects request into view
     *
     * @param: NONE
     */
    controller.show = function () {
        var objects = service.query.GET("/objects");
        appendObjects(objects, $objectsElement);
    };

    return controller; // Public interface
}(APP.Service, Handlebars));
