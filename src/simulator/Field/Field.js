import FieldObject from './FieldObject.js';
import Algorithm from './Algorithm.js';
import Serializer from './Serializer.js';
import Deserializer from './Deserializer.js';

/**
 * Indicates which bit to turn on for which direction of connection.
 *
 * Refer to Field.prototype.Positional.prototype.connections for a more
 * detailed description.
 */
const ConnectionBitField = {
  BELOW : 1 << 0,
  ABOVE : 1 << 1,
  RIGHT : 1 << 2,
  LEFT  : 1 << 3,
};

export default class Field {
  /**
   * Enums of valid objects.
   * More objects can be added as follows:
   *
   *    Field.Object.NEW_OBJECT = new Field.Object.Properties({...});
   *
   * where the valid options are documented in './FieldObject.js'
   */
  static Object = FieldObject;

  /**
   * Common algorithms to run on a field.
   */
  static Algorithm = Algorithm;

  /**
   * Serializes the Field to various other format for display or storage.
   */
  static Serializer = Serializer(Field);

  /**
   * Deserializes serialized data back to a Field.
   */
  static Deserializer = Deserializer(Field);

  /** 
   * Stores field data. Clients shall not hand modify this.
   *
   * Use this.Positional to access or mutate field data. 
   */
  #data;

  /**
   * Constructs a Field.
   * @param {Number} columns     =  6 - number of columns(width) of this field.
   * @param {Number} visibleRows = 12 - number of visible rows of this field.
   * @param {Number} hiddenRows  =  1 - number of hidden rows of this field.
   * @param {[ [ Field.Object, ...], ... ]} - Array of Arrays of Field.Objects.
   *                                          Each subarray represents one column of objects.
   */
  constructor({ columns     =  6,
                visibleRows = 12,
                hiddenRows  =  1,
              } = {}) {
    // TODO: allow changing these values?
    this.dimension = {
      columns     : columns     >= 0 ? columns     :  6,
      visibleRows : visibleRows >= 0 ? visibleRows : 12,
      hiddenRows  : hiddenRows  >= 0 ? hiddenRows  :  1,
      get rows() { return this.visibleRows + this.hiddenRows; },
    };

    this.#data = [];

    let self = this;

    /**
     * Inner class of this Field that specializes at dealing with positions 
     * of this Field. This should be used to access or mutate field objects.
     * 
     * A Positional of {row: 0, col: 0} represents the bottomleft corner slot
     * on the field.
     */
    this.Positional = class {
      /**
       * Constructs a Positional object.
       * @param {Number} row    = 0 - row index this Positional represents, 
       *                              ignored if primitive is provided.
       * @param {Number} column = 0 - column index this Positional represents, 
       *                              ignored if primitive is provided.
       * @param {Number} primitive  - combined row and column this Positional represents,
       *                              supersedes row and column if provided.
       */
      constructor({row = 0, column = 0, primitive} = {}) {
        if (primitive !== undefined) {
          // Remember that a primitive is:
          //
          //   primitive = C * rows + R
          //
          // Therefore,
          // 
          //   R = primitive % rows
          //   C = floor(primitive / rows)
          //   
          this.row    = primitive % self.dimension.rows;
          this.column = Math.floor(primitive / self.dimension.rows);
        } else {
          [this.row, this.column] = [row, column];
        }
      }

      /**
       * Primitive value of this Positional object. A primitive is defined as
       *
       *                     primitive = C * rows + R
       *
       * This is particularly useful when storing Positionals in Sets and Maps,
       * since they only work well with primitive values.
       */
      get primitive() { return this.column * self.dimension.rows + this.row; }

      /** @return a new Positional representing the slot above this Positional. */
      get above() { return new this.constructor({row: this.row + 1, column: this.column     }); }
      /** @return a new Positional representing the slot below this Positional. */
      get below() { return new this.constructor({row: this.row - 1, column: this.column     }); }
      /** @return a new Positional representing the slot to the left of this Positional. */
      get left()  { return new this.constructor({row: this.row,     column: this.column - 1 }); }
      /** @return a new Positional representing the slot to the right of this Positional. */
      get right() { return new this.constructor({row: this.row,     column: this.column + 1 }); }
      /** @return an array of new Positionals representing the slots adjacent to this Positional. */
      get adjacent() { return [this.above, this.below, this.left, this.right]; }

      /** @return a new Positional representing the slot at the top of the Field. */
      get top()      { return new this.constructor({row: self.dimension.rows - 1, column: this.column                }); }
      /** @return a new Positional representing the slot at the far left of the Field. */
      get farRight() { return new this.constructor({row: this.row,                column: self.dimension.columns - 1 }); }
      /** @return a new Positional representing the slot at the bottom of the Field. */
      get bottom()   { return new this.constructor({row: 0,                       column: this.column                }); }
      /** @return a new Positional representing the slot at the far left of the Field. */
      get farLeft()  { return new this.constructor({row: this.row,                column: 0                          }); }

      /** @return true if this position is in the hidden rows; false otherwise. */
      get hidden() { return self.dimension.visibleRows <= this.row && this.row < self.dimension.rows; }
      /** @return true if this position is within the bounds of this field; false otherwise. */
      get valid() { return (0 <= this.row    && this.row    < self.dimension.rows   ) && 
                           (0 <= this.column && this.column < self.dimension.columns); }

      /** @return the underlying Field this Positional belongs to. */
      get field() { return self; }

      /**
       * Returns a connection bit field.
       *
       * A connection bit field is a 4-bit Number that stores whether adjacent
       * slots contain the same object as this slot.
       *
       * This information is most useful for determining sprite coordinates.
       * For normal use case of checking whether this slot is connected to some
       * adjacent slot, use other getters and check object equality instead.
       *
       * @return a connection bit field about this Positional.
       */
      get connections() {
        return 0 | (this.below.object == this.object ? ConnectionBitField.BELOW : 0)
                 | (this.above.object == this.object ? ConnectionBitField.ABOVE : 0)
                 | (this.right.object == this.object ? ConnectionBitField.RIGHT : 0)
                 | (this.left.object  == this.object ? ConnectionBitField.LEFT  : 0);
      }

      /**
       * @return {Field.Object} the type of field object at this position if position is valid;
       *                         undefined otherwise.
       */
      get object() {
        if (!this.valid) return undefined;

        const [row, column] = [this.row, this.column];

        if (self.#data[column] && self.#data[column][row]) {
          return self.#data[column][row];
        } else {
          return Field.Object.EMPTY;
        }
      }

      /**
       * Sets the type of field object at this position, if this position is valid.
       * If EMPTY is supplied, removes the object from this Field.
       * @param {Field.Object} obj - new Object at this position.
       */
      set object(obj) {
        if (!this.valid || !Object.values(Field.Object).includes(obj)) return;

        const [row, column] = [this.row, this.column];

        if (obj === Field.Object.EMPTY) {
          if (!self.#data[column]) return;
          delete self.#data[column][row];
        } else {
          if (!self.#data[column]) self.#data[column] = [];
          self.#data[column][row] = obj;
        }
      }
    }
  }

  /**
   * Generates valid positions in this field, in the order of r[0]c[0], r[1]c[0] ... r[max]c[max].
   */
  *[Symbol.iterator]() {
    for (let pos = new this.Positional; pos.valid; pos = pos.right.bottom)
      for (; pos.valid; pos = pos.above)
        yield pos;
  }

  clone() {
    let cloned = new this.constructor(this.dimension);
    cloned.#data = this.#data.map(column => column !== undefined ? column.slice() : undefined);
    return cloned;
  }
}
