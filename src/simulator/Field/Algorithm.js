import Diff from './Diff.js';
import FieldObject from './FieldObject.js';

export default class Algorithm {
  /**
   * Find connected target objects in the given field.
   *
   * @param {Field} field - the field to find connections in.
   * @param {[ Field.Object, ... ]} targetObjects - Array of kinds of Field objects to 
   *                                                find connections for.
   * @param {Number} minConnected = 1 - the minimum size of connection to include in
   *                                    returned result.
   * @param {Boolean} onlyVisible = true - if true, does not return any hidden positional.
   *
   * @return {Map(Field.Object => [ [ Field.Positional... ]... ], ...)} 
   *         A Map from a Field.Object to an Array of subarrays, each of which contains
   *         positions that are connected. No one position can appear in two different
   *         subarrays.
   */
  static findConnections(field, { targetObjects, minConnection = 1, onlyVisible = true }) {
    let result = new Map(targetObjects.map(obj => [ obj, [] ]));
  
    // keeps track of all positions to be visited
    new Set([...Array(field.dimension.rows * field.dimension.columns).keys()])
      // using "forEach" like "while set not empty",
      // i.e. "while there are more positions to visit"
      .forEach(function (primitivePosition, _, toVisit) {
        const position = new field.Positional({ primitive: primitivePosition });
        const targetObject = position.object;
  
        if (// position is in one of the hidden rows, and user says find only visible ones
            (onlyVisible && position.hidden) || 
            // object at position is not one of targetObjects
            !result.has(targetObject)
        ) {
          // mark here as visited, and do nothing with it
          // NOTE: in the other case, here is marked as visited in dfs
          toVisit.delete(position.primitive);
          return;
        }
  
        let connected = [];
  
        // use dfs to find all connected targetObject
        (function dfs(position) {
          // this position has been visited before, ignoring
          if (!toVisit.has(position.primitive)) return;
          // this position does not contain targetObject, ignoring
          if (targetObject !== position.object) return;
  
          // mark position as visited
          toVisit.delete(position.primitive);
  
          // this position contains the target field object,
          // include it in the connected result
          connected.push(position);
  
          // look in adjacent positions, include them in the connected array as well if 
          // they contain the same field object
          position.adjacent.forEach(dfs);
        })(position);
  
        if (connected.length >= minConnection) {
          result.get(targetObject).push(connected);
        }
      });
  
    return result;
  }
  
  /**
   * A convenience flatten function to flatten the connections map returned by
   * Field.Algorithm.findConnections, such that the array elements are Field.
   * Positional objects that can be the argument to Field.Algorithm.clearingDiff.
   *
   * @param {Map(Field.Object => [ [ Field.Positional... ]... ], ...)} map -
   *        A connection map returned from Field.Algorithm.findConnections.
   * @return {Array(Positional, ...)}
   */
  static flattenConnectionMap(map) {
    let flatten = arrs => arrs.reduce((acc, arr) => acc.concat(arr), []);
    
    return flatten(flatten(Array.from(map.values())));
  }
  /**
   * Computes the diffs such that, if applied, the given positionals are
   * cleared from the field. 
   *
   * If the clearance does not trigger any change to an object, e.g. if
   * the object clears and transforms back to itself, then the result is
   * not included in the resultant Diff array. It also finds diffs
   * triggered by adjacent clearance, so the resultant array may include
   * positionals that are not one of the ones passed in.
   *
   * This does not mutate the field; One must call Diff.prototype.apply
   * to apply the changes.
   *
   * All Diff objects are of type Diff.Type.TRANSFORM.
   *
   * @param {[Field.Positional, ...]} - an array of positionals pointing to 
   *                                    objects that are about to be cleared.
   * @return {Diff.Collection([Diff, ...])} A Collection of Diff objects to clear.
   */
  static clearingDiff(positionals) {
    let diffs = new Map;
    
    /**
     * Helper to push a result into the diffs Map. Does not push if object
     * didn't actually change. 
     */
    const pushDiff = function(pos, transform = obj => obj.cleared(pos)) {
      if (!pos.valid) return;

      // if some transformation has already happened on this position before,
      // we should start from what it has transformed to, not from pos.object
      let intermediateObject = diffs.has(pos.primitive) ? diffs.get(pos.primitive).newObject
                                                        : pos.object;
      let newObject = transform(intermediateObject);
      if (intermediateObject === newObject) return;

      diffs.set(pos.primitive, new Diff({
        type: Diff.Type.TRANSFORM,
        positional: pos,
        argument: newObject
      }));
    };

    for (const pos of positionals) {
      pushDiff(pos);
      for (const adj of pos.adjacent) {
        pushDiff(adj, obj => obj.adjacentCleared(adj));
      }
    }

    return new Diff.Collection(...diffs.values());
  }

  /**
   * Computes the difference between field1 and field2. field1 and field2 must
   * have the same dimensions.
   *
   * @param {Field} field1 - the "from" field.
   * @param {Field} field2 - the "to" field.
   *
   * @return {Diff.Collection([Diff, ...])} 
   *         - A Collection of Diff objects that apply to field1, such that
   *           field1 becomes field2. All Diffs objects are of type TRANSFORM;
   *         - undefined if field1 and field2 don't have the same dimensions.
   */
  static diff(field1, field2) {
    let [dimen1, dimen2] = [field1.dimension, field2.dimension];

    // field1 and field2 must have the same dimensions
    if (dimen1.columns     !== dimen2.columns     ||
        dimen1.visibleRows !== dimen2.visibleRows ||
        dimen1.hiddenRows  !== dimen2.hiddenRows    ) return undefined;

    let result = new Diff.Collection;
    for (let [pos1, pos2] = [new field1.Positional, new field2.Positional];
         pos1.valid;
         [pos1, pos2] = [pos1.right.bottom, pos2.right.bottom]
    ) {
      for (; pos1.valid; [pos1, pos2] = [pos1.above, pos2.above]) {
        if (pos1.object !== pos2.object) {
          result.push(new Diff({
            type: Diff.Type.TRANSFORM,
            positional: pos1,
            argument: pos2.object
          }));
        }
      }
    }

    return result;
  }

  /**
   * Computes the diffs of one field such that, if applied, causes gravity-
   * vulnerable objects to fall. This does not mutate the given field; one
   * must call Diff.prototype.apply to mutate the field.
   *
   * Diff objects in the resultant array are of type Diff.Type.EXCHANGE.
   *
   * @param {Field} field - the field to apply gravity to.
   * @return {Diff.Collection([Diff, ...])} A Collection of Diff objects.
   */
  static gravitationalDiff(field) {
    let result = new Diff.Collection;

    // since we are not modifying field in place, we need to keep track of
    // changes made so far
    let aux = new Map;

    // 2-pointer comparison approach:
    // pointer 1(p1) iterates through whole column, 
    // pointer 2(p2) points to either an EMPTY slot or the same slot as p1;
    //
    // for each column, p1 inspects every slot from bottom up, 
    //                  p2 has to exchange with p1 if p1 contains an object, 
    //                  p2 then changes to point at one slot up
    for (let [p1, p2] = [new field.Positional, new field.Positional]; 
         p1.valid; 
         [p1, p2] = [p1.right.bottom, p2.right.bottom]) {
      for (; p1.valid; p1 = p1.above) {
        const p1Obj = aux.get(p1.primitive) || p1.object;
        const p2Obj = aux.get(p2.primitive) || p2.object;

        if (p1Obj === FieldObject.EMPTY) continue;

        // for gravity-immune objects, nothing should fall below them,
        // equate p2 and p1, as if p1 and p2 were the bottom of the field
        if (p1Obj.gravityImmune) p2.row = p1.row;

        if (p1Obj !== p2Obj) {
          // objects in p1 and p2 are different and need to exchange,
          result.push(new Diff({
            type: Diff.Type.EXCHANGE,
            positional: p1,
            argument: p2
          }));

          // log this change in auxilliary map
          aux.set(p1.primitive, p2Obj);
          aux.set(p2.primitive, p1Obj);
        }

        // move p2 up one slot
        p2 = p2.above;
      }
    }

    return result;
  }
}
