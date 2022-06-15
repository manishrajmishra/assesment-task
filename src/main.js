import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '@/plugins/validation'
import {store} from './store/index'

Vue.config.productionTip = false

window.eventBus = new Vue()

Vue.config.productionTip = false

  new Vue({
    vuetify,
    store,
    router,
    render:h => h(App)
  }).$mount('#app')