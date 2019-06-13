<template>
  <div id="puyostage"></div>
</template>

<script>
  import * as PIXI from 'pixi.js';
  import { TimelineMax } from 'gsap/TweenMax';
  import PixiPlugin from 'gsap/PixiPlugin';
  import Tsu from '../simulator/Game/Tsu.js';
  import Game from '../simulator/Game/Game.js';
  import Field from '../simulator/Field/Field.js';
  import { BLOCK_WIDTH, RECOVERY_FRAME, STATE_IDLE, STATE_PLAY, STATE_STEP, STATE_RESET, STATE_END } from '../simulator/Constant';

  export default {
    name: 'PuyoField',
    data() {
      return {
        app: null,
        game: null,
        chain: 0,
      };
    },
    props: {
      encoded: String,
      state: String,
      editMode: Boolean,
      color: String,
    },
    watch: {
      state(newState, oldState) {
        switch (newState) {
          case STATE_PLAY:
              if (oldState === STATE_IDLE) {
                if (!this.savedField) {
                  this.savedField = this.game.field.clone();
                  if (this.editMode) {
                    this.container.editor.interactive = false;
                    this.container.editor.renderable = false;
                  }
                }
                this.play();
              } else {
                this.$emit('update:state', STATE_IDLE);
              }
            break;
          case STATE_STEP:
              if (oldState === STATE_IDLE) {
                if (!this.savedField) {
                  this.savedField = this.game.field.clone();
                  if (this.editMode) {
                    this.container.editor.interactive = false;
                    this.container.editor.renderable = false;
                  }
                }
                this.step();
              } else {
                this.$emit('update:state', STATE_IDLE);
              }
            break;
          case STATE_RESET:
              if (((oldState === STATE_IDLE) ||
                  (oldState === STATE_END)) &&
                  (this.savedField)) {
                this.reset();
              } else {
                this.$emit('update:state', STATE_IDLE);
              }
            break;
          case STATE_IDLE:
          case STATE_END:
          default:
            break;
        }
      },
      color(value) {
        // change cursor sprite
        let skintex = PIXI.loader.resources['pic/skin.json'].textures;
        switch (value) {
          case 'RED':
            this.editor.color.texture = skintex['red0'];
            break;
          case 'GREEN':
            this.editor.color.texture = skintex['green0'];
            break;
          case 'BLUE':
            this.editor.color.texture = skintex['blue0'];
            break;
          case 'YELLOW':
            this.editor.color.texture = skintex['yellow0'];
            break;
          case 'PURPLE':
            this.editor.color.texture = skintex['purple0'];
            break;
          case 'BLOCK':
            this.editor.color.texture = skintex['blocks'];
            break;
          case 'NUISANCE':
            this.editor.color.texture = skintex['nuisance'];
            break;
          case 'HARD_NUISANCE':
            this.editor.color.texture = skintex['hard-nuisance'];
            break;
          case 'IRON':
            this.editor.color.texture = skintex['iron'];
            break;
          case 'EMPTY':
          default:
            this.editor.color.texture = null;
            break;
        }
      },
      encode() {
        this.encodeGame();
      },
    },
    computed: {
      editorColor() {
        return Field.Object[this.color];
      }
    },
    methods: {
      encodeGame() {
        let encoded = Game.Serializer.encode(this.game);
        this.$emit('update:encoded', encoded);
      },
      genliquid() {
        return Field.Serializer.toAsciiArt(this.game.field);
      },
      timelinePromise(timeline, diff, state) {
        return new Promise((resolve) => {
            timeline.play();
            timeline.eventCallback('onComplete', () => {
              if (state === 'gravity') {
                this.setPuyo(diff.otherPositional, diff.otherPositional.connections);
              }
              resolve();
            });
        });
      },
      async step() {
        if (this.state === STATE_END) {
          return;
        }
        let condition = await this.gravity() || await this.clear();
        if (condition) {
          this.$emit('update:state', STATE_IDLE);
        } else {
          this.$emit('update:state', STATE_END);
        }
      },
      async play() {
        let condition = (this.state !== STATE_END);
        while (condition) {
          if (this.state === STATE_PLAY) {
            condition = await this.gravity() || await this.clear();
          } else {
            return;
          }
        }
        this.$emit('update:state', STATE_END);
      },
      clearAll() {
        for (let i = this.container.puyo.children.length - 1; i >= 0; i--) {
          this.container.puyo.removeChild(this.container.puyo.children[i]);
        }
        this.game.field.erase();
        this.loadPuyo();
      },
      reset() {
        for (let i = this.container.puyo.children.length - 1; i >= 0; i--) {
          this.container.puyo.removeChild(this.container.puyo.children[i]);
        }
        this.game.field = this.savedField;
        this.savedField = null;
        if (this.editMode) {
          this.container.editor.interactive = true;
          this.container.editor.renderable = true;
        }
        this.loadPuyo();
        this.$emit('update:state', STATE_IDLE);
        this.chain = 0;
      },
      async gravity() {
        let tl_arr = [];
        // get diff
        let gravitationalDiff = this.game.field.gravitate();
        if (gravitationalDiff.length === 0) {
          return false;
        }
        for (let diff of gravitationalDiff) {
          // create drop animation timeline
          let tl = new TimelineMax({ paused: true });
          this.setPuyo(diff.positional);
          tl.to(
            this.pixifield[diff.positional.row][diff.positional.column],
            RECOVERY_FRAME[diff.positional.row - diff.otherPositional.row] / 60,
            { pixi: { y: (this.game.field.dimension.rows - diff.otherPositional.row - 1) * BLOCK_WIDTH },
             ease: 'Linear' }
          ).to(
            this.pixifield[diff.positional.row][diff.positional.column],
            0.1, 
            {
              pixi: { scaleY: 0.8 },
            }
          ).to(
            this.pixifield[diff.positional.row][diff.positional.column],
            0.1, 
            {
              pixi: { scaleY: 1 },
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
          this.loadPuyo(false);
        });
        return true;
      },
      async clear() {
        let tl_arr = [];
        // set connections
        let connections = Field.Algorithm.flattenConnectionMap(this.game.field.connections());
        if (connections.length === 0) {
          return false;
        }
        this.game.field.clear(connections).forEach(diff => {
          // create timeline
          let tl = new TimelineMax({ paused: true });
          tl.to(
            this.pixifield[diff.positional.row][diff.positional.column],
            0.1, 
            { pixi: { alpha: 0.5 }, repeat: 5, yoyo: true, onComplete: ()=>{
                // remove sprite when clear animation complete
                let pos = new this.game.field.Positional({
                  row: diff.positional.row,
                  column: diff.positional.column,
                });
                pos.object = diff.newObject;
                this.setPuyo(pos, pos.connections);
                // chain+1 / +score
                this.chain += 1;
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
      loadBg() {
        let bgtex = PIXI.loader.resources['pic/bg.json'].textures;
        // set background
        let bg = new PIXI.extras.TilingSprite(
            bgtex['bg'],
            this.app.screen.width,
            this.app.screen.height
        );
        this.container.bg.addChild(bg);
        let bgleft = new PIXI.extras.TilingSprite(
            bgtex['bgdark'],
            BLOCK_WIDTH * 1.5,
            this.app.screen.height
        );
        this.container.bg.addChild(bgleft);
        let bgtop = new PIXI.extras.TilingSprite(
            bgtex['bgdark'],
            this.app.screen.width,
            BLOCK_WIDTH * 1.5
        );
        this.container.bg.addChild(bgtop);
        let pole1_left = new PIXI.extras.TilingSprite(
            bgtex['pole1'],
            BLOCK_WIDTH,
            this.app.screen.height
        );
        pole1_left.y = this.game.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.container.bg.addChild(pole1_left);
        let pole1_right = new PIXI.extras.TilingSprite(
            bgtex['pole1'],
            BLOCK_WIDTH,
            this.app.screen.height
        );
        pole1_right.x = this.app.screen.width - BLOCK_WIDTH;
        pole1_right.y = this.game.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.container.bg.addChild(pole1_right);
        let pole0_left = new PIXI.Sprite(bgtex['pole0']);
        pole0_left.y = this.game.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.container.bg.addChild(pole0_left);
        let pole0_right = new PIXI.Sprite(bgtex['pole0']);
        pole0_right.x = this.app.screen.width - BLOCK_WIDTH;
        pole0_right.y = this.game.field.dimension.hiddenRows * BLOCK_WIDTH;
        this.container.bg.addChild(pole0_right);
        let block = new PIXI.extras.TilingSprite(
            bgtex['block'],
            this.game.field.dimension.columns * BLOCK_WIDTH,
            BLOCK_WIDTH
        );
        block.x = BLOCK_WIDTH;
        block.y = this.app.screen.height - BLOCK_WIDTH;
        this.container.bg.addChild(block);
      },
      loadPuyo(init = true) {
        // set puyo
        for (let pos of this.game.field) {
          if (init && pos.object !== Field.Object.EMPTY) {
            // new Sprite object
            this.pixifield[pos.row][pos.column] = new PIXI.Sprite();
          }
          this.setPuyo(pos, pos.connections);
        }
      },
      loadEditor() {
        let bgtex = PIXI.loader.resources['pic/bg.json'].textures;
        this.editor.cursor = new PIXI.Sprite(bgtex['select']);
        this.editor.color = new PIXI.Sprite();
        this.container.editor.addChild(this.editor.color);
        this.container.editor.addChild(this.editor.cursor);
        this.container.editor.interactive = true;
        this.container.editor.renderable = false;
        this.container.editor.hitArea = new PIXI.Rectangle(BLOCK_WIDTH, 0, 
          this.game.field.dimension.columns * BLOCK_WIDTH, 
          this.game.field.dimension.rows * BLOCK_WIDTH);
        this.container.editor.on('mousemove', (event) => {
          const x = event.data.global.x;
          const y = event.data.global.y;
          this.editor.cursor.x = Math.floor(x / BLOCK_WIDTH) * BLOCK_WIDTH;
          this.editor.cursor.y = Math.floor(y / BLOCK_WIDTH) * BLOCK_WIDTH;
          this.editor.color.x = Math.floor(x / BLOCK_WIDTH) * BLOCK_WIDTH;
          this.editor.color.y = Math.floor(y / BLOCK_WIDTH) * BLOCK_WIDTH;
          this.container.editor.renderable = true;
        });
        this.container.editor.on('mouseout', (event) => {
          this.container.editor.renderable = false;
        });        
        this.container.editor.on('click', (event) => {
            this.savedField = null;
            let pos = new this.game.field.Positional({
              row: this.game.field.dimension.rows - (Math.floor(event.data.global.y / BLOCK_WIDTH) + 1),
              column: Math.floor(event.data.global.x / BLOCK_WIDTH) - 1,
            });
            pos.object = this.editorColor;
            // set color
            if (!this.pixifield[pos.row][pos.column]) {
              this.pixifield[pos.row][pos.column] = new PIXI.Sprite();
            }
            this.setPuyo(pos, pos.connections);
            this.setPuyo(pos.left, pos.left.connections);
            this.setPuyo(pos.right, pos.right.connections);
            this.setPuyo(pos.above, pos.above.connections);
            this.setPuyo(pos.below, pos.below.connections);
        });
      },
      setPuyo(pos, connections = 0) {
        let skintex = PIXI.loader.resources['pic/skin.json'].textures;
        if (!pos.valid) {
          return;
        }
        let thisPuyo = this.pixifield[pos.row][pos.column];
        if (!thisPuyo) {
          return;
        }
        switch (pos.object) {
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
          case Field.Object.BLOCK:
            thisPuyo.texture = skintex['blocks'];
            break;
          case Field.Object.NUISANCE:
            thisPuyo.texture = skintex['nuisance'];
            break;
          case Field.Object.HARD_NUISANCE:
            thisPuyo.texture = skintex['hard-nuisance'];
            break;
          case Field.Object.IRON:
            thisPuyo.texture = skintex['iron'];
            break;
          case Field.Object.EMPTY:
          default:
            thisPuyo.texture = null;
            break;
        }
        if (pos.object === Field.Object.EMPTY) {
          this.container.puyo.removeChild(thisPuyo);
          this.pixifield[pos.row][pos.column] = null;
        } else {
          thisPuyo.x = (pos.column + 1) * BLOCK_WIDTH;
          thisPuyo.y = (this.game.field.dimension.rows - pos.row - 1) * BLOCK_WIDTH;
          this.container.puyo.addChild(thisPuyo);
        }
      }
    },
    created() {
      // tree shaking prevention
      const plugins = [ PixiPlugin, Tsu ]; // eslint-disable-line no-unused-vars
      this.game = this.encoded ? Game.Deserializer.fromEncoded(this.encoded) : new Tsu;
      this.savedField = null;
      this.pixifield = new Array(this.game.field.dimension.rows)
        .fill(null)
        .map(() =>
          new Array(this.game.field.dimension.columns)
            .fill(null)
        );
      Object.defineProperty(this.pixifield, '_isVue', { value: true, enumerable: false });
      this.app = new PIXI.Application({
        width: (this.game.field.dimension.columns + 2) * BLOCK_WIDTH, // left & right pole (+2)
        height: (this.game.field.dimension.rows + 1) * BLOCK_WIDTH,   // floor (+1)
        antialias: true,
        transparent: false,
        resolution: 1
      });
      this.container = {};
      Object.defineProperty(this.container, '_isVue', { value: true, enumerable: false });
      this.container.bg = new PIXI.Container();
      Object.defineProperty(this.container.bg, '_isVue', { value: true, enumerable: false });
      this.container.puyo = new PIXI.Container();
      Object.defineProperty(this.container.puyo, '_isVue', { value: true, enumerable: false });
      
      // make 2 groups for background and puyo
      this.app.stage.addChild(this.container.bg);
      this.app.stage.addChild(this.container.puyo);

      PIXI.loader
      .add('pic/bg.json')
      .add('pic/skin.json')
      .load(this.loadBg)
      .load(this.loadPuyo);

      if (this.editMode) {
        this.container.editor = new PIXI.Container();
        Object.defineProperty(this.container.editor, '_isVue', { value: true, enumerable: false });
        this.app.stage.addChild(this.container.editor);
        this.app.renderer.plugins.interaction.moveWhenInside = true;
        this.editor = {};
        Object.defineProperty(this.editor, '_isVue', { value: true, enumerable: false });
        PIXI.loader.load(this.loadEditor);
      }
    },
    mounted() {
      document.getElementById('puyostage').appendChild(this.app.view);
    },
    destroyed() {
      this.app.destroy();
    }
  };
</script>

<style lang="scss">

#puyostage {
  canvas{
    vertical-align: top;
  }
}

</style>
