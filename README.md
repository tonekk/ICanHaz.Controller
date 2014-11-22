ICanHaz.Controller
==================

[![License](http://img.shields.io/:license-mit-blue.svg)](http://tonekk.mit-license.org)

Create client-side controllers with [mustache](http://mustache.github.io/)-views.
Bind events with the easiest syntax available.
Can also be used without a mustache template, see below.

Based on [ICanHaz.js](http://icanhazjs.com/) / [ICanHaz.load](https://github.com/tonekk/ICanHaz.load).

## Usage

**NOTE:** This project uses [ICanHaz.load](https://github.com/tonekk/ICanHaz.load), so first be sure to set:

```javascript

// Global config
ich.templatePath('/assets/templates');
// optionally, set a special extension (.mustache is standard)
ich.templateExtension = 'tpl';

```

After having that set up, create a `ViewController` like this:

```javascript

var MyViewController = ich.Controller.extend({
  init: function() {

    // Data for mustache template
    var templateData = { foo: 'bar' };

    // This method fetches the template file, constructs the template
    // and registers the events below
    this.element.render('templateName', templateData, function() {
      // Executed when template and events are ready
      // place DOM-related code here
    });
  },

  // Bind events with this readable, kick-ass syntax
  '.btn click': function(el, e) {
    // 'this' refers to MyViewController, although this is an event
    // 'el' refers to DOMElement, 'e' to jQuery Event
    this.helper();
  },

  helper: function() {
    // SomeCode()
  }
});

```

### Without mustache template

You can also use `ICanHaz.Controller` to bind events on pre-rendered html.
The only difference is that you won't have to call `this.element.render()` and you **must** implement `afterInit` instead of `init`, so that events are bound correctly:

```javascript

var MyViewController = ich.Controller.extend({
  afterInit: function() {
    // Events are already bound when this function is executed
  },

  '.select change': function(el, e) {
    $(el).css('display', 'none');
  }
});

```


## Installation

Just load `ICanHaz.Controller.js` somewhere after its [bower dependencies](https://github.com/tonekk/ICanHaz.Controller/blob/master/bower.json).
Create your `controllers` in separate files and require them accordingly.

## Testing

Tests are written using `jasmine` and can be executed in the browser, by browsing `test/index.html`.
This project is too tiny for continuous integration imo.
