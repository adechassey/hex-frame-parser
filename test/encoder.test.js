'use strict';

const tap = require('tap');
const Encode = require('./../index').Encode;
const encode = new Encode();

tap.test('test the payload is divisible by 2', (t) => {
    t.end();
});

