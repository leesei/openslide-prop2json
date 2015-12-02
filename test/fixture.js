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

const ParseProp = require('../lib/parse');
const Transform = require('../lib/transform');

const OPENSLIDE_PROPS = [
  {
    source: './fixture/Aperio-CMU-1-JP2K-33005.prop',
    expected: './fixture/Aperio-CMU-1-JP2K-33005.json'
  },
  {
    source: './fixture/Generic-CMU-1.prop',
    expected: './fixture/Generic-CMU-1.json'
  },
  {
    source: './fixture/Hamamatsu-VMS-CMU-1.prop',
    expected: './fixture/Hamamatsu-VMS-CMU-1.json'
  },
  {
    source: './fixture/Leica-1.prop',
    expected: './fixture/Leica-1.json'
  },
  {
    source: './fixture/MIRAX-CMU-1-Saved-1_2.prop',
    expected: './fixture/MIRAX-CMU-1-Saved-1_2.json'
  }
];

OPENSLIDE_PROPS.forEach((fixture) => {
  describe(`fixture [${fixture.source}]`, () => {
    let inputStream = Fs.createReadStream(Path.resolve(__dirname, fixture.source));
    let expectedJson = JSON.parse(Fs.readFileSync(Path.resolve(__dirname, fixture.expected), 'utf8'));

    it('parses correctly', (done) => {
      ParseProp(inputStream, {}, prop => {
        expect(Transform(prop)).to.deep.equal(expectedJson);
        done();
      });
    });
  });
});
