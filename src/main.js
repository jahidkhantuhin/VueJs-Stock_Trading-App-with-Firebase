import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueResource from 'vue-resource'
import axios from 'axios'
import Vuelidate from 'vuelidate'

axios.defaults.baseURL = 'https://my-stock-trader-929fb.firebaseio.com'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Vuelidate) 

// Vue.http.options.root = 'https://my-stock-trader-929fb.firebaseio.com/'

Vue.filter('currency', value => {
  return '$' + parseInt(value).toLocaleString();
  //return `$ ${value}`;
})
Vue.filter('upper', value => {
  return value.toUpperCase();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
