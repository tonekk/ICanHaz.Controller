(function($, ich) {

  /*
   * ICanHaz.Controller.js
   *
   * Usage:
   * - https://github.com/tonekk/ICanHaz.Controller
   *
   * by Finn-Lennart Heemeyer, License: MIT
   */

  ich.Controller = function(elementSelector) {

    var self = this;

    this.element = $(elementSelector);
  };

  ich.Controller.extend = function(obj) {

    // Constructor
    var extendedController = function(elementSelector) {

      var events = {},
          eventsRegistered = false,
          self = this;

      // Call parent constructor
      ich.Controller.prototype.constructor.call(this, elementSelector);

      // Add methods and register events
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key.indexOf(' ') != -1) {
            events[key] = obj[key];
          } else if (key !== 'init') {
            this[key] = obj[key];
          }
        }
      }

      var registerEvents = function() {

        if (!eventsRegistered) {

          for (var eventString in events) {

            var splitted = eventString.split(' '),
                selector = splitted[0],
                event = splitted[1];

            (function() {

              var handler = events[eventString];

              self.element.find(selector).on(event, function(e) {
                handler.call(self, this, e);
              });
            })();
          }

          eventsRegistered = true;
        }
      };

      // Put html inside our element and bind events
      this.element.render = function(templateName, data, cb) {
        ich.loadTemplate(templateName, data, function(content) {
          self.element.html(content);
          registerEvents();

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
      };

      // Execute init method
      // init method is expected to call 'element.render()'
      // to register events
      if (obj['init'] && typeof(obj['init']) === 'function') {
        obj['init'].call(this);
      }

      // Execute afterInit method
      if (obj['afterInit'] && typeof(obj['afterInit']) === 'function') {
        // Register events before afterInit
        registerEvents();
        obj['afterInit'].call(this);
      }
    };

    // Inherit
    extendedController.prototype = Object.create(ich.Controller.prototype);
    extendedController.prototype.constructor = extendedController;

    return extendedController;
  };
})(window.jQuery, window.ich);
