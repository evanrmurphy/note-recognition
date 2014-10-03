var addImport = require('./../add-import');
var stripQuotes = require('./../strip-quotes');

module.exports = function(ast, reworkInstance) {
  var keepRules = [];

  ast.rules.forEach(function(rule) {
    if (rule.type === 'import')
      addImport(reworkInstance, stripQuotes(rule.import));
    else
      keepRules.push(rule);
  });

  ast.rules = keepRules;
};
