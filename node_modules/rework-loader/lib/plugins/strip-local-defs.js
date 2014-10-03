var reworkVisit = require('rework-visit');

module.exports = function(map) {
  return function(ast) {
    reworkVisit(ast, function(declarations) {
      var removeIndices = {};

      declarations.forEach(function(declaration, i) {
        if (map[declaration.property])
          removeIndices[i] = true;
      });

      for (var i = declarations.length - 1; i >= 0; i--)
        if (removeIndices[i])
          declarations.splice(i, 1);
    });
  };
};
