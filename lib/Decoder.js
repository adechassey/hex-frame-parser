'use strict';

import {EncoderProperty} from "../index";

class Decoder {

    constructor(hexPayload) {
        this.decoderProperties = [];
        this.decodedPayload = [];
        this.hexPayload = hexPayload;
        this.binPayload = '';

        // Convert hexadecimal frame to binary frame
        this.hexToBin();
    }

    hexToBin() {
        for (let i = 0; i <= (this.hexPayload.length - 2); i = i + 2) {
            let byte = parseInt(this.hexPayload.slice(i, i + 2), 16).toString(2);
            while (byte.length < 8) {
                byte = '0' + byte;
            }
            this.binPayload = this.binPayload.concat(byte);
        }
    }

    decode() {
        /*const operations = {
            "+": function (operand1, operand2) {
                return operand1 + operand2;
            },
            "-": function (operand1, operand2) {
                return operand1 - operand2;
            },
            "*": function (operand1, operand2) {
                return operand1 * operand2;
            },
            "/": function (operand1, operand2) {
                return operand1 / operand2;
            }
        };*/

        for (let decoderProperty of this.decoderProperties) {
            const encoderProperty = new EncoderProperty();
            // Key
            encoderProperty.key = decoderProperty.key;
            // Unit
            encoderProperty.unit = decoderProperty.unit;
            // Value
            encoderProperty.value = parseInt(this.binPayload.slice(decoderProperty.bitStartPos, decoderProperty.bitEndPos), 2);
            // Sign check
            if (decoderProperty.isSigned) {
                const maxIntervalValue = Math.pow(2, (decoderProperty.bitEndPos - decoderProperty.bitStartPos) - 1);
                if (encoderProperty.value >= maxIntervalValue) encoderProperty.value -= maxIntervalValue * 2;
            }
            // Type
            switch (decoderProperty.type) {
                case 'char':
                    encoderProperty.value = String.fromCharCode(encoderProperty.value);
                    encoderProperty.type = 'String';
                    break;
                case 'short':
                    encoderProperty.type = 'Number';
                    break;
                case 'int':
                    encoderProperty.type = 'Number';
                    break;
                case 'long':
                    encoderProperty.type = 'Number';
                    break;
                case 'float':
                    const p = new DataView(new ArrayBuffer(4));
                    p.setUint32(0, encoderProperty.value);
                    encoderProperty.value = p.getFloat32(0);
                    encoderProperty.type = 'Number';
                    break;
                case 'bool':
                    if (encoderProperty.value === 1) encoderProperty.value = true;
                    if (encoderProperty.value === 0) encoderProperty.value = false;
                    encoderProperty.type = 'Boolean';
                    break;
                default:
                    encoderProperty.type = 'undefined';
            }

            // If defined, operate the value
            if (decoderProperty.add && typeof decoderProperty.add === "number") encoderProperty.value = encoderProperty.value + decoderProperty.add;
            if (decoderProperty.subtract && typeof decoderProperty.subtract === "number") encoderProperty.value = encoderProperty.value - decoderProperty.subtract;
            if (decoderProperty.multiply && typeof decoderProperty.multiply === "number") encoderProperty.value = encoderProperty.value * decoderProperty.multiply;
            if (decoderProperty.divide && typeof decoderProperty.divide === "number") encoderProperty.value = encoderProperty.value / decoderProperty.divide;

            // Push the results
            this.decodedPayload.push(encoderProperty);
        }

        return this.decodedPayload;
    }

}

module.exports = Decoder;
