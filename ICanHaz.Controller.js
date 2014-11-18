(function($, ich) {
  ich.Controller = function(elementSelector) {

    var self = this;

    this.element = $(elementSelector);
  };

  ich.Controller.extend = function(obj) {

    // Constructor
    var extendedController = function(elementSelector) {

      var events = [],
          eventsRegistered = false,
          self = this;

      // Call parent constructor
      ViewController.prototype.constructor.call(this, elementSelector);

      // Add methods and register events
      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          if(key.indexOf(' ') != -1) {
            events[key] = obj[key];
          } else if(key !== 'init') {
            this[key] = obj[key];
          }
        }
      }

      var registerEvents = function() {
        for(var eventString in events) {

          var splitted = eventString.split(' '),
              selector = splitted[0],
              event = splitted[1];

          (function() {

            var handler = events[eventString];

            self.element.find(selector).on(event, function() {
              handler.call(self, this);
            });
          })();
        }

        eventsRegistered = true;
      };

      // Put html inside our element and bind events
      this.element.render = function(templateName, data, cb) {
        ich.loadTemplate(templateName, data, function(content) {
          self.element.html(content);
          registerEvents();

          if(cb && typeof(cb) === 'function') {
            cb();
          }
        });
      };

      // Execute init method
      if(obj['init']) {
        obj['init'].call(this);
        if(!eventsRegistered) {
          registerEvents();
        }
      }
    };

    // Inherit
    extendedController.prototype = Object.create(ViewController.prototype);
    extendedController.prototype.constructor = extendedController;

    return extendedController;
  };
})(window.jQuery, window.ich);
