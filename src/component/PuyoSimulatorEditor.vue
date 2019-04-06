<template>
  <div class="editor">
    <PuyoPlayer :base64.sync="passBase64" :genBase64="genBase64" :editMode="true" :color="color"/>
    <div class="editor__control">
      <ul class="editor__color">
        <li v-for="i in colorList" :key="i" 
          @click="color = i"
          :class="[{'editor__color--active': color === i},'editor__color--' + i]"></li>
      </ul>
      <div class="editor__color">
        <input id="inputBase64" class="editor__base64" type="text" name="base64"
         :value="passBase64"/>
        <button class="editor__button" @click="genBase64+=1">Code</button>
        <button class="editor__button" @click="copyBase64()">Copy</button>
      </div>
    </div>
  </div>
</template>

<script>
  import PuyoPlayer from './PuyoSimulatorPlayer.vue';
  import Field from '../simulator/Field/Field.js';

  export default {
    components: {
      PuyoPlayer,
    },
    props: {
      base64:  {
        type: String,
        default: 'Aw////v+BIA='
      },
    },
    data() {
      return {
        minConnections: 4,
        fieldWidth: 6,
        fieldHeight: 12,
        fieldHidden: 1,
        passBase64: this.base64,
        genBase64: 0,
        color: 'EMPTY'
      };
    },
    computed: {
    },
    methods: {
      copyBase64() {
        document.getElementById('inputBase64').select();
        document.execCommand('copy');
      }
    },
    created() {
      this.colorList = [];
      Object.keys(Field.Object).forEach(element => {
        this.colorList.push(element);
      });
    }
  };
</script>

<style lang="scss" scoped>
$skin-block-size: 32px;
$skin-puyo-size: $skin-block-size * 2;
$editor-width: $skin-puyo-size * 6;
@mixin set-skin($x,$y) {
  background: url(/pic/skin.png) #{$skin-puyo-size * $x} #{$y * $skin-block-size};
}

.editor {
  display: flex;
  background-color: #24292E;
  max-width: 650px;
  padding: 1rem;
  &__color {
    display: flex;
    flex-wrap: wrap;
    max-width: $editor-width;
    justify-content: space-around;
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
    &--active {
      background-color: #666 !important;
    }
    &--RED {
      @include set-skin(0,-6);
    }
    &--GREEN {
      @include set-skin(-1,-6);
    }
    &--BLUE {
      @include set-skin(-2,-6);
    }
    &--YELLOW {
      @include set-skin(-3,-6);
    }
    &--PURPLE {
      @include set-skin(-4,-6);
    }
    &--NUISANCE {
      @include set-skin(-5,-6);
    }
    &--HARD_NUISANCE {
      @include set-skin(-6,-6);
    }
    &--BLOCK {
      @include set-skin(-7,-6);
    }
    &--IRON {
      @include set-skin(0,-8);
    }
    &--EMPTY {
      @include set-skin(-1,-8);
    }
  }
  &__base64 {
    font-size: 20px;
  }
  &__button {
    background-color: #151515;
    color: #ddd;
    padding: 2px;
    border-radius: 2px;
    border: #ddd solid 1px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
