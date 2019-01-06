<template>
  <pre id="simulator">
{{ value }}
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

      Field.Object.NUISANCE = new Field.Object.Properties({symbol: 'O', adjacentCleared: () => Field.Object.EMPTY});
      Field.Object.HARD_NUISANCE = new Field.Object.Properties({symbol: 'O', adjacentCleared: () => Field.Object.NUISANCE});

      // random obejcts on the field
      for (let pos = new field.Positional; pos.valid; pos = pos.bottom.right)
        for (; pos.valid; pos = pos.above)
            pos.object = Field.Object[Object.keys(Field.Object)[Math.floor(Math.random() * Object.keys(Field.Object).length)]]

      // some examples how to use the field
      Field.Serializer.toBase64(field).then(console.log);

      return {
        value: Field.Serializer.toAsciiArt(field)
      }
    }
  }
</script>

<style>
</style>
