export default class Diff {
  /**
   * A simple subclass of Array that supplies an apply method, that calls
   * apply on each Array element, which is a Diff object.
   *
   * Functions that return a collection of Diff objects should return an
   * instance of this Collection class instead of a native Array.
   */
  static Collection = class extends Array {
    constructor(...args) { super(...args); }
    apply() { this.forEach(diff => diff.apply()); }
  };

  static Type = {
    /**
     * Indicates that objects in two Positional exchanges positions.
     *
     * $positional and $argument to the constructor should be two different
     * positionals to be exchanged, belonging to the same field. The diff is
     * equivalent if $positional and $argument arguments are swapped.
     *
     * The exchanging positionals can be accessed through this.positional and
     * this.otherPositional.
     */
    EXCHANGE : {}, 
    /**
     * Indicates the object in a Positional is transforming to another kind of
     * object. $argument passed to the constructor is a value in Field.Object
     * to transform to.
     *
     * The $argument can later be accessed through this.newObject.
     */
    TRANSFORM : {},
  }

  constructor({type, positional, argument}) {
    this.positional = positional;
    switch (this.type = type) {
      case Diff.Type.TRANSFORM: this.newObject = argument;       break;
      case Diff.Type.EXCHANGE:  this.otherPositional = argument; break;
    }
    Object.freeze(this);
  }

  get valid() {
    if (!this.positional.valid) return false;

    switch (this.type) {
      case Diff.Type.TRANSFORM: return true;
      case Diff.Type.EXCHANGE:  return this.positional.field == this.otherPositional.field;
      default: return false;
    }
  }

  apply() {
    if (!this.valid) return;

    switch (this.type) {
      case Diff.Type.TRANSFORM: this.positional.object = this.newObject; break;
      case Diff.Type.EXCHANGE: 
        [ this.positional.object, this.otherPositional.object ] = [ this.otherPositional.object, this.positional.object ];
        break;
    }
  }
}
