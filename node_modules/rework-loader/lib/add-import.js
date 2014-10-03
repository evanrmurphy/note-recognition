module.exports = function(reworkInstance, url) {
  reworkInstance.imports = reworkInstance.imports || {};
  reworkInstance.imports[url] = true;
};

