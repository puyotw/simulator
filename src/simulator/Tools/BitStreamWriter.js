const CHAR_BIT = 8;

const Base64 = require('base64-js');

export default class BitStreamWriter {
  /** Stores an incomplete byte. */
  #buffer = 0;
  /** Stores the number of bits already written to #buffer. */
  #bitsInBuffer = 0;

  /** Stores flushed bytes. */
  #stream = [];

  #flush = function() {
    // no bit in buffer; nothing to flush
    if (this.#bitsInBuffer === 0) return;

    this.#stream.push(this.#buffer << (CHAR_BIT - this.#bitsInBuffer));
    this.#buffer = this.#bitsInBuffer = 0;
  };

  /**
   * Writes data to this stream.
   * @param {Number} value - data to be written.
   * @param {Number} writeBitCount - number of least significant bits from value
   *                                 to be written to this stream.
   */
  write({ value, writeBitCount }) {
    if (writeBitCount <= 0) return;

    // write leftmost bit to buffer,
    // e.g. with value=0b100, writeBitCount=3, we write 0b1 into buffer,
    // by right-shifting value by 2 so that 0b1 is the rightmost bit,
    // then we can easily AND it with 1 to extract just that bit
    this.#buffer = (this.#buffer << 1) | ((value >> (writeBitCount - 1)) & 1);

    // buffer is full, concat to stream
    if (++this.#bitsInBuffer % CHAR_BIT === 0) this.#flush();

    // recurse if we need to write more than 1 bit
    this.write({ value: value, writeBitCount: writeBitCount - 1 });
  }

  /**
   * Converts written stream to Base64 encoding. Finalizes this BitStreamWriter.
   * @return {String} Base64 encoded data written to this stream.
   */
  finalize() {
    this.#flush();
    Object.freeze(this);
    return Base64.fromByteArray(this.#stream);
  }
}

