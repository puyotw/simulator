<template>
  <div id="simulator">
    <PuyoPlayer :base64="base64"/>
  </div>
</template>

<script>
  import PuyoPlayer from './component/PuyoSimulatorPlayer.vue';

  export default {
    components: {
      PuyoPlayer,
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
