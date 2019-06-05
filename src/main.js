// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
// import axios from 'axios'
import vuex from 'vuex'

Vue.config.productionTip = false

const install = function (Vue) {
  const MenuVue = new Vue()
  Vue.prototype.$menuVue = MenuVue
}
Vue.use(install)
Vue.use(vuex)
// Vue.use(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
