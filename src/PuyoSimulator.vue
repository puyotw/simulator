<template>
  <div id="simulator">
    <PuyoEditor :base64="base64"/>
    <pre>
original field:
{{ field }}

decoded field from Ascii:
{{ asciiField }}

Ascii base64 field:
{{ asciiBase64 }}

base64 field:
{{ base64 }}

decoded field:
{{ decoded }}

decoded field margin time setting is null:
{{ noMarginTime }}

final field:
{{ final }}

points:
{{ points }}

with margin time = null, nuisance multiplier after 500 sec:
{{ multiplier }}
    </pre>
  </div>
</template>

<script>
  import PuyoEditor from './component/PuyoSimulatorEditor.vue';
  import Tsu from './simulator/Game/Tsu.js';
  import Game from './simulator/Game/Game.js';
  import Field from './simulator/Field/Field.js';

  export default {
    components: {
      PuyoEditor,
    },
    data() {
      let game = new Tsu;
      game.rule.marginTime = null;
      let field = game.field;

      let keys = ['RED', 'YELLOW', 'BLUE', 'GREEN', 'PURPLE',
                  'EMPTY'];
      let gtr = [0, 3, 3, 1, 1, 3, 5, 5, 5, 5, 5, 5, 5,
                 0, 3, 0, 1, 0, 1, 5, 5, 5, 5, 5, 5, 5,
                 2, 0, 2, 0, 0, 3, 0, 5, 5, 5, 5, 5, 5,
                 3, 2, 1, 2, 3, 1, 3, 5, 5, 5, 5, 5, 5,
                 3, 2, 3, 1, 2, 1, 3, 5, 5, 5, 5, 5, 5,
                 1, 3, 1, 2, 2, 1, 5, 1, 5, 5, 5, 5, 5];
      // GTR on the field
      let iter = 0;
      for (let pos of field) {
        pos.object = Field.Object[keys[gtr[iter]]];
        iter++;
      }

      let initial = field.clone();
      let asciiDecoded = Game.Deserializer.fromAsciiArt({
        art: Field.Serializer.toAsciiArt(initial),
        parameters: { mode: 0, marginTime: null }
      });
      let asciiBase64 = Game.Serializer.encode(asciiDecoded);
      let base64 = Game.Serializer.encode(game);
      let decoded = Game.Deserializer.fromEncoded(base64);

      let points = 0;

      for (let chain = 1; diff === undefined || diff.length > 0; ++chain) {
        
        field.gravitate().apply();

        let connections = field.connections();
        var diff = field.clear(Field.Algorithm.flattenConnectionMap(connections));

        let [base, bonus] = game.rule.points({
            chain: chain,
            connectionMap: connections,
            transformDiffs: diff
        });

        points += base * bonus;

        diff.apply();
      }

      return {
        field: Field.Serializer.toAsciiArt(initial),
        asciiField: Field.Serializer.toAsciiArt(asciiDecoded.field),
        asciiBase64: asciiBase64,
        base64: base64,
        decoded: Field.Serializer.toAsciiArt(decoded.field),
        final: Field.Serializer.toAsciiArt(field),
        points: points,
        multiplier: game.rule.nuisanceRateMultiplier({ time: 500 }),
        noMarginTime: decoded.rule.marginTime === null
      };
    }
  };
</script>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
