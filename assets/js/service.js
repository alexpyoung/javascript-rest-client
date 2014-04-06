/*global APP */

/* @SubModule: Service
 * Controller sub-module relies on various services that
 * this API can provide, such as RESTful AJAX requests
 *
 * @param: service object namespaced under APP module
 * @return: public interface
 */
APP.Service = (function (service) {
    var GET, /////
        PUT, ///// Private REST methods
        POST, ////
        DELETE; //

    // Returns a GET HTTP request to url
    GET = function (url) {
        return $.ajax({
            "type": "GET",
            "url": url,
            "dataType": "json"
        });
    };

    // Returns a PUT HTTP request to url with data
    PUT = function (url, data) {
        return $.ajax({
            "type": "PUT",
            "url": url,
            "dataType": "json",
            "data": data
        });
    };

    // Returns a POST HTTP request to url with data
    POST = function (url, data) {
        return $.ajax({
            "type": "POST",
            "url": url,
            "dataType": "json",
            "data": data
        });
    };

    // Returns a DELETE HTTP request to url with data
    DELETE = function (url, data) {
        return $.ajax({
            "type": "DELETE",
            "url": url,
            "dataType": "json",
            "data": data
        });
    };

    /* @Service: query
     * A public sub-module interface for RESTful calls
     * to a url
     */
    service.query = {
        "GET": GET,
        "PUT": PUT,
        "POST": POST,
        "DELETE": DELETE
    };

    return service;
}(APP.Service || {}));