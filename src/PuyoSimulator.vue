<template>
  <pre id="simulator">
original field:
{{ field }}

base64: {{ base64 }}

decoded field from base64:
{{ decoded }}

gravitated field:
{{ gravitated }}

cleared field:
{{ cleared }}

connections in gravitated original field:
{{ connections }}

gravitational diff:
{{ gravDiff }}
  </pre>
</template>

<script>
  import Field from './simulator/Field/Field.js';
  import BitStreamReader from './simulator/Tools/BitStreamReader.js';

  export default {
    data() {
      let field = new Field;

      Field.Object.RED = new Field.Object.Properties({symbol: 'R', cleared: () => Field.Object.EMPTY});
      Field.Object.YELLOW = new Field.Object.Properties({symbol: 'Y', cleared: () => Field.Object.EMPTY});
      Field.Object.BLUE = new Field.Object.Properties({symbol: 'B', cleared: () => Field.Object.EMPTY});
      Field.Object.GREEN = new Field.Object.Properties({symbol: 'G', cleared: () => Field.Object.EMPTY});
      Field.Object.PURPLE = new Field.Object.Properties({symbol: 'P', cleared: () => Field.Object.EMPTY});

      Field.Object.BLOCK = new Field.Object.Properties({symbol: '=', gravityImmune: true});
      Field.Object.IRON = new Field.Object.Properties({symbol: '-'});

      Field.Object.NUISANCE = new Field.Object.Properties({symbol: 'o', adjacentCleared: () => Field.Object.EMPTY});
      Field.Object.HARD_NUISANCE = new Field.Object.Properties({symbol: 'O', adjacentCleared: () => Field.Object.NUISANCE});

      // for simplicity, only put these objects into our random field,
      // EMPTY is more likely to appear in field since it appears more in here
      let keys = ['RED', 'YELLOW', 'HARD_NUISANCE',
                  'EMPTY', 'EMPTY', 'EMPTY'];

      // random obejcts on the field
      for (let pos of field)
        pos.object = Field.Object[keys[Math.floor(Math.random() * keys.length)]]

      // find base64 encoding
      let base64 = Field.Serializer.toBitStream(field).finalize();
      
      // try to decode from base64, see if they match?
      let decoded = Field.Deserializer.fromBitStream(new BitStreamReader(base64));

      // applies gravity to original field
      let gravitated = field.clone();
      let gravitationalDiff = Field.Algorithm.gravitationalDiff(gravitated);
      gravitationalDiff.apply();

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
        
      // execute clearance
      Field.Algorithm.clearingDiff(flattenedConnections)
                     .forEach(diff => diff.apply());

      return {
        field: Field.Serializer.toAsciiArt(field),
        base64: base64,
        decoded: Field.Serializer.toAsciiArt(decoded),
        connections: connections,
        gravitated: Field.Serializer.toAsciiArt(gravitated),
        cleared: Field.Serializer.toAsciiArt(cleared),
        gravDiff: gravitationalDiff,
      }
    }
  }
</script>

<style>
</style>
