<template>
  <div id="simulator">
    <PuyoEditor :base64="base64"/>
  </div>
</template>

<script>
  import PuyoEditor from './component/PuyoSimulatorEditor.vue';

  export default {
    components: {
      PuyoEditor,
    },
    data() {
      return {
        base64: 'Aw////v+BIA=',
      };
    }
  };
</script>

<style>
html, body {
  margin: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
