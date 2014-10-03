var Promise = require('when/es6-shim/Promise.browserify-es6');
var rework = require('rework');
var imports = require('./lib/plugins/imports');
var urls = require('./lib/plugins/urls');
var stripLocalDefs = require('./lib/plugins/strip-local-defs');
var makeVarMap = require('./lib/make-var-map');

module.exports = function(content) {
  var callback = this.async();

  this.cacheable();

  var css = rework(content);
  var plugins = this.options.rework && this.options.rework.use || [];

  plugins.reduce(function(lastPromise, plugin) {
      return lastPromise.then(function() {
        var ret = plugin.call(this, css.obj.stylesheet, css);
        return ret;
      }.bind(this));
    }.bind(this), Promise.resolve())
    .then(function() {
      var deps = Object.keys(css.imports || {})
        .map(function(imprt) {
          return 'require(\'' + imprt + '\');';
        });

      var code = css.toString();

      var js = deps.concat([
          'module.exports = ' + JSON.stringify(code) + ';'
        ])
        .join('\n');

      plugins.forEach(function(plugin) {
        if (plugin.processJs)
          js = plugin.processJs(js);
      });

      callback(null, js);
    }, callback);
};

module.exports.plugins = {
  imports: imports,
  urls: urls,
  stripLocalDefs: stripLocalDefs
};

module.exports.makeVarMap = makeVarMap;
