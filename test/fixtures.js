'use strict';

const Fs = require('fs');
const Path = require('path');
const Code = require('code');
const Lab = require('lab');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const prop2json = require('..');

const OPENSLIDE_PROPS_FIXTURES = [
  {
    source: './fixtures/1610167-13.01.prop',
    expected: './fixtures/1610167-13.01.json'
  },
  {
    source: './fixtures/Aperio-CMU-1-JP2K-33005.prop',
    expected: './fixtures/Aperio-CMU-1-JP2K-33005.json'
  },
  {
    source: './fixtures/Generic-CMU-1.prop',
    expected: './fixtures/Generic-CMU-1.json'
  },
  {
    source: './fixtures/Hamamatsu-VMS-CMU-1.prop',
    expected: './fixtures/Hamamatsu-VMS-CMU-1.json'
  },
  {
    source: './fixtures/Leica-1.prop',
    expected: './fixtures/Leica-1.json'
  },
  {
    source: './fixtures/MIRAX-CMU-1-Saved-1_2.prop',
    expected: './fixtures/MIRAX-CMU-1-Saved-1_2.json'
  }
];

OPENSLIDE_PROPS_FIXTURES.forEach((fixture) => {
  describe(`fixture [${fixture.source}]`, () => {
    let inputStream = Fs.createReadStream(Path.resolve(__dirname, fixture.source));
    let expectedJson = JSON.parse(Fs.readFileSync(Path.resolve(__dirname, fixture.expected), 'utf8'));

    it('parses correctly', (done) => {
      prop2json(inputStream, {}, (err, prop) => {
        expect(err).to.be.null();
        expect(prop).to.deep.equal(expectedJson);
        done();
      });
    });
  });
});
