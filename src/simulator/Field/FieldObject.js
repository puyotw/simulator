const FieldObject = {};
export default FieldObject;

Object.defineProperty(FieldObject, 'Properties', {
  value : class {
    constructor({
      /** Function that, given positional, determines what this object should become when cleared. */
      // eslint-disable-next-line
      cleared         = (positional) => this,
      /** Function that, given positional, determines what this object should become when an adjacent object is cleared. */
      // eslint-disable-next-line
      adjacentCleared = (positional) => this,
      /** Determines whether this object should be immune to gravity. */
      gravityImmune   = false,
      /** One-character string symbol to represent this object when serializing Fields. Must be unique. */
      symbol          = '?',
    } = {}) {
      this.cleared = cleared;
      this.adjacentCleared = adjacentCleared;
      this.gravityImmune = gravityImmune;
      this.symbol = symbol;
      Object.freeze(this);
    }
  }
});

// Special EMPTY object, must exist.
Object.defineProperty(FieldObject, 'EMPTY', {
  value : new FieldObject.Properties({ gravityImmune : true, symbol : ' ' }),
  enumerable : true,
})
