// Generated by CoffeeScript 1.8.0
var Manifest, StackApplication, americano;

americano = require('americano-cozy');

Manifest = require('../lib/manifest').Manifest;

module.exports = StackApplication = americano.getModel('StackApplication', {
  name: String,
  version: String,
  lastVersion: String,
  repository: Object
});

StackApplication.all = function(params, callback) {
  return StackApplication.request("all", params, callback);
};

StackApplication.prototype.checkForUpdate = function(callback) {
  var manifest, setFlag;
  setFlag = (function(_this) {
    return function(repoVersion) {
      _this.lastVersion = repoVersion;
      return _this.save(function(err) {
        if (err) {
          return callback(err);
        } else {
          return callback(null, true);
        }
      });
    };
  })(this);
  manifest = new Manifest();
  return manifest.download(this, (function(_this) {
    return function(err) {
      var repoVersion;
      if (err) {
        return callback(err);
      } else {
        repoVersion = manifest.getVersion();
        if (repoVersion == null) {
          return callback(null, false);
        } else if (_this.version == null) {
          return setFlag(repoVersion);
        } else if (_this.version !== repoVersion) {
          return setFlag(repoVersion);
        } else {
          return callback(null, false);
        }
      }
    };
  })(this));
};