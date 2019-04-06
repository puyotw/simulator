<template>
  <div id="simulator">
    <PuyoEditor :encoded="encoded"/>
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
        encoded: '',
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
