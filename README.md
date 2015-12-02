# openslide-prop2json

Parse OpenSlide properties (generated by `openslide-show-properties`) to JSON.
It will also automatically convert number and boolean fields.

## Install

```sh
npm install openslide-prop2json -g
```

## Usage

```sh
openslide-show-properties Leica-1.scn > Leica-1.prop
openslide-prop2json Leica-1.prop
# OR 
openslide-show-properties Leica-1.scn | openslide-prop2json
```

## TODO

- [`transform.js`] transform `openslide.level[]` as array
- [`convert.js`] add blacklist for field conversion
