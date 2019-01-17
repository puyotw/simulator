<template>
  <div>
    <div id="puyostage"></div>
    <button v-on:click.stop="play">PLAY</button>
    <button v-on:click.stop="step">STEP</button>
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js';
  import { TimelineMax } from 'gsap/TweenMax';
  import PixiPlugin from 'gsap/PixiPlugin'; // eslint-disable-line no-unused-vars
  import Field from './simulator/Field/Field.js';
  import BitStreamReader from './simulator/Tools/BitStreamReader.js';
  import { BLOCK_WIDTH, RECOVER_FRAME } from './simulator/Constant';

  export default {
    name: 'PuyoSim',
    data() {
      return {
        app: null,
        field: null,
        pixifield: null,
        playable: true,
      };
    },
    props:{
      base64: String,
      minConnection: Number,
    },
    methods: {
      timelinePromise(timeline, diff, state) {
        return new Promise((resolve) => {
            timeline.play();
            timeline.eventCallback('onComplete', () => {
              if (state === 'gravity') {
                this.setpuyo(diff.otherPositional.object, diff.otherPositional.row, diff.otherPositional.column, diff.otherPositional.connections);
              }
              resolve();
            });
        });
      },
      async step(){
        if (!this.playable) {
          return;
        }
        let condition = this.playable;
        this.playable = false;
        condition = await this.gravity() || await this.clear();
        this.playable = condition;
      },
      async play(){
        if (!this.playable) {
          return;
        }
        let condition = this.playable;
        this.playable = false;
        while (condition) {
          condition = await this.gravity() || await this.clear();
        }
        this.playable = condition;
      },
      async gravity(){
        let tl_arr = [];
        // get diff
        let gravitationalDiff = Field.Algorithm.gravitationalDiff(this.field);
        if (gravitationalDiff.length === 0){
          return false;
        }
        for (let diff of gravitationalDiff){
          // create drop animation timeline
          let tl = new TimelineMax({ paused: true });
          this.setpuyo(diff.positional.object, diff.positional.row, diff.positional.column, 0);
          tl.to(
            this.pixifield[diff.positional.row][diff.positional.column],
            RECOVER_FRAME[diff.positional.row - diff.otherPositional.row] / 60,
            { pixi:{ y:(this.field.dimension.rows - diff.otherPositional.row - 1) * BLOCK_WIDTH },
             ease:'Linear' }
          ).to(
            this.pixifield[diff.positional.row][diff.positional.column],
            0.1, 
            {
              pixi:{ scaleY:0.8 },
            }
          ).to(
            this.pixifield[diff.positional.row][diff.positional.column],
            0.1, 
            {
              pixi:{ scaleY:1 },
              yoyo: true
            }
          );
          this.pixifield[diff.otherPositional.row][diff.otherPositional.column] = this.pixifield[diff.positional.row][diff.positional.column];
          this.pixifield[diff.positional.row][diff.positional.column] = null;
          tl_arr.push([tl, diff]);
        }
        gravitationalDiff.apply();
        // map async functions
        const drop_animation = tl_arr.map(async (obj) => this.timelinePromise(obj[0], obj[1], 'gravity'));
        // wait all timelines completed
        await Promise.all(drop_animation).then(() => {
          // check puyo connections
          this.loadpuyo(false);
        });
        return true;
      },
      async clear(){
        let tl_arr = [];
        // set connections
        let connections = Field.Algorithm.findConnections(this.field, {
            targetObjects: [Field.Object.RED, Field.Object.BLUE, Field.Object.GREEN, Field.Object.YELLOW, Field.Object.PURPLE],
            minConnection: this.minConnection
        });
        let flatten = arrs => arrs.reduce((acc, arr) => acc.concat(arr), []);
        let flattenedConnections = flatten(flatten(Array.from(connections.values())));
        if (flattenedConnections.length === 0) {
          return false;
        }
        Field.Algorithm.clearingDiff(flattenedConnections).forEach(diff => {
          // create timeline
          let tl = new TimelineMax({ paused: true });
          tl.to(
            this.pixifield[diff.positional.row][diff.positional.column],
            0.1, 
            { pixi:{ alpha:0.5 }, repeat:5, yoyo:true, onComplete:()=>{
              // remove sprite when clear animation complete
              this.app.stage.removeChild(this.pixifield[diff.positional.row][diff.positional.column]);
              this.pixifield[diff.positional.row][diff.positional.column] = null;
              }
            },
          );
          tl_arr.push([tl, diff]);
          diff.apply();
        });
        // map async functions
        const clear_animation = tl_arr.map(async (obj) => { return this.timelinePromise(obj[0], obj[1], 'clear'); });
        // wait all timelines completed
        await Promise.all(clear_animation);
        return true;
      },
      loadbg(){
        let bgtex = PIXI.loader.resources['pic/bg.json'].textures;
        // set background
        let bg = new PIXI.extras.TilingSprite(
            bgtex['bg'],
            this.app.screen.width,
            this.app.screen.height
        );
        this.app.stage.addChild(bg);
        let bgleft = new PIXI.extras.TilingSprite(
            bgtex['bgleft'],
            48,
            this.app.screen.height
        );
        this.app.stage.addChild(bgleft);
        let bgtop = new PIXI.extras.TilingSprite(
            bgtex['bgtop'],
            this.app.screen.width,
            48
        );
        this.app.stage.addChild(bgtop);
        let pole1_left = new PIXI.extras.TilingSprite(
            bgtex['pole1'],
            BLOCK_WIDTH,
            this.app.screen.height
        );
        pole1_left.y = this.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.app.stage.addChild(pole1_left);
        let pole1_right = new PIXI.extras.TilingSprite(
            bgtex['pole1'],
            BLOCK_WIDTH,
            this.app.screen.height
        );
        pole1_right.x = this.app.screen.width - BLOCK_WIDTH;
        pole1_right.y = this.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.app.stage.addChild(pole1_right);
        let pole0_left = new PIXI.Sprite(bgtex['pole0']);
        pole0_left.y = this.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.app.stage.addChild(pole0_left);
        let pole0_right = new PIXI.Sprite(bgtex['pole0']);
        pole0_right.x = this.app.screen.width - BLOCK_WIDTH;
        pole0_right.y = this.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.app.stage.addChild(pole0_right);
        let block = new PIXI.extras.TilingSprite(
            bgtex['block'],
            this.field.dimension.columns * BLOCK_WIDTH,
            BLOCK_WIDTH
        );
        block.x = BLOCK_WIDTH;
        block.y = this.app.screen.height - BLOCK_WIDTH;
        this.app.stage.addChild(block);
      },
      loadpuyo(init = true){
        // set puyo
        for (let pos of this.field){
          if (init && pos.object !== Field.Object.EMPTY) {
            // new Sprite object
            this.pixifield[pos.row][pos.column] = new PIXI.Sprite();
          }
          this.setpuyo(pos.object, pos.row, pos.column, pos.connections);
        }
      },
      setpuyo(obj, row, col, connections){
        let skintex = PIXI.loader.resources['pic/skin.json'].textures;
        let thisPuyo = this.pixifield[row][col];
        if (!thisPuyo) {
          return;
        }
        switch (obj) {
          case Field.Object.RED:
            thisPuyo.texture = skintex[`red${connections}`];
            break;
          case Field.Object.GREEN:
            thisPuyo.texture = skintex[`green${connections}`];
            break;
          case Field.Object.BLUE:
            thisPuyo.texture = skintex[`blue${connections}`];
            break;
          case Field.Object.YELLOW:
            thisPuyo.texture = skintex[`yellow${connections}`];
            break;
          case Field.Object.PURPLE:
            thisPuyo.texture = skintex[`purple${connections}`];
            break;
          default:
            break;
        }
        thisPuyo.x = (col + 1) * BLOCK_WIDTH;
        thisPuyo.y = (this.field.dimension.rows - row - 1) * BLOCK_WIDTH;
        this.app.stage.addChild(thisPuyo);
      }
    },
    created(){
      this.field = Field.Deserializer.fromBitStream(new BitStreamReader(this.base64));
      this.pixifield = new Array(this.field.dimension.rows).fill(null).map(() => new Array(this.field.dimension.columns).fill(null));
      this.app = new PIXI.Application({
        width: (this.field.dimension.columns + 2) * BLOCK_WIDTH, // left & right pole (+2)
        height: (this.field.dimension.rows + 1) * BLOCK_WIDTH,   // floor (+1)
        antialias: true,
        transparent: false,
        resolution: 1
      });
      PIXI.loader
      .add('pic/bg.json')
      .add('pic/skin.json')
      .load(this.loadbg)
      .load(this.loadpuyo);
    },
    mounted() {
      document.getElementById('puyostage').appendChild(this.app.view);
    },
    destroyed(){
      this.app.destroy();
    }
  };
</script>

<style>
</style>
