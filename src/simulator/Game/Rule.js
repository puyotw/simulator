/**
 * Encapsulates the algorithm of updating nuisance rate into a generator.
 */
class NuisanceRateGenerator {
  #initialRate;

  constructor(initialRate) {
    this.#initialRate = initialRate;
  }

  #update = rate => Math.trunc(rate / 2);

  /**
   * The nuisance rate alternates between two pools. The first pool's initial
   * value is the initial nuisance rate, while the second pool's initial value
   * is the 3 quarters of the initial nuisance rate. Before margin time begins,
   * the rate is the current value in pool 1. Afterwards, the nuisance rate
   * switches pools and is halved every update, until the rate reaches its
   * minimum of 1, or a total of 14 times nuisance rate has changed, whichever
   * is sooner.
   */
  *[Symbol.iterator]() {
    // the factors of initial values of nuisance rates in the respective pools
    const POOL_0_FACTOR = 1;
    const POOL_1_FACTOR = 3 / 4;

    // maximum number of times to update nuisance rate
    const MAX_UPDATE_COUNT = 14;

    let ratePool = [ this.#initialRate * POOL_0_FACTOR, 
                     this.#initialRate * POOL_1_FACTOR ];

    for (let updateCount = 0; updateCount <= MAX_UPDATE_COUNT; ++updateCount) {
      const pool = updateCount % ratePool.length;

      yield ratePool[pool];
      ratePool[pool] = this.#update(ratePool[pool]);

      // after updating, rate becomes 0, so it was at its minimum of 1 before
      if (ratePool[pool] <= 0) return;
    }
  }
}

/**
 * Represents common elements of a Puyo game rule, and convenience functions
 * based on the given rule.
 */
export default class Rule {
  /**
   * Consturcts a Rule object.
   *
   * @param {Number} initialNuisanceRate - the initial rate to convert points to
   *                                       nuisance count.
   * @param {Number} marginTime - time in seconds after which attack power
   *                              intensifies. The exact intensification rule
   *                              is defined by the game mode.
   *                              May be undefined, in which case the margin time
   *                              power intensification never applies.
   * @param {Number} minClearConnection - the minimum size of connection that
   *                                      triggers clearance.
   */
  constructor({ initialNuisanceRate, marginTime, minClearConnection }) {
    this.initialNuisanceRate = initialNuisanceRate;
    this.marginTime = marginTime;
    this.minClearConnection = minClearConnection;
  }

  /**
   * Converts points to nuisance count.
   *
   * @param {Number} point - points to convert to nuisance count from.
   * @param {Number} time - seconds that the game has passed. Used to factor in
   *                        margin time.
   * @return {[Number, Number]} A array of two Numbers, where the first Number
   *                            is the nuisance count, and the second Number is
   *                            the remainder of point divided by nuisance rate.
   */
  nuisanceCount({ point, time = 0 }) {
    const adjustedRate = this.nuisanceRate({ time: time });
    return [ 
      Math.floor(point / adjustedRate),
      point % adjustedRate
    ];
  }

  /**
   * Retrieves the nuisance rate with margin time factored in, given the time
   * in seconds the game has passed.
   *
   * The nuisance rate algorithm is usually common across different game modes,
   * but subclassed game modes may override this method to apply their own
   * margin time algorithm.
   *
   * @param {Number} time = 0 - seconds that the game has passed.
   * @return {Number} the nuisance rate with margin time factored in.
   */
  nuisanceRate({ time = 0 }) {
    // update of nuisance rate happens every 16 seconds
    const UPDATE_RATE = 16;

    time -= this.marginTime;

    for (var rate of new NuisanceRateGenerator(this.initialNuisanceRate)) {
      if (time < 0) break;
      time -= UPDATE_RATE;
    }

    return rate;
  }

  /**
   * Returns the nuisance rate multiplier given the time in seconds that the
   * game has passed. This should only be used for display purpose because
   * the initial nuisance rate may not be divisible by actual nuisance rate,
   * causing rounding errors.
   *
   * @return {Number} the quotient of initial nuisance rate divided by actual
   *                  nuisance rate after applying margin time.
   */
  nuisanceRateMultiplier({ time = 0 }) {
    return this.initialNuisanceRate / this.nuisanceRate({ time: time });
  }
}
