// Mock response for GET /objects
$.mockjax({
    "url": "/objects",
    "type": "GET",
    "status": 200,
    "responseText": {
        "objects": [
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
        "size": 6
    }
});

// Mock response for GET /objects/:id
$.mockjax({
    "url": "/objects/0",
    "type": "GET",
    "status": 200,
    "responseText": {
        "id": 0,
        "color": "red"
    }
});

// Mock response for POST /objects
$.mockjax({
    "url": "/objects",
    "type": "POST",
    "status": 200,
    "responseText": {}
});

// Mock response for PUT /objects/:id
$.mockjax({
    "url": "/objects/0",
    "type": "PUT",
    "status": 200,
    "responseText": {}
});

// Mock response for DELETE /objects/:id
$.mockjax({
    "url": "/objects/0",
    "type": "DELETE",
    "status": 200,
    "responseText": {}
});
