// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PieChart from './components/PieChart.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.component('chart', PieChart)

// let isProduction = process.env.NODE_ENV === 'production'
// let rootUrl = (isProduction) ? 'http://production.domain/api' : 'http://localhost:8080/'
// Vue.http.options.root = rootUrl

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
