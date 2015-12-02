'use strict';

// transform key-value pairs with dot separated keys to structure
// TODO: parse 'array[]' to actual array
module.exports = function (transform) {
  // implementation idea from
  // https://github.com/hapijs/hoek#transformobj-transform-options
  // https://github.com/hapijs/hoek/blob/v3.0.4/lib/index.js#L918-L955

  const result = {};
  const keys = Object.keys(transform);

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const path = key.split('.');

    let segment;
    let res = result;

    while (path.length > 1) {
      segment = path.shift();
      if (!res[segment]) {
        res[segment] = {};
      }
      res = res[segment];
    }
    segment = path.shift();
    res[segment] = transform[key];
  }

  return result;
};
