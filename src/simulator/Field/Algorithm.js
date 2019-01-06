/**
 * Find connected target objects in the given field.
 * @param {Field} field - the field to find connections in.
 * @param {[ Field.Object, ... ]} targetObjects - Array of kinds of Field objects to find connections for.
 * @param {Number} minConnected - the minimum size of connection to include in returned result.
 * @return {Map(Field.Object => [ [this.Positional, ... ], ... ])} 
 *         An Map from a Field.Object to an Array of subarrays, each of which contains positions
 *         that are connected. No one position can appear in two different subarrays.
 */
const findConnections = function(field, targetObjects, minConnection = 1) {
  let result = new Map(targetObjects.map(obj => [ obj, [] ]));

  // keeps track of all (visible) positions to be visited
  new Set(field.Positional.visible)
    // using "forEach" like "while set not empty",
    // i.e. "while there are more positions to visit"
    .forEach(function (primitivePosition, _, toVisit) {
      const position = new field.Positional({primitive: primitivePosition});
      const targetObject = position.object;

      if (!result.has(targetObject)) {
        // object here is not one of targetObjects, mark here as visited.
        // NOTE: in the other case, here is marked as visited in dfs
        toVisit.delete(position.valueOf());
        return;
      }

      let connected = [];

      // use dfs to find all connected targetObject
      (function dfs(position) {
        // this position has been visited before, ignoring
        if (!toVisit.has(position.valueOf())) return;
        // this position does not contain targetObject, ignoring
        if (targetObject !== position.object) return;

        // mark position as visited
        toVisit.delete(position.valueOf());

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
};

/**
 * Execute clearance on a collection of positionals.
 * @param {[Field.Positional, ...]} - an array of positionals pointing to 
 *                                    objects that are about to be cleared.
 */
const clearConnections = function(positionals) {
  for (const positional of positionals) {
    positional.object = positional.object.cleared(positional)
    for (const adjacent of positional.adjacent) {
      adjacent.object = adjacent.object.adjacentClear(adjacent);
    }
  }
}

export { findConnections, clearConnections }
