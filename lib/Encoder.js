'use strict';

class Encoder {

    constructor(encoderProperties) {
        this.encoderProperties = encoderProperties;
        this.encodedPayload = '';
    }

    encode() {
        for (encoderProperties of this.encoderProperties) {
            console.log(property);
        }

        return this.encodedPayload;
    }
}

module.exports = Encoder;
