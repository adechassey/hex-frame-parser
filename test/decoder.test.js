'use strict';

// Modules
const tap = require('tap');
const Decoder = require('./../index').Decoder;
const DecoderProperty = require('./../index').DecoderProperty;

// Objects
const decoder_1 = new Decoder('47c85d800f03');
/*47c85d800f03
pressure: 1025.87 hPa
deltaPressureSinceLastMesure: 0.05 hPa
voltage: 3843 V*/
const decoder_2 = new Decoder('b6096249');
/*b6096249
mode: Temperature & Humidity
temperature: 19.25 °C
humidity: 36.5 %
battery: 60 %*/
const decoder_3 = new Decoder('1a00bd4aa5181d');
/*1a00bd4aa5181d
battery: 83 %
temperature: 23.63 °C
humidity: 37 %
humidityCounter: 165
shockCounter: 24
lightCounter: 29*/
const decoder_4 = new Decoder('32b641e0224484');
/*32b641e0224484
frameName: No Movement
frameId: 3
temperature: 21.5 °C
battery: 100 %
lowBattThreshold: 15 %
X_PIR: 1
Y_PIR: 18
Z_PIR: 144
pirSensitivityThld: High*/

tap.test('test the payload definition', (t) => {
    decoder_1.decoderProperties.push(new DecoderProperty(0, 32, false, 'pressure', 'float', 'hPa', null, null, null, 100));
    decoder_1.decoderProperties.push(new DecoderProperty(8, 16, false, 'humidity', 'int', '%'));

    decoder_2.decoderProperties.push(new DecoderProperty(8, 13, false, 'mode', 'bool', ''));

    decoder_3.decoderProperties.push(new DecoderProperty(8, 24, true, 'temperature', 'int', '°C', null, null, null, 8));
    decoder_3.decoderProperties.push(new DecoderProperty(24, 32, false, 'humidity', 'int', '%',  null, null, null, 2));

    decoder_4.decoderProperties.push(new DecoderProperty(4, 13, true, 'temperature', 'int', '°C',  null, null, 0.25, null));

    t.end();
});

tap.test('test the payload decoding', (t) => {
    console.log(decoder_1.decode());
    console.log(decoder_2.decode());
    console.log(decoder_3.decode());
    console.log(decoder_4.decode());
    t.end();
});

