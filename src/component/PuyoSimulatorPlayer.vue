<template>
  <div class="player">
    <PuyoField :encoded.sync="passEncoded" :state.sync="state" :editMode="editMode" :color="color"/>
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
      encoded:  {
        type: String,
        default: ''
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
        passEncoded: this.encoded,
        state: STATE_IDLE,
      };
    },
    watch: {
      passEncoded() {
        this.$emit('update:encoded', this.passEncoded);
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
        window.open('./?' + encodeURIComponent(this.passEncoded), '_blank');
      }
    },
    created() {
      let params = (new URL(document.location)).search;
      var searchParams = new URLSearchParams(params);
      for (var key of searchParams.keys()) {
        this.passEncoded = key;
        break;
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
    padding: 3px 0;
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
