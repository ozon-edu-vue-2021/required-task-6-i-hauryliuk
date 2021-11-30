import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';
import App from './App.vue';
import 'normalize.css';

Vue.config.productionTip = false;

Vue.use(VueObserveVisibility);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
