<template>
  <div class="editor">
    <PuyoPlayer :base64="base64"/>
    <div class="editor__control">
      <ul class="editor__color">
        <li class="editor__color--red"></li>
        <li class="editor__color--green"></li>
        <li class="editor__color--blue"></li>
        <li class="editor__color--yellow"></li>
        <li class="editor__color--purple"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PuyoPlayer from './PuyoSimulatorPlayer.vue';

  export default {
    components: {
      PuyoPlayer,
    },
    props:{
      base64: String,
    },
    data() {
      return {
        minConnections: 4,
      };
    },
    computed: {
    },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>
.editor{
  display: flex;
  background-color: #24292E;
  &__color{
    display: flex;
    li{
      width: 64px;
      padding-bottom: 64px;
      margin: 5px;
      border-radius: 5px;
      border: #ddd solid 1px;
      background-color: #333;
      cursor: pointer;
      &:hover{
        background-color: #555;
      }
    }
    &--red{
      background: url(/pic/skin.png) 0px -160px;
    }
    &--green{
      background: url(/pic/skin.png) -64px -160px;
    }
    &--blue{
      background: url(/pic/skin.png) -128px -160px;
    }
    &--yellow{
      background: url(/pic/skin.png) -192px -160px;
    }
    &--purple{
      background: url(/pic/skin.png) -256px -160px;
    }
  }
}
</style>
