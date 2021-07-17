import Vue from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

/* Import leaflet. */
import 'leaflet/dist/leaflet.css'

/* Import tailwind. */
import 'tailwindcss/tailwind.css'
// import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
