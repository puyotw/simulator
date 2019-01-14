<template>
  <pre id="simulator">
    <div id="puyostage"></div>
  </pre>
</template>

<script>
  import * as PIXI from 'pixi.js'
  export default {
    data() {
      return {
        app: null,
        field: null,
      }
    },
    methods: {
      loadsprite(){
        let tex = PIXI.loader.resources["pic/skin.json"].textures;
        let bg = new PIXI.Sprite(
          PIXI.loader.resources["pic/bg.png"].texture
        );
        let dungeon = new PIXI.Sprite(tex["red0"]);
        this.app.stage.addChild(bg);
        this.app.stage.addChild(dungeon);
      }
    },
    created(){
      this.app = new PIXI.Application({ 
        width: 256,
        height: 448,
        antialias: true,
        transparent: false,
        resolution: 1
      });
      PIXI.loader
      .add("pic/bg.png")
      .add("pic/skin.json")
      .load(this.loadsprite);
    },
    mounted() {
      document.getElementById('puyostage').appendChild(this.app.view);
    }
  }
</script>

<style>
</style>
