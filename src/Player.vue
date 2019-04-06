<template>
  <div id="simulator">
    <PuyoPlayer :encoded="encoded"/>
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
