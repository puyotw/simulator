const CHAR_BIT = 16;

export default class BitStreamReader {
  #buffer = 0;
  #bitsInBuffer = 0;
  #streamToBeRead;

  constructor(streamToBeRead) {
    this.#streamToBeRead = new Uint8Array(streamToBeReader);
  }

  read(bitCount) {
    if (bitCount <= 0) return undefined;
    if (this.#bitsInBuffer === 0) {
      // buffer has nothing, populate it
      if (this.#streamToBeRead.length === 0) return undefined;

      this.#buffer = this.#streamToBeRead[0];
      this.#streamToBeRead = this.#streamToBeRead.slice(1);
      this.#bitsInBuffer = CHAR_BIT;
    }

    const result = // get 1 desired bit from buffer
                   ((this.#buffer >> --this.#bitsInBuffer) & 1)
                   // shift it to the leftmost bit in return value
                   << (bitCount - 1);

    return result | this.read(bitCount - 1);
  }
}
