#!/usr/bin/env node
'use strict';

const Fs = require('fs');
const Program = require('commander');
const prop2json = require('.');
const pkg = require('./package.json');

Program
  .version(pkg.version)
  .description(pkg.description)
  .arguments('[prop-file]')
  .action((propFile) => {
    Program.propFile = propFile;
  })
  .option('-j, --json', 'Output JSON (not applicable for piped input)');

Program.on('--help', () => {
  console.log(
    '  See https://github.com/leesei/openslide-prop2json#readme for details.'
  );
});

Program.parse(process.argv);

// choose input stream, use stdin if no input arguments
const inputStream = Program.propFile
  ? Fs.createReadStream(Program.propFile)
  : process.stdin;

prop2json(inputStream, Program, (err, prop) => {
  if (err) {
    return console.log(err);
  }
  if (Program.json && Program.propFile) {
    Fs.writeFileSync(
      // replace '.prop' or append to end
      Program.propFile.replace(/.prop$|$/, '.json'),
      JSON.stringify(prop, null, 2));
  } else {
    console.log(JSON.stringify(prop, null, 2));
  }
});
