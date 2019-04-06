import Vue from 'vue';
import PuyoSimulator from './Editor.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(PuyoSimulator)
}).$mount('#simulator');
