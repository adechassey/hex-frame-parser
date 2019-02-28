'use strict';

class EncoderProperty {

    constructor(bitStartPos, bitEndPos, name, type, unit) {
        this.bitStartPos = bitStartPos;
        this.bitEndPos = bitEndPos;
        this.name = name;
        this.type = type;
        this.unit = unit;
    }
}

module.exports = EncoderProperty;
