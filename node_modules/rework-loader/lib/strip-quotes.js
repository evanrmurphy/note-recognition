module.exports = function(str) {
  return str.replace(/^['"]/, '').replace(/['"]$/, '');
};
