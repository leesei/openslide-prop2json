'use strict';

const Stream = require('stream');
const ParseProp = require('./lib/parse');
const Transform = require('./lib/transform');

module.exports = (inputStream, opts, callback) => {
  if (typeof callback !== 'function') {
    throw new Error('callback should be a function');
  }
  if (!(inputStream instanceof Stream.Readable) ||
    !opts) {
    return callback(new Error('invalid parameter'));
  }

  ParseProp(inputStream, opts, (err, prop) => {
    // TODO: check err, prop when `ParseProp()` will return them
    callback(err, Transform(prop));
  });
};
