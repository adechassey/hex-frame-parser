# Hexadecimal frame parser ![npm](https://img.shields.io/npm/v/hex-frame-parser.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/hex-frame-parser.svg)

Encode & decode hexadecimal frames with ease

## Install

```
$ npm install --save hex-frame-parser
```

## Usage

```js
const Decoder = require('hex-frame-parser').Decoder;
const DecoderProperty = require('hex-frame-parser').DecoderProperty;

// Objects
const decoder = new Decoder('47c85d800f03'); // the hexadecimal frame to decode

// Define the syntax (bitStartPos, bitEndPos, key, type, unit, add, subtract, divide, multiply)
decoder.decoderProperties.push(new DecoderProperty(0, 32, false, 'pressure', 'float', 'hPa', null, null, 100, null));

// See the result
console.log(decoder.decode());
```

## Properties

- `bitStartPos`: *Number* defines the position of the starting bit to decode
- `bitEndPos`: *Number* defines the position of the ending bit to decode
- `isSigned`: *Boolean* defines if the data is signed or unsigned
- `key`: *String* defines the name of the data to decode
- `type`: *String* defines the type of the data to decode _**(see below for usable types)**_
- `unit`: *String* defines the unit of the data to decode
- `add`: *Number* defines the number to add to the data
- `subtract`: *Number* defines the number to subtract to the data
- `multiply`: *Number* defines the number to multiply to the data
- `divide`: *Number* defines the number to divide to the data

### Types _(32bits architecture)_

`type` can be:
- `char`
- `short`
- `int`
- `long`
- `float`
- `bool`

## Examples

```js
const Decoder = require('hex-frame-parser').Decoder;
const DecoderProperty = require('hex-frame-parser').DecoderProperty;

// #1
const decoder_1 = new Decoder('47c85d800f03');
decoder_1.decoderProperties.push(new DecoderProperty(0, 32, false, 'pressure', 'float', 'hPa', null, null, null, 100));
decoder_1.decoderProperties.push(new DecoderProperty(8, 16, false, 'humidity', 'int', '%'));
console.log(decoder_1.decode());

// #2
const decoder_2 = new Decoder('b6096249');
decoder_2.decoderProperties.push(new DecoderProperty(8, 13, false, 'mode', 'bool', ''));
console.log(decoder_2.decode());

// #3
const decoder_3 = new Decoder('1a00bd4aa5181d');
decoder_3.decoderProperties.push(new DecoderProperty(8, 24, true, 'temperature', 'int', '°C', null, null, null, 8));
decoder_3.decoderProperties.push(new DecoderProperty(24, 32, false, 'humidity', 'int', '%',  null, null, null, 2));
console.log(decoder_3.decode());

// #4
const decoder_4 = new Decoder('32b641e0224484');
decoder_4.decoderProperties.push(new DecoderProperty(4, 13, true, 'temperature', 'int', '°C',  null, null, 0.25, null));
console.log(decoder_4.decode());
```
