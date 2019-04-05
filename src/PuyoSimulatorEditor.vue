<template>
  <div class="editor">
    <PuyoPlayer :base64="base64" :editor="true" :color="color"/>
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
    props: {
      base64: String,
    },
    data() {
      return {
        minConnections: 4,
        fieldWidth: 6,
        fieldHeight: 12,
        fieldHidden: 1,
        color: null ,
      };
    },
    computed: {
    },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>
$skin-block-size: 32px;
$skin-puyo-size: $skin-block-size * 2;

@mixin set-skin($x,$y) {
  background: url(/pic/skin.png) #{$skin-puyo-size * $x} #{$y * $skin-block-size};
}

.editor {
  display: flex;
  background-color: #24292E;
  &__color {
    display: flex;
    li {
      width: $skin-puyo-size;
      padding-bottom: $skin-puyo-size;
      margin: 5px;
      border-radius: 5px;
      border: #ddd solid 1px;
      background-color: #333;
      cursor: pointer;
      &:hover {
        background-color: #555;
      }
    }
    &--red {
      @include set-skin(0,-5);
    }
    &--green {
      @include set-skin(-1,-5);
    }
    &--blue {
      @include set-skin(-2,-5);
    }
    &--yellow {
      @include set-skin(-3,-5);
    }
    &--purple {
      @include set-skin(-4,-5);
    }
  }
}
</style>
