const Stream = Uint8Array;
const CHAR_BIT = 8;
const BUFSIZ = 100;

export default class BitStreamWriter {
  /** Stores an incomplete byte. */
  #buffer = 0;
  /** Stores the number of bits already written to #buffer. */
  #bitsInBuffer = 0;

  /** Stores flushed bytes. */
  #stream = new Stream(BUFSIZ);
  /** Stores how many bytes have been flushed so far. */
  #flushCount = 0;

  #flush = function() {
    if (this.#bitsInBuffer === 0) {
      // this should only happen in toBlob(); returning an empty string so that 
      // we won't add extra data to the resultant Blob.
      return '';
    } else {
      // this happens in toBlob() as well as in write.
      const result = this.#buffer << (CHAR_BIT - this.#bitsInBuffer);
      this.#buffer = this.#bitsInBuffer = 0;
      return result;
    }
  };

  /**
   * Writes data to this stream.
   * @param {Number} value - data to be written.
   * @param {Number} writeBitCount - number of least significant bits from value
   *                                 to be written to this stream.
   */
  write({value, writeBitCount}) {
    if (writeBitCount <= 0) return;

    // write leftmost bit to buffer,
    // e.g. with value=0b100, writeBitCount=3, we write 0b1 into buffer,
    // by right-shifting value by 2 so that 0b1 is the rightmost bit,
    // then we can easily AND it with 1 to extract just that bit
    this.#buffer = (this.#buffer << 1) | ((value >> (writeBitCount - 1)) & 1);

    if (++this.#bitsInBuffer % CHAR_BIT === 0) {
      // buffer is full, concat to stream
      this.#stream[this.#flushCount++] = this.#flush();
    }

    // recurse if we need to write more than 1 bit
    this.write({value: value, writeBitCount: writeBitCount - 1});
  }

  /**
   * Converts this stream to Blob. Finalizes this BitStreamWriter.
   * @return {Blob} Blob object of data written to this stream.
   */
  toBlob() {
    let blob = new Blob([new Stream(this.#stream.buffer, 0, this.#flushCount), 
                         this.#flush()], 
                        {type: 'application/octet-stream'});
    Object.freeze(this);
    return blob;
  }
}

