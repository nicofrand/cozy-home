// Generated by CoffeeScript 1.9.1
var Notification, americano;

americano = require('americano-cozy');

module.exports = Notification = americano.getModel('Notification', {
  text: String,
  type: String,
  resource: {
    type: Object,
    "default": null
  },
  publishDate: {
    type: String,
    "default": Date.now
  },
  app: String,
  ref: String
});

Notification.all = function(callback) {
  return Notification.request("all", callback);
};
