#!/usr/bin/env node
'use strict';

const Fs = require('fs');
const Program = require('commander');
const prop2json = require('.');
const pkg = require('./package.json');

Program
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options] <prop-file>');

Program.on('--help', () => {
  console.log(
    '  Supported DEBUG tags = [parse].\n' +
    '  See https://github.com/visionmedia/debug/ for details.'
  );
});

Program.parse(process.argv);

// choose input stream, use stdin if no input arguments
const inputStream = Program.args.length
  ? Fs.createReadStream(Program.args[0])
  : process.stdin;

prop2json(inputStream, Program, (err, prop) => {
  if (err) {
    return console.log(err);
  }
  console.log(JSON.stringify(prop, null, 2));
});
