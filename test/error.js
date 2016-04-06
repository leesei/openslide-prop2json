'use strict';

const Fs = require('fs');
const Code = require('code');
const Lab = require('lab');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const prop2json = require('..');

describe('invalid input', () => {
  it('invalid stream should return error', (done) => {
    prop2json(null, {}, (err, prop) => {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });

  it('invalid option should return error', (done) => {
    prop2json(Fs.createReadStream(__filename), null, (err, prop) => {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });

  it('invalid callback should throw error', (done) => {
    expect(prop2json.bind(null, Fs.createReadStream(__filename), {}, null)).to.throw(Error);
    done();
  });
});
