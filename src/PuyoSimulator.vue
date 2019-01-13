<template>
  <pre id="simulator">
original field:
{{ field }}

gravitated field:
{{ gravitated }}

cleared field:
{{ cleared }}

cleared field then gravitated:
{{ clearedGravitated }}

connections in gravitated original field:
{{ connections }}
  </pre>
</template>

<script>
  import { Field } from './simulator/Field/Field.js'

  export default {
    data() {
      let field = new Field;

      Field.Object.RED = new Field.Object.Properties({symbol: 'R', cleared: () => Field.Object.EMPTY});
      Field.Object.YELLOW = new Field.Object.Properties({symbol: 'Y', cleared: () => Field.Object.EMPTY});
      Field.Object.BLUE = new Field.Object.Properties({symbol: 'B', cleared: () => Field.Object.EMPTY});
      Field.Object.GREEN = new Field.Object.Properties({symbol: 'G', cleared: () => Field.Object.EMPTY});
      Field.Object.PURPLE = new Field.Object.Properties({symbol: 'P', cleared: () => Field.Object.EMPTY});

      Field.Object.BLOCK = new Field.Object.Properties({symbol: 'X', gravityImmune: true});
      Field.Object.IRON = new Field.Object.Properties({symbol: 'x'});

      Field.Object.NUISANCE = new Field.Object.Properties({symbol: 'o', adjacentCleared: () => Field.Object.EMPTY});
      Field.Object.HARD_NUISANCE = new Field.Object.Properties({symbol: 'O', adjacentCleared: () => Field.Object.NUISANCE});

      // for simplicity, only put these objects into our random field,
      // EMPTY is more likely to appear in field since it appears more in here
      let keys = ['RED', 'YELLOW', 'HARD_NUISANCE', 'BLOCK',
                  'EMPTY', 'EMPTY', 'EMPTY'];

      // random obejcts on the field
      for (let pos of field)
        pos.object = Field.Object[keys[Math.floor(Math.random() * keys.length)]]

      // some examples how to use the field
      Field.Serializer.toBase64(field).then(console.log);

      // applies gravity to original field
      let gravitated = field.clone().gravitate();
      // prepares a new field to execute clearance on
      let cleared = gravitated.clone();

      // find RED connections >= 3 in gravitated field
      let connections = Field.Algorithm.findConnections(cleared, {
          // only find RED connections
          targetObjects: [Field.Object.RED],
          // find connections >= 3
          minConnection: 3
      });
      
      // a convenience flatten function to flatten connections map
      let flatten = arrs => arrs.reduce((acc, arr) => acc.concat(arr), []);
      let flattenedConnections = flatten(flatten(Array.from(connections.values())));
        
      // execute clearance, modifies `cleared`
      Field.Algorithm.clearConnections(flattenedConnections);

      return {
        field: Field.Serializer.toAsciiArt(field),
        connections: connections,
        gravitated: Field.Serializer.toAsciiArt(gravitated),
        cleared: Field.Serializer.toAsciiArt(cleared),
        clearedGravitated: Field.Serializer.toAsciiArt(cleared.gravitate()),
      }
    }
  }
</script>

<style>
</style>
