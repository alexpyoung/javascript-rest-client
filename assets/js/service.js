/*global jQuery, APP */

/* @SubModule: Service
 * Controller sub-module relies on various services that
 * this API can provide, such as RESTful AJAX requests
 *
 * @param: service object namespaced under APP module
 * @return: public interface
 */
APP.Service = (function ($) {
    var service = {}, // Public interface to return
        GET, //////
        PUT, ////// Private REST methods
        POST, /////
        DELETE, ///
        validateURL, // For error handling
        ServiceException; // Exception object for error handling

    /* @function: validateURL
     * Checks that the URL is a string, otherwise throws
     * and error.
     * ATTN: In production, should use Regex to validate URL as well
     *
     * @param: [REQUIRED] - Url
     */
    validateURL = function (url) {
        if (typeof url !== "string") {
            throw new ServiceException(".query - Invalid URL: " + url);
        }
    };

    // Returns a GET HTTP request to url
    GET = function (url) {
        validateURL(url);
        return $.ajax({
            "type": "GET",
            "url": url,
            "dataType": "json"
        });
    };

    // Returns a PUT HTTP request to url with data
    PUT = function (url, data) {
        validateURL(url);
        return $.ajax({
            "type": "PUT",
            "url": url,
            "dataType": "json",
            "data": data
        });
    };

    // Returns a POST HTTP request to url with data
    POST = function (url, data) {
        validateURL(url);
        return $.ajax({
            "type": "POST",
            "url": url,
            "dataType": "json",
            "data": data
        });
    };

    // Returns a DELETE HTTP request to url with data
    DELETE = function (url, data) {
        validateURL(url);
        return $.ajax({
            "type": "DELETE",
            "url": url,
            "dataType": "json",
            "data": data
        });
    };

    // Custom exception for APP.Service
    ServiceException = function (message) {
        this.message = "APP.Service" + message;
    };
    ServiceException.prototype.toString = function () {
        return this.message;
    };

    // ATTN: Begin test | COMMENT OUT IN PRODUCTION
    service.validateURL = validateURL;
    service.ServiceException = ServiceException;
    // End test | END COMMENT

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
}(jQuery));
