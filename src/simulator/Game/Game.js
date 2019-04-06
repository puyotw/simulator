import Field from '../Field/Field.js';
import BitStreamWriter from '../Tools/BitStreamWriter.js';
import BitStreamReader from '../Tools/BitStreamReader.js';

// color puyo
Field.Object.RED = new Field.Object.Properties({ symbol: 'R', cleared: () => Field.Object.EMPTY });
Field.Object.YELLOW = new Field.Object.Properties({ symbol: 'Y', cleared: () => Field.Object.EMPTY });
Field.Object.BLUE = new Field.Object.Properties({ symbol: 'B', cleared: () => Field.Object.EMPTY });
Field.Object.GREEN = new Field.Object.Properties({ symbol: 'G', cleared: () => Field.Object.EMPTY });
Field.Object.PURPLE = new Field.Object.Properties({ symbol: 'P', cleared: () => Field.Object.EMPTY });

// non-clearable puyo
Field.Object.BLOCK = new Field.Object.Properties({ symbol: '=', gravityImmune: true });
Field.Object.IRON = new Field.Object.Properties({ symbol: '-' });

// nuisance puyo
Field.Object.NUISANCE = new Field.Object.Properties({ symbol: 'o', adjacentCleared: () => Field.Object.EMPTY });
Field.Object.HARD_NUISANCE = new Field.Object.Properties({ symbol: 'O', adjacentCleared: () => Field.Object.NUISANCE });

// every value to bit stream can have at most 32 bits;
// bits beyond 32 will be truncated and ignored.
const MAX_BIT_COUNT = 32;

export default class Game {
  // Subclasses should register themselves into this Array for serialization,
  // Each subclass must take a unique spot in this array.
  static Modes = [];

  static Serializer = class {
    /**
     * Outputs a header to the given bit stream.
     *
     * The header stores the rule, dimension and/or other parameters of a Game.
     * To conserve bits, it only stores parameters that are not at their
     * default values.
     *
     * The structure of the header will look like:
     *  {
     *    0, if actual == default, otherwise
     *    1, then {
     *      0, if actual === null,
     *      1, then <varlen<partition size>>
     *    }
     *  } * default.length
     *
     * For example, with actual = [1, 2, 3, null], default = [1, 1, 3, 2], partSize = [4, 4, 4, 4],
     * The binary of header will look like: 0b0100001010, because:
     * 0b 0         actual[0] == default[0]
     *    1         actual[1] != default[1]
     *      00001   varlen<partSize[1]>(actual[1])
     *    0         actual[2] == default[2]
     *    1         actual[3] != default[3]
     *      0       actual[3] === null
     *  
     * @param {BitOutputStream} ostream - the bit stream to output the header to.
     * @param {[Number, ...]} actualParams - the array of actual parameter values
     *                                       to be stored.
     * @param {[Number, ...]} defaultParams - the array of default parameter
     *                                        values to compare actual values
     *                                        against.
     * @param {[Number, ...]} partitionSize - the partition bit count of a varlen
     *                                        data, if the actual value is
     *                                        different from the default value.
     */
    static headerToBitStream(ostream, {
      actualParams, 
      defaultParams,
      partitionSizes
    }) {
      for (let index = 0; index < defaultParams.length; ++index) {
        if (actualParams[index] === defaultParams[index]) {
          ostream.write({ value: 0, writeBitCount: 1 });
        } else {
          ostream.write({ value: 1, writeBitCount: 1 });
          if (actualParams[index] === null) {
            ostream.write({ value: 0, writeBitCount: 1 });
          } else {
            ostream.write({ value: 1, writeBitCount: 1 });
            ostream.writeVariableLength({
              value: actualParams[index],
              writeBitCount: MAX_BIT_COUNT,
              partitionBitCount: partitionSizes[index]
            });
          }
        }
      }
    }

    /**
     * Serializes the given game to an output bit stream.
     *
     * @param {Game} game - the game object to serialize.
     * @param {BitStreamWriter} ostream = new BitStreamWriter() -
     *        the bit output stream to serialize the game to. May be omitted,
     *        in which case an empty stream will be used.
     * @return {BitStreamWriter} the given ostream.
     */
    static toBitStream(game, ostream = new BitStreamWriter()) {
      ostream.writeVariableLength({
        value: Game.Modes.indexOf(game.constructor),
        writeBitCount: MAX_BIT_COUNT,
        partitionBitCount: 4
      });

      return game.constructor.Serializer.toBitStream(game, ostream);
    }

    /**
     * Serialzies the given game to a base64 encoded string.
     *
     * @param {Game} game - the game to serialize.
     * @return {String} the base64 encoded string.
     */
    static toBase64(game) {
      return Game.Serializer.toBitStream(game).finalize();
    }
  }

  static Deserializer = class {
    /**
     * Convenience function to convert an array of param values to an array of
     * objects, each of whose keys are given by objectKeys.
     *
     * For example, with array = [1, 2, 3, 4, 5], objectKeys = [[a, b, c], [d, e]],
     * returns [{ a:1, b:2, c:3 }, { d:4, e:5 }].
     *
     * @param {[Number, ...]} array - the array of values to convert to objects from.
     * @param {[[String, ...], ...]} - the array of arrays of strings, with each
     *                                 subarray represents an object in the result,
     *                                 and with each string represents a key in the
     *                                 resultant object.
     * @return {[Object, ...]} - an array of objects as described above.
     */
    static array2objects({ array, objectKeys }) {
      let result = [];
      for (let keys of objectKeys) {
        result.push(keys.reduce((obj, k) => (obj[k] = array.shift(), obj), {}));
      }
      return result;
    }

    /**
     * Reads from the header and returns an array of actual values. Reverses
     * Game.Serializer.headerToBitStream.
     */ 
    static headerFromBitStream(istream, {
      defaultParams,
      partitionSizes
    }) {
      for (let index = 0; index < defaultParams.length; ++index) {
        if (istream.read(1) === 0) continue;
        defaultParams[index] = istream.read(1) === 0 ? null
                                                     : istream.readVariableLength(partitionSizes[index]);
      } 

      return defaultParams;
    }

    /**
     * Deserializes a Game object from the given bit stream.
     *
     * @param {BitStreamReader} istream - the bit input stream to read from.
     * @return {Game} the deserialized Game object.
     */
    static fromBitStream(istream) {
      return Game.Modes[istream.readVariableLength(4)].Deserializer.fromBitStream(istream);
    }

    /**
     * Deserializes a Game object from the given base64 encoded string.
     *
     * @param {String} base64 - the base64 encoded string.
     * @return {Game} the deserialized Game object.
     */
    static fromBase64(base64) {
      return Game.Deserializer.fromBitStream(new BitStreamReader(base64));
    }
  }

  constructor({ rule, dimension }) {
    this.rule = rule;
    this.field = new Field(dimension);
  }
}
