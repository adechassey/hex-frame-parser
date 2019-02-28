'use strict';

class DecoderProperty {

    constructor(bitStartPos, bitEndPos, isSigned, key, type, unit, add, subtract, multiply, divide) {
        this.bitStartPos = bitStartPos;
        this.bitEndPos = bitEndPos;
        this.isSigned = isSigned;
        this.key = key;
        this.type = type;
        this.unit = unit;
        this.add = add;
        this.subtract = subtract;
        this.multiply = multiply;
        this.divide = divide;
    }
}

module.exports = DecoderProperty;
