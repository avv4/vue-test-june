import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router';
import { i18n } from 'vue-lang-router';

//import axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// import pagination
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

// base stylesS
import "@/assets/scss/base.scss";

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
