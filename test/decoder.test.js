'use strict';

const tap = require('tap');
const Decode = require('./../index').Decode;
const decode = new Decode('CAFEBABE');

tap.test('test the payload is divisible by 2', (t) => {
    t.end();
});

