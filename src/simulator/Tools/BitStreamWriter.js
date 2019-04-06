const CHAR_BIT = 8;

const Buffer  = require('safe-buffer').Buffer;
const Encoder = require('base-x')('0123456789' +
                                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                                  'abcdefghijklmnopqrstuvwxyz' +
                                  '-._~');

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
   * Writes data to this stream as a variable length quantity.
   *
   * A variable length quantity may require several partitions to fully
   * store the value, each partition having partitionBitCount + 1 many bits. If
   * the quantity requires more than one partition, the most significant bit of
   * the partition is 1; 0 otherwise.
   *
   * For example, if value is 0b10001, and partitionBitCount is 5:
   * Since 5 bits can fully store this binary number, the result is 0b 010001.
   *
   * For the same value, if partitionBitCount is 2:
   * Since 2 bits can NOT fully store this binary number, it requires more than
   * 1 partition; in fact, it requires 3 partitions, and will be stored as
   * 0b 101 100 001.
   *
   * This is particularly useful if a value usually doesn't exceed only a few
   * bits, in which case storing the value in a fixed length fashion may waste
   * a lot of bits.
   *
   * @param {Number} value - the value to write as a varlen quantity.
   * @param {Number} writeBitCount - the maximum number of bits in value to write.
   * @param {Number} partitionBitCount - the number of bits each partition has.
   */
  writeVariableLength({ value, writeBitCount, partitionBitCount }) {
    let self = this;
    let writeNext = function(v, c) {
      if (c <= partitionBitCount) {
        return [v >>> partitionBitCount, 
                () => {
                  self.write({ value: 0, writeBitCount: 1 });
                  self.write({ value: v, writeBitCount: partitionBitCount });
                }];
      } else {
        let [newV, f] = writeNext(v, c - partitionBitCount);
        return [newV >>> partitionBitCount, 
                () => {
                  if (newV !== 0) {
                    self.write({ value: 1, writeBitCount: 1 });
                    self.write({ value: newV, writeBitCount: partitionBitCount });
                  }
                  f();
                }];
      }
    };

    let [, w] = writeNext(value, writeBitCount);
    w();
  }

  /**
   * Converts written stream to encoding. Finalizes this BitStreamWriter.
   * @return {String} Encoded data written to this stream.
   */
  finalize() {
    this.#flush();
    Object.freeze(this);
    return Encoder.encode(Buffer.from(this.#stream));
  }
}

