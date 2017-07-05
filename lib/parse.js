const Split = require('split');
const SmartConvert = require('./convert');

const debug = require('debug')('osp2j:parse');
// parse inputStream to key-value pairs with each line in this format
//   key: 'value'
//
// keys are dot separated fields
// value may contain newline character
//
// TODO: handle parse errors?
module.exports = function(inputStream, opts, done) {
  let prop = {};
  let key, value;

  inputStream
    .pipe(Split(/([^:]+): '([^']+)'\r?\n/))
    .on('data', line => {
      if (line.length === 0 && key) {
        // flush key-value
        debug(`[${key}]: [${value}]`);
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
      debug('== end');
      debug(JSON.stringify(prop, null, 2));
      debug('');
      done(null, prop);
    });
};
