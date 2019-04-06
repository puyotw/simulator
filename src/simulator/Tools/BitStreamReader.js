const CHAR_BIT = 8;

const Decoder = require('base-x')('0123456789' +
                                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                                  'abcdefghijklmnopqrstuvwxyz' +
                                  '-._~');

export default class BitStreamReader {
  #buffer = 0;
  #bitsInBuffer = 0;
  #stream;

  /**
   * Constructs this BitStreamReader.
   *
   * @param {String} encoded - the encoded string that contains binary data
   *                           for this stream to read.
   */
  constructor(encoded) {
    this.#stream = Array.from(Decoder.decode(encoded));
  }

  /**
   * Reads some bits from the stream.
   *
   * @param {Number} bitCount - The number of bits to read from the stream.
   * 
   * @return {Number} a number with the first bitCount-bits containing the
   *                  data read from the stream. 
   *                  0 for any nonpositive bitCount.
   *                  undefined if stream is already empty.
   */
  read(bitCount) {
    // caller wants 0 bit, just don't do anything
    if (bitCount <= 0) return 0;

    // buffer has nothing, populate it
    if (this.#bitsInBuffer === 0) {
      // stream has nothing, no more bit to read
      if (this.#stream.length === 0) return undefined;

      this.#buffer = this.#stream.shift();
      this.#bitsInBuffer = CHAR_BIT;
    }

    const result = // get 1 desired bit from buffer
                   ((this.#buffer >> --this.#bitsInBuffer) & 1)
                   // shift it to the leftmost bit in return value
                   << (bitCount - 1);

    return result | this.read(bitCount - 1);
  }

  /**
   * Reads a variable length quantity. Refer to BitStreamWriter for explanation
   * of variable length quantities.
   */
  readVariableLength(partitionBitCount) {
    let result = 0;
    do {
      var shouldContinue = this.read(1);
      result <<= partitionBitCount;
      result |= this.read(partitionBitCount);
    } while (shouldContinue === 1);
    return result;
  }
}
