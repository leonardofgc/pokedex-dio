import Vue from 'vue';

import InfiniteLoading from 'vue-infinite-loading';

import './styles/main.scss';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(InfiniteLoading, {/* Opções de Configurações*/ }); /** HABILITADO O USO DE FORMA GLOBAL */
new Vue({
  render: (h) => h(App),
}).$mount('#root');
