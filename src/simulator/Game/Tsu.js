import Game from './Game.js';           // inheritance
import Rule from './Rule.js';           // inheritance
import Field from '../Field/Field.js';  // Field.Algorithm, Field.Object
import Diff from '../Field/Diff.js';    // Diff.Type enum
import clamp from '../Tools/Clamp.js';

const RULE_KEYS = [
  'initialNuisanceRate', 
  'marginTime', 
  'minClearConnection', 
  'nuisanceTransformPoint', 
  'level'
];

const RULE_PARTITION_SIZES = [
  8, // classic max 255, modern max 990, partition max 255
  9, // classic max 992, modern max 256, partition max 510
  3, // classic max 72,  modern max ???, partition max 7
  8, // classic max 255, modern max 0,   partition max 255
  5, // max unknown, partition max 31 
];

const DEFAULT_RULE = {
  // common rule
  initialNuisanceRate: 70, marginTime: 96, minClearConnection: 4,
  // custom rule
  nuisanceTransformPoint: 0, level: 1
};



const DIMENSION_KEYS = [
  'columns', 'visibleRows', 'hiddenRows'
];

const DEFAULT_DIMENSION = {
  columns:      6,
  visibleRows: 12,
  hiddenRows:   1
};

const DIMENSION_PARTITION_SIZES = [
  5, // partition max 255
  5, // partition max 255
  2, // partition max 3
];

/**
 * Decorates the given game's field with convenience functions specific to the game.
 */
function decorateField(game) {
  /**
   * Pass through to Field.Algorithm.gravitationalDiff.
   */
  game.field.gravitate = function() {
    return Field.Algorithm.gravitationalDiff(this);
  };

  /**
   * Pass through to Field.Algorithm.findConnections, with targets and min
   * connection specified.
   */
  game.field.connections = function() {
    return Field.Algorithm.findConnections(this, {
      targetObjects: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'].map(key => Field.Object[key]),
      minConnection: game.rule.minClearConnection
    });
  };

  /**
   * Pass through to Field.Algorithm.clearingDiff.
   *
   * @param {decltype(Field.Algorithm.flattenConnectionMap(this.field.connections()))} 
   *        flattenedConnections = Field.Algorithm.flattenConnectionMap(this.field.connections())
   *        The flattened connection map storing Positionals to clear. May be specified
   *        if the flattened connection map was previously calculated.
   */
  game.field.clear = function(flattenedConnections = Field.Algorithm.flattenConnectionMap(this.connections())) {
    return Field.Algorithm.clearingDiff(flattenedConnections);
  };

  {
    let clone = game.field.clone;
    // decorate the default clone function, to add the above conveniences
    // functions to the cloned field as well.
    game.field.clone = function() {
      let cloned = clone.apply(this);
      cloned.gravitate = this.gravitate;
      cloned.connections = this.connections;
      cloned.clear = this.clear;
      cloned.clone = this.clone;
      return cloned;
    };
  }
}

export default class Tsu extends Game {
  static GAME_ID = 0;

  static Serializer = class {
    /**
     * Serializes the given game to the given bit output stream.
     *
     * Outputs header using the helper in Game.Serializer. Then outputs the
     * field.
     */
    static toBitStream(game, ostream) {

      Game.Serializer.headerToBitStream(ostream, {
        actualParams: [
          ...RULE_KEYS.map(k => game.rule[k]),
          ...DIMENSION_KEYS.map(k => game.field.dimension[k])
        ],
        defaultParams: [
          ...RULE_KEYS.map(k => DEFAULT_RULE[k]),
          ...DIMENSION_KEYS.map(k => DEFAULT_DIMENSION[k])
        ],
        partitionSizes: [...RULE_PARTITION_SIZES, ...DIMENSION_PARTITION_SIZES]
      });

      Field.Serializer.toBitStream(game.field, ostream);

      return ostream;
    }
  }

  static Deserializer = class {
    /**
     * Deserializes a Tsu game object from the given bit input stream.
     */
    static fromBitStream(istream) {
      let params = Game.Deserializer.headerFromBitStream(istream, {
        defaultParams: [
          ...RULE_KEYS.map(k => DEFAULT_RULE[k]),
          ...DIMENSION_KEYS.map(k => DEFAULT_DIMENSION[k])
        ],
        partitionSizes: [...RULE_PARTITION_SIZES, ...DIMENSION_PARTITION_SIZES]
      });

      let [rule, dimension] = Game.Deserializer.array2objects({ 
        array: params, 
        objectKeys: [RULE_KEYS, DIMENSION_KEYS]
      });

      let game = new Tsu({ rule: rule, dimension: dimension });
      Field.Deserializer.fromBitStream(game.field, istream);

      return game;
    }

    /**
     * Deserializes a Tsu game object given the field art and rule parameters.
     */
    static fromAsciiArt({ art, parameters }) {
      let game = new Tsu({ rule: parameters });
      game.field = Field.Deserializer.fromAsciiArt(art);
      decorateField(game);
      return game;
    }
  }

  static Rule = class extends Rule {
    /**
     * @param {Number} rule.initialNuisanceRate = 70 - refer to Game.Rule.
     * @param {Number} rule.marginTime = 96 - refer to Game.Rule.
     * @param {Number} rule.minClearConnection = 4 - refer to Game.Rule.
     * @param {Number} rule.nuisanceTransformPoint = 0 - points given when nuisance
     *                                                   transforms to other objects.
     * @param {Number} rule.level = 1 - usually a factor in Endless modes. Multiplier
     *                                  to transform points.
     */
    constructor(rule = DEFAULT_RULE) {
      super({
        initialNuisanceRate: +rule.initialNuisanceRate,
        marginTime: isNaN(rule.marginTime = parseInt(rule.marginTime)) ? null : rule.marginTime,
        minClearConnection: +rule.minClearConnection
      });
      this.nuisanceTransformPoint = +rule.nuisanceTransformPoint;
      this.level = +rule.level;
    }

    /**
     * Calculates the chain bonus for the given chain count.
     *
     * This bonus function is Type 2 in the classic Tsu game. There are 3 other
     * chain bonus functions but they are not used in modern games anymore.
     */
    chainBonus(chain) {
      return chain < 4 ? (chain - 1) * 8 : (chain - 3) * 32;
    }

    /**
     * Calculates the color bonus points given the color count.
     *
     * The bonus points can be summarized by the following table:
     * 
     * color | bonus
     * ------+------
     *   1   |   0
     *   2   |   3
     *   3   |   6 = 2 * 3
     *   4   |  12 = 2 * 6
     *   5   |  24 = 2 * 12
     */
    colorBonus(colorCount) {
      switch (Math.abs(colorCount)) {
        case 0: case 1: return 0;
        case 2:         return 3;
        default:        return 2 * this.colorBonus(colorCount - 1);
      }
    }

    /**
     * Calculates the group bonus points given the connection size.
     *
     * Calculation can be summarized by the following table:
     *
     * bonusConnection | bonus
     * ----------------+------
     *        0        |   0
     *        1        |   2 = 1 + 1
     *        2        |   3 = 2 + 1
     *       ...       |  ...
     *        6        |   7 = 6 + 1
     *       7+        |   10
     *
     * where bonusConnection is the number of objects cleared that is beyond
     * the minimum clear requirement, or beyond 4, whichever is greater.
     */
    groupBonus(groupSize) {
      let bonusConnection = groupSize - Math.min(this.minClearConnection, 4);
      if (bonusConnection == 0) return 0;
      else if (bonusConnection >= 7) return 10;
      else return bonusConnection + 1;
    }

    /**
     * Retrieves the transformation points added for the given diff.
     *
     * In Tsu, colored object transformations are worth 10 points. Additionally,
     * transforming nuisance may add bonus points if this.nuisanceTransformBonus
     * is not 0.
     */
    transformPoint(diff) {
      // no point should be given for non-transformations
      if (diff.type != Diff.Type.TRANSFORM) return 0;

      switch (diff.positional.object) {
        case Field.Object.RED:
        case Field.Object.YELLOW:
        case Field.Object.BLUE:
        case Field.Object.GREEN:
        case Field.Object.PURPLE:
          return 10;

        case Field.Object.HARD_NUISANCE:
          if (diff.newObject === Field.Object.EMPTY) {
            return this.nuisanceTransformPoint * 6;
          }

        // intentional fallthrough
        case Field.Object.NUISANCE:
          return this.nuisanceTransformPoint;
      }
    }

    /**
     * Calculates the points from a given clearance.
     *
     * Upon a clearance, a puyo game usually displays a product of two numbers.
     * The first number is the transformation point. Usually, points are given
     * for colored objects. Transforming nuisance may be awarded points if
     * this.nuisanceTransformPoint is not 0.
     *
     * The second number is the sum of bonus points, in the range [1, 999].
     * Bonus points are given depending on the chain, color count and the size
     * of each connection group.
     *
     * @param {Number} chain - 
     *                 the chain count of this clearance. Adds chain bonus.
     * @param {Map}    connectionMap - 
     *                 the connections of this clearance. Adds color bonus and
     *                 group bonus.
     * @param {[Diff]} transformDiffs - 
     *                 all transformations triggered by this clearance. Adds
     *                 colored object transform points and nuisance points.
     * @return {[Number, Number]}
     *         two numbers, the product of which is the points given for this
     *         clearance.
     */
    points({ chain, connectionMap, transformDiffs }) {
      const colorCount = Array.from(connectionMap.values())
                           .reduce((count, connections) => count + Math.min(1, connections.length), 0);
      const groupSizes = Array.from(connectionMap.values())
                           .reduce((sizes, connections) => sizes.concat(connections.map(connection => connection.length)), []);

      return [
               this.level * transformDiffs.reduce((sum, diff) => sum + this.transformPoint(diff), 0), 
               
               clamp(this.colorBonus(colorCount) + 
                     this.chainBonus(chain) +
                     groupSizes.reduce((sum, groupSize) => sum + this.groupBonus(groupSize), 0),
                     1, 999)
             ];
    }
  }

  constructor({ rule, dimension = DEFAULT_DIMENSION } = {}) {
    super({ rule: new Tsu.Rule(rule), dimension: dimension });

    decorateField(this);
  } 
}

Game.Modes[Tsu.GAME_ID] = Tsu;
