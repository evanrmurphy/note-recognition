var TOKEN = '%URL%';

module.exports = function(url) {
  return TOKEN + url + TOKEN;
};

module.exports.token = TOKEN;
module.exports.re = new RegExp(TOKEN + '(.*?)' + TOKEN, 'g');
