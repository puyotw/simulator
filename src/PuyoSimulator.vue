<template>
  <pre id="simulator">
{{ field }}

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

      let keys = Object.keys(Field.Object);

      // random obejcts on the field
      for (let pos of field)
        pos.object = Field.Object[keys[Math.floor(Math.random() * keys.length)]]

      // some examples how to use the field
      Field.Serializer.toBase64(field).then(console.log);

      return {
        field: Field.Serializer.toAsciiArt(field),
        connections: Field.Algorithm.findConnections(field, {targetObjects: Object.values(Field.Object)})
      }
    }
  }
</script>

<style>
</style>
