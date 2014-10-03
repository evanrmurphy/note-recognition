var urlParse = require('url').parse;

var addImport = require('./../add-import');
var stripQuotes = require('./../strip-quotes');
var mark = require('./../mark');

module.exports = function(ast, reworkInstance) {
  ast.rules.forEach(function(rule) {
    if (!rule.declarations)
      return;

    rule.declarations.forEach(function(declaration) {
      var urlRe = /url\(([^)]+)\)/g;

      if (!declaration.value)
        return;

      declaration.value = declaration.value
        .replace(urlRe, function(_, url) {
          url = stripQuotes(url);
          addImport(reworkInstance, urlParse(url).pathname);
          return 'url("' + mark(url) + '")';
        });
    });
  });
};

module.exports.processJs = function(js) {
  return js.replace(mark.re, function(_, url) {
    var parsed = urlParse(url);
    var rest = (parsed.query || '') + (parsed.hash || '');

    return '/" + require(' + JSON.stringify(parsed.pathname) + ') + "' + rest;
  });
};
