#!/usr/bin/env node
'use strict';

const Fs = require('fs');
const Program = require('commander');
const ParseProp = require('./lib/parse');
const Transform = require('./lib/transform');
const pkg = require('./package.json');

Program
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options] <prop-file>')
  .option('-v, --verbose', 'MOAR logs!!!')
  .parse(process.argv);

// choose input stream
const inputStream = Program.args.length
  ? Fs.createReadStream(Program.args[0])
  : process.stdin;

ParseProp(inputStream, Program, prop => {
  console.log(JSON.stringify(Transform(prop), null, 2));
});
