<template>
  <div class="player">
    <PuyoField :base64="base64" :state.sync="state"/>
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
    </ul>
  </div>
</template>

<script>
  import PuyoField from './PuyoSimulatorField.vue';
  import { STATE_IDLE, STATE_PLAY, STATE_STEP, STATE_RESET } from './simulator/Constant';

  export default {
    components: {
      PuyoField,
    },
    props:{
      base64: String,
    },
    data() {
      return {
        state: STATE_IDLE,
      };
    },
    computed: {
      playing(){
        return this.state === STATE_PLAY;
      }
    },
    methods: {
      play(){
        this.state = STATE_PLAY;
      },
      stop(){
        this.state = STATE_IDLE;
      },
      step(){
        this.state = STATE_STEP;
      },
      reset(){
        this.state = STATE_RESET;
      }
    }
  };
</script>

<style lang="scss" scoped>
.player{
  background-color: #24292E;
  &__control{
    display: flex;
    justify-content: center;
    li{
      width: 25%;
      background-color: #151515;
      color: #ddd;
      padding: 3px 0px;
      border-radius: 2px;
      border: #ddd solid 1px;
      text-align: center;
      cursor: pointer;
      margin: 0 2px;
      &:hover{
        background-color: #252525;
      }
    }
  }
}
</style>
