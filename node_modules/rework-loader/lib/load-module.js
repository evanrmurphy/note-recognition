var Promise = require('when').Promise;

module.exports = function(loaderContext, moduleName) {
  return new Promise(function(resolve, reject) {
    loaderContext.loadModule(moduleName, function(err, module) {
      if (err)
        reject(err);
      else
        resolve(module);
    });
  });
};
