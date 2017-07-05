const Stream = require('stream');
const set = require('lodash.set');
const ParseProp = require('./lib/parse');

module.exports = (inputStream, opts, callback) => {
  if (typeof callback !== 'function') {
    throw new Error('callback should be a function');
  }
  if (!(inputStream instanceof Stream.Readable) || !opts) {
    return callback(new Error('invalid parameter'));
  }

  ParseProp(inputStream, opts, (err, props) => {
    // TODO: check err, prop when `ParseProp()` will return them
    // transform key-value pairs with dot separated keys to structure
    const result = {};
    for (var key in props) {
      set(result, key, props[key]);
    }
    callback(err, result);
  });
};
