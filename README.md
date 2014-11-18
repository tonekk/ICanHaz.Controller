ICanHaz.Controller
==================

[![License](http://img.shields.io/:license-mit-blue.svg)](http://tonekk.mit-license.org)

Create client-side controllers with [mustache](http://mustache.github.io/)-views.
Bind events with the easiest syntax available.

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

```

var MyViewController = ich.Controller.extend({
  init: function() {

    // Data for mustache template
    var templateData = { foo: 'bar' },
        self = this;

    // Constructor, render element here
    self.element.render('templateName', templateData, function() {
      // Executed when template has loaded
      self.afterInit();
    });
  },

  // Bind events with this readable, kick-ass syntax
  '.btn click': function() {
    // 'this' refers to MyViewController, although this is an event
    this.helper();
  },

  '.select change': function() {
  },

  helper: function() {
  },

  afterInit: function() {
  }

```

## Installation

Just load `ICanHaz.Controller.js` somewhere after its [bower dependencies](https://github.com/tonekk/ICanHaz.Controller/blob/master/bower.json).
Create your `controllers` in separate files and require them accordingly.

## Testing

Tests are written using `jasmine` and can be executed in the browser, by browsing `test/index.html`.
This project is too tiny for continuous integration imo.
