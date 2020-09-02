import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VCharts from 'v-charts';
import VueDraggableResizable from 'vue-draggable-resizable';
import VueDragResize from 'vue-drag-resize';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import http from "./http";
import dayjs from 'dayjs';
import './assets/font/iconfont.css';
Vue.config.productionTip = false

Vue.use(VCharts)
Vue.prototype.$http = http
Vue.prototype.$dayjs = dayjs;

Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.component('vue-drag-resize', VueDragResize);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
