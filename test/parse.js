'use strict';

const ReadableStream = require('stream').Readable;
const Code = require('code');
const Lab = require('lab');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const ParseProp = require('../lib/parse');

describe(`ParseProp()`, () => {
  it('parses prop correctly (with verbose)', (done) => {
    let inputStream = new ReadableStream();
    inputStream.push("keyInt: '42'\n");
    inputStream.push("keyFloat: '3.1415926'\n");
    inputStream.push("keyHex: '0xbeef'\n");
    inputStream.push("keyNAN: 'ef1a'\n");
    inputStream.push("keyTrue: 'True'\n");
    inputStream.push("keyFalse: 'False'\n");
    inputStream.push("keyNewline: 'value\nwith\nnewline'\n");
    inputStream.push("key.with.dot: 'value'\n");
    inputStream.push("key.bracket[0]: 'value'\n");
    inputStream.push("key.bracket[1].key1: 'value1'\n");
    inputStream.push("key.bracket[1].key2: 'value2'\n");
    inputStream.push(null);

    ParseProp(inputStream, {}, (err, prop) => {
      expect(err).to.be.null();

      expect(prop.keyInt).to.be.a.number();
      expect(prop.keyInt).to.equal(42);

      expect(prop.keyFloat).to.be.a.number();
      expect(prop.keyFloat).to.equal(3.1415926);

      expect(prop.keyHex).to.be.a.number();
      expect(prop.keyHex).to.equal(0xbeef);

      expect(prop.keyNAN).to.be.a.string();
      expect(prop.keyNAN).to.equal('ef1a');

      expect(prop.keyTrue).to.be.a.boolean();
      expect(prop.keyTrue).to.be.true();
      expect(prop.keyFalse).to.be.a.boolean();
      expect(prop.keyFalse).to.be.false();

      expect(prop['key.with.dot']).to.be.a.string();
      expect(prop['key.with.dot']).to.equal('value');

      expect(prop['key.bracket[0]']).to.be.a.string();
      expect(prop['key.bracket[0]']).to.equal('value');
      expect(prop['key.bracket[1].key1']).to.be.a.string();
      expect(prop['key.bracket[1].key1']).to.equal('value1');
      expect(prop['key.bracket[1].key2']).to.be.a.string();
      expect(prop['key.bracket[1].key2']).to.equal('value2');

      done();
    });
  });

  it('returns {} on prop without trailing newline', (done) => {
    let inputStream = new ReadableStream();
    inputStream.push("keyInt: '42'");
    inputStream.push(null);

    ParseProp(inputStream, {}, (err, prop) => {
      expect(err).to.be.null();

      expect(prop).to.be.empty();
      done();
    });
  });

  // behavior is not well defined on invalid format
  it.skip('invalid format 1', (done) => {
    let inputStream = new ReadableStream();
    inputStream.push('key: value\n');
    inputStream.push(null);

    ParseProp(inputStream, {}, (err, prop) => {
      expect(err).to.be.null();

      expect(prop).to.be.empty();
      done();
    });
  });

  // behavior is not well defined on invalid format
  it.skip('invalid format 2', (done) => {
    let inputStream = new ReadableStream();
    inputStream.push("key1: 'value'\n");
    inputStream.push('key2: value\n');
    inputStream.push("key3: 'value'\n");
    inputStream.push('key4: value\n');
    inputStream.push(null);

    ParseProp(inputStream, {}, (err, prop) => {
      expect(err).to.be.null();

      expect(prop).to.deep.equal({
        key1: 'value',
        key3: 'value'
      });
      done();
    });
  });
});
