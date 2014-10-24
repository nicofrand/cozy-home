// Generated by CoffeeScript 1.8.0
var Application, NotificationsHelper, StackApplication, TIME_BETWEEN_UPDATE_CHECKS, checkUpdate, checkUpdates, log;

NotificationsHelper = require('cozy-notifications-helper');

log = require('printit')({
  prefix: 'application updates'
});

Application = require('../models/application');

StackApplication = require('../models/stack_application');

TIME_BETWEEN_UPDATE_CHECKS = 1000 * 60 * 60 * 24;

checkUpdate = function(notifier, app) {
  log.info("" + app.name + " - checking for an update...");
  return app.checkForUpdate(function(err, setUpdate) {
    if (err != null) {
      log.error("" + app.name + " - Error while checking update.");
      return log.raw(err);
    } else if (setUpdate) {
      log.info("" + app.name + " - update required.");
      return notifier.createTemporary({
        text: "A new version of " + app.name + " is available!",
        resource: {
          app: 'home'
        }
      });
    } else {
      return log.info("" + app.name + " - no update required.");
    }
  });
};

checkUpdates = function() {
  var notifier;
  notifier = new NotificationsHelper('home');
  log.info('Checking if app updates are available...');
  return Application.all(function(err, apps) {
    var app, _i, _len;
    if (err) {
      log.error("Error when checking apps versions:");
      log.raw(err);
    } else {
      for (_i = 0, _len = apps.length; _i < _len; _i++) {
        app = apps[_i];
        checkUpdate(notifier, app);
      }
    }
    return StackApplication.all(function(err, apps) {
      var _j, _len1, _results;
      if (err) {
        log.error("Error when checking apps versions:");
        return log.raw(err);
      } else {
        _results = [];
        for (_j = 0, _len1 = apps.length; _j < _len1; _j++) {
          app = apps[_j];
          _results.push(checkUpdate(notifier, app));
        }
        return _results;
      }
    });
  });
};

module.exports = function() {
  checkUpdates();
  return setInterval(checkUpdates, TIME_BETWEEN_UPDATE_CHECKS);
};
