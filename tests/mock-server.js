/*global APP */

var objects = [
    {
        "id": 0,
        "color": "red"
    },
    {
        "id": 1,
        "color": "red"
    },
    {
        "id": 2,
        "color": "green"
    },
    {
        "id": 3,
        "color": "green"
    },
    {
        "id": 4,
        "color": "blue"
    },
    {
        "id": 5,
        "color": "blue"
    }
],
    objectsRegex = /^\/objects$/,
    objectWithIdRegex = /^\/objects\/([\d]+)$/;

// Mock response for GET /objects
$.mockjax({
    "url": objectsRegex,
    "type": "GET",
    "status": 200,
    "responseText": {
        "objects": objects,
        "size": 6
    }
});

// Mock response for GET /objects/:id
$.mockjax({
    "url": objectWithIdRegex,
    "urlParams": ["objectID"],
    "type": "GET",
    "status": 200,
    "response": function (settings) {
        var objectID = settings.urlParams.objectID;
        this.responseText = objects[objectID];
    }
});

// Mock response for POST /objects
$.mockjax({
    "url": objectsRegex,
    "type": "POST",
    "status": 200,
    "responseText": {}
});

// Mock response for PUT /objects/:id
$.mockjax({
    "url": objectWithIdRegex,
    "urlParams": ["objectID"],
    "type": "PUT",
    "status": 200,
    "response": {}
});

// Mock response for DELETE /objects/:id
$.mockjax({
    "url": objectWithIdRegex,
    "urlParams": ["objectID"],
    "type": "DELETE",
    "status": 200,
    "response": function (settings) {
        var objectID = settings.urlParams.objectID,
            i,
            length;
        for (i = 0, length = objects.length; i < length; i++) {
            if (objects[i].id === objectID) {
                objects.splice(i, 1);
                break;
            }
        }
        APP.Controller.index();
    }
});
