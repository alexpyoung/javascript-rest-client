JavaScript REST Client
================================
Introduction
---
### Prompt
Using languages, frameworks and tools of your choice, implement the following:
* A web service that exposes a REST interface, and allows the client to retrieve a collection of objects.
    - Each object has the following attributes: id, and 'color'. Color can be one of red, green or blue.
* A client UI that:
    - Retrieves the collection of objects from the web service
    - Displays objects while grouping them based on the associated color
    - Allows the user to reassign any object to a different color

### Description
I used the above prompt as the basis of the design and implementation of this project, however, I did not let its constraints restrict the project's extensibility. This project implements the prompt's desired features, but the architecture is designed to be scalable and expand beyond the scope of basic objects with id and color properties. Implementing a RESTful client would have been fairly straight forward in any of today's modern front-end frameworks such as [AngularJS](http://angularjs.org), [Backbone.js](http://backbonejs.org), or [Ember.js](http://emberjs.com), but I wanted showcase my understanding of JavaScript fundamentals and basic design patterns, namely the module pattern. The module pattern has many benefits and I appreciate it because because a well designed modular application breaks down into small, testable, easy-to-manage, sub-modules. Using this pattern, I designed a simple MVC architecture that interacts with a RESTful mock server. Additionally, I tried to design the framework to be as data-agnostic as possible. To learn more about my design process, see [Design](
https://github.com/alexyoung1992/javascript-rest-client#design).

### Dependencies
* jQuery
    - [QUnit](http://qunitjs.com/)
    - [Mockjax](https://github.com/appendto/jquery-mockjax)
* Bootstrap
* SASS
* [Handlebars](https://github.com/wycats/handlebars.js/)

### Assumptions
* Each object is guaranteed to have unique ID

### Workflow
I use Sublime Text 2 as my text-editor. I like Sublime primarily because it is incredibly customizable, with hot-keys, user settings, etc. and it has amazing feature support, namely through it's community-developed packages. Some packages I use for web developement are:
* [JavaScript](https://github.com/jprichardson/sublime-js-snippets) and [jQuery Snippets](https://github.com/aaronpowell/sublime-jquery-snippets) - Auto completion for many default methods
* [JSLint](https://github.com/darrenderidder/Sublime-JSLint‎) - Validate JavaScript instantaneously on File > Save
* [Markdown Editing](https://sublime.wbond.net/packages/MarkdownEditing) and [Preview](https://github.com/revolunet/sublimetext-markdown-preview‎) - Let's me preview Markdown (GitHub flavored as well) in my browser
* [SASS Build](https://github.com/jaumefontal/SASS-Build-SublimeText2‎) - Easy CSS generation from SCSS files. *I now use `sass --watch` to live compile SASS, SASS Build retains [unreconcilable errors](https://github.com/jaumefontal/SASS-Build-SublimeText2/issues/20)*
* [W3CValidators](https://sublime.wbond.net/packages/W3CValidators) - Validate HTML on command

### Directory Structure
I modeled the project directory structure loosely off of a Ruby on Rails project structure. **/assets** contains all JavaScript, CSS, and image files related to the application itself. **/lib** contains all the assets that exist independently of the application, e.g. utilities. **/vendor** contains third party libraries installed and maintained externally. **/tests** contains all files relating to the testing suite, including QUnit, Mockjax, and unit tests.

Design
---
### Model
*Coming soon*

### Controller
*Coming soon*

### Utilties
I attempted to implement the Garber-Irish design methodology. You can read more about it [here](http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution), but in essence, it's DOM based routing that relies on `data-*` attributes in HTML markup, which aligns well with MVC design patterns. Once the DOM has loaded, we find all DOM nodes that have both `data-controller` and `data-action` attributes and execute that Controller sub-module's method named by the action. In this simplified project, there is only one controller, but in larger scale projects, this methodology allows for executable JavaScript for every controller-action pair - very powerful. Following Garber and Irish, if no action is present while a controller is, an `init` method is invoked from that controller.

### Mock-Server
*Coming soon*

### OOCSS
*Coming soon*

Test
---
### Unit Testing
I used the QUnit testing framework to unit test all of my modules and their methods. I used this particular framework because it's very easy to test DOM manipulation, great for UI, and at the same time it is a robust testing suite that has everything and I need and is very well documented. Each module has a unit test encapsulated in a closure, and I tried to make the tests as atomic and independent of each other as much as possible. This project was also my first attempt at TDD, but in reality, I ended up tweaking some of my tests after developing functionality because I realized my tests were not as robust and thorough as I originally designed them.

### Mock XHR Responses
Perhaps one of the most important test components of this project was simulating XHR responses. This project being a RESTful client, I needed to mock responses from a server without interacting with a live server. Trying to mock responses for the first time, I used Mockjax a) it was one of the few libraries out there with the sort of functionality I was looking for (client-side mocks that would return JSON responses from a RESTful HTTP request) and b) the documentation was thorough and easy enough to understand that I could pick it up fairly quickly. Under [Example Server Responses](https://github.com/alexyoung1992/javascript-rest-client#), I document the mock interactions I expect from the sever.

### Example Server Responses
All responses and data should issue and send JSON

GET /objects *issues the following:*
```json
{
    "objects": [
        {
            "id": 0,
            "color": "red"
        },
        {
            "id": 1,
            "color": "green"
        },
        {
            "id": 2,
            "color": "blue"
        }
    ],
    "size": 3
}
```
GET /objects/:id *issues the following:*
```json
{
    "id": 0,
    "color": "red"
}
```
POST /objects/:id *should send the following:*
```json
{
    "id": 3,
    "color": "red"
}
```
PUT /objects/:id *should send the following:*
```json
{
    "id": 0,
    "color": "blue"
}
```
DELETE /objects/:id *should send the following:*
```json
{
    "id": 0,
    "color": "blue"
}
```

Documentation
---
Formal documentation will be generated using [smartcomments](http://smartcomments.github.io/) and [YUIDoc](http://yui.github.io/yuidoc/).

*Coming soon*