'use strict';

const Split = require('split');
const SmartConvert = require('./convert');

// parse inputStream to key-value pairs in this format
//   key: 'value'\n
//
// keys are dot separated fields
// value may contain newline character
module.exports = function (inputStream, opts, done) {
  let prop = {};
  let key, value;

  inputStream
    .pipe(Split(/([^:]+): '([^']+)'\r?\n/))
    .on('data', (line) => {
      if (line.length === 0 && key) {
        // flush key-value
        if (opts.verbose) {
          console.log(`[${key}]: [${value}]`);
        }
        prop[key] = value;
        key = value = null;
        return;
      }

      if (!key) {
        key = line;
      } else {
        value = SmartConvert(key, line);
      }
    })
    .on('end', () => {
      if (opts.verbose) {
        console.log();
        console.log(prop);
        console.log();
      }
      done(prop);
    });
};
