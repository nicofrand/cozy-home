// Generated by CoffeeScript 1.9.3
var AppManager, StackApplication, fs, log, request, sendError, slugify, spawn;

request = require("request-json");

fs = require('fs');

slugify = require('cozy-slug');

AppManager = require('../lib/paas').AppManager;

spawn = require('child_process').spawn;

log = require('printit')({
  prefix: "applications"
});

StackApplication = require('../models/stack_application');

sendError = function(res, err, code) {
  if (code == null) {
    code = 500;
  }
  if (err == null) {
    err = {
      stack: null,
      message: "Server error occured"
    };
  }
  console.log("Sending error to client:");
  console.log(err.stack);
  return res.send(code, {
    error: true,
    success: false,
    message: err.message,
    stack: err.stack
  });
};

module.exports = {
  get: function(req, res, next) {
    return StackApplication.all(function(err, apps) {
      if (err) {
        return next(err);
      } else {
        return res.send({
          rows: apps
        });
      }
    });
  },
  update: function(req, res, next) {
    var manager;
    manager = new AppManager();
    return manager.updateStack(function(err, result) {
      if (err != null) {
        log.error(err);
        return sendError(res, err);
      }
    });
  },
  reboot: function(req, res, next) {
    var manager;
    manager = new AppManager();
    return manager.restartController(function(err, result) {
      if (err != null) {
        log.error(err);
        return sendError(res, err);
      }
    });
  }
};
