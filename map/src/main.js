import Vue from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'

/* Import leaflet. */
import 'leaflet/dist/leaflet.css'

/* Import tailwind. */
import 'tailwindcss/tailwind.css'

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* Add free solid styles. */
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* Add free brand styles. */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faCompass,
    faMapLocationDot,
    faRoute,
    faUserSecret,

    faTwitter,
)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
