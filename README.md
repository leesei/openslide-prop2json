# openslide-prop2json

[![npm version](https://badge.fury.io/js/openslide-prop2json.svg)](https://badge.fury.io/js/openslide-prop2json)
[![bitHound Overall Score](https://www.bithound.io/github/leesei/openslide-prop2json/badges/score.svg)](https://www.bithound.io/github/leesei/openslide-prop2json) 
[![bitHound Dependencies](https://www.bithound.io/github/leesei/openslide-prop2json/badges/dependencies.svg)](https://www.bithound.io/github/leesei/openslide-prop2json/master/dependencies/npm) 
[![bitHound Dev Dependencies](https://www.bithound.io/github/leesei/openslide-prop2json/badges/devDependencies.svg)](https://www.bithound.io/github/leesei/openslide-prop2json/master/dependencies/npm) 
[![bitHound Code](https://www.bithound.io/github/leesei/openslide-prop2json/badges/code.svg)](https://www.bithound.io/github/leesei/openslide-prop2json)

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

Parse OpenSlide properties (generated by `openslide-show-properties`) to JSON.  
It will also automatically convert number and boolean fields.

[List of Known Properties](http://openslide.org/docs/properties/)  
[Virtual slide formats understood by OpenSlide](http://openslide.org/formats/)

## Install

```sh
npm install openslide-prop2json -g  # CLI
npm install openslide-prop2json     # as module
```

## Usage

### CLI

```sh
# load properties file
openslide-show-properties Leica-1.scn > Leica-1.prop
openslide-prop2json Leica-1.prop
# OR with a pipe
openslide-show-properties Leica-1.scn | openslide-prop2json
```

### As Module

```js
const prop2json = require('openslide-prop2json');
prop2json(inputStream, options, (err, prop) => {
  console.log(JSON.stringify(prop, null, 2));
});
```

### Debug logs

Supported DEBUG tags: *osp2j:parse*, *osp2j:transform*.  
See [visionmedia/debug](https://github.com/visionmedia/debug/) for details.

## TODO

- [`transform.js`] transform `openslide.level[]` as array
- [`convert.js`] add blacklist for field conversion
