import Vue from 'vue'
import PuyoSimulator from './PuyoSimulator.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(PuyoSimulator)
}).$mount('#simulator')
