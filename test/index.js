'use strict';

const Fs = require('fs');
const Path = require('path');
const Code = require('code');
const Lab = require('lab');

const ParseProp = require('../lib/parse');
const Transform = require('../lib/transform');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const OPENSLIDE_PROPS = [
  './fixture/Aperio-CMU-1-JP2K-33005.prop',
  './fixture/Generic-CMU-1.prop',
  './fixture/Hamamatsu-VMS-CMU-1.prop',
  './fixture/Leica-1.prop',
  './fixture/MIRAX-CMU-1-Saved-1_2.prop'
];

OPENSLIDE_PROPS.forEach((file) => {
  describe(`${file}`, () => {
    let inputStream = Fs.createReadStream(Path.resolve(__dirname, file));
    let expectedJson = JSON.parse(Fs.readFileSync(Path.resolve(__dirname, file + '.json'), 'utf8'));

    it('parses prop correctly', (done) => {
      ParseProp(inputStream, {}, prop => {
        expect(Transform(prop)).to.deep.equal(expectedJson);
        done();
      });
    });
  });
});

describe(`with verbose option`, () => {
  const file = OPENSLIDE_PROPS[1];
  let inputStream = Fs.createReadStream(Path.resolve(__dirname, file));
  let expectedJson = JSON.parse(Fs.readFileSync(Path.resolve(__dirname, file + '.json'), 'utf8'));

  it('parses prop correctly', (done) => {
    ParseProp(inputStream, {verbose: true}, prop => {
      expect(Transform(prop)).to.deep.equal(expectedJson);
      done();
    });
  });
});
