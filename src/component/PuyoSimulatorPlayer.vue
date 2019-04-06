<template>
  <div class="player">
    <PuyoField :base64.sync="passBase64" :genBase64="genBase64" :state.sync="state" :editMode="editMode" :color="color"/>
    <ul class="player__control">
      <li v-if="!playing" v-on:click.stop="play">
        <i class="fas fa-play"></i>
      </li>
      <li v-if="playing" v-on:click.stop="stop">
        <i class="fas fa-pause"></i>
      </li>
      <li v-on:click.stop="step">
        <i class="fas fa-step-forward"></i>
      </li>
      <li v-on:click.stop="reset">
        <i class="fas fa-fast-backward"></i>
      </li>
      <li v-if="!editMode"
        v-on:click.stop="openEditPage">
        <i class="fas fa-edit"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import PuyoField from './PuyoSimulatorField.vue';
  import { STATE_IDLE, STATE_PLAY, STATE_STEP, STATE_RESET } from '../simulator/Constant';

  export default {
    components: {
      PuyoField,
    },
    props: {
      base64:  {
        type: String,
        default: 'Aw////v+BIA='
      },
      genBase64: {
        type: Number,
        default: 0
      },
      editMode: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: 'EMPTY'
      },
    },
    data() {
      return {
        passBase64: this.base64,
        state: STATE_IDLE,
      };
    },
    watch: {
      passBase64() {
        this.$emit('update:base64', this.passBase64);
      }
    },
    computed: {
      playing() {
        return this.state === STATE_PLAY;
      }
    },
    methods: {
      play() {
        this.state = STATE_PLAY;
      },
      stop() {
        this.state = STATE_IDLE;
      },
      step() {
        this.state = STATE_STEP;
      },
      reset() {
        this.state = STATE_RESET;
      },
      openEditPage() {
        window.open('./?' + encodeURIComponent(this.passBase64), '_blank');
      }
    },
    created() {
      if (this.base64 === 'Aw////v+BIA=') {
        let params = (new URL(document.location)).search;
        var searchParams = new URLSearchParams(params);
        for (var key of searchParams.keys()) {
          this.passBase64 = key;
          break;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.player {
  background-color: #24292E;
  max-width: 256px;
  &__control {
    display: flex;
    justify-content: center;
    padding: 2px 0;
    li {
      width: 25%;
      background-color: #151515;
      color: #ddd;
      padding: 3px 0px;
      border-radius: 2px;
      border: #ddd solid 1px;
      text-align: center;
      cursor: pointer;
      margin: 0 2px;
      &:hover {
        background-color: #252525;
      }
    }
  }
}
</style>
