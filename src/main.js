import Vue from 'vue'
import App from './App.vue'

// Import Snackbar component from Buefy
import Snackbar from 'buefy/dist/components/snackbar'
Vue.use(Snackbar);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
