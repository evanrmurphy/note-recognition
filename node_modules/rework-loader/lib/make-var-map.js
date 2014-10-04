var fs = require('fs');

var rework = require('rework');
var reworkNpm = require('rework-npm');
var reworkVisit = require('rework-visit');

module.exports = function(filename) {
  var map = {};

  rework(fs.readFileSync(filename, 'utf8'))
    .use(reworkNpm())
    .use(function(ast) {
      reworkVisit(ast, function(rules) {
        rules.forEach(function(rule) {
          if (rule.type === 'declaration' && rule.property.indexOf('--') === 0)
            map[rule.property] = rule.value;
        });
      });
    });

  return map;
};
