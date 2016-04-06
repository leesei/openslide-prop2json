'use strict';

const Code = require('code');
const Lab = require('lab');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const Transform = require('../lib/transform');

describe('Transform()', () => {
  it('transforms correctly', (done) => {
    var input = {
      keyInt: 42,
      'key.with.dot': 'value',
      'key.bracket[0]': 'value',
      'key.bracket[1].key1': 'value1',
      'key.bracket[1].key2': 'value2'
    };

    const expected = {
      keyInt: 42,
      key: {
        with: {
          dot: 'value'
        },
        'bracket[0]': 'value',
        'bracket[1]': {
          key1: 'value1',
          key2: 'value2'
        }
      }
    };

    expect(Transform(input)).to.deep.equal(expected);
    done();
  });

  it('handles invalid key path', (done) => {
    // this was encountered in a Hamamatsu file
    var input = {
      'key': 'value',
      'key.sub': 'value'
    };

    const expected = {
      key: {
        sub: 'value'
      }
    };

    expect(Transform(input)).to.deep.equal(expected);
    done();
  });
});
