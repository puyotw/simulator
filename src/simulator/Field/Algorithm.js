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
   * @return {Map(Field.Object => [ [this.Positional, ... ], ... ])} 
   *         A Map from a Field.Object to an Array of subarrays, each of which contains
   *         positions that are connected. No one position can appear in two different
   *         subarrays.
   */
  static findConnections(field, {targetObjects, minConnection = 1, onlyVisible = true}) {
    let result = new Map(targetObjects.map(obj => [ obj, [] ]));
  
    // keeps track of all positions to be visited
    new Set([...Array(field.dimension.rows * field.dimension.columns).keys()])
      // using "forEach" like "while set not empty",
      // i.e. "while there are more positions to visit"
      .forEach(function (primitivePosition, _, toVisit) {
        const position = new field.Positional({primitive: primitivePosition});
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
   * Execute clearance on an iterable of positionals. This mutates the underlying 
   * field(s) that the positionals belong to.
   *
   * Technically, the positionals can come from different fields.
   *
   * @param {[Field.Positional, ...]} - an array of positionals pointing to 
   *                                    objects that are about to be cleared.
   */
  static clearConnections(positionals) {
    for (const pos of positionals) {
      pos.object = pos.object.cleared(pos)
      for (const adj of pos.adjacent) {
        if (adj.valid) adj.object = adj.object.adjacentCleared(adj);
      }
    }
  }
}
