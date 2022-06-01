import Vue from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'

/* Import leaflet. */
import 'leaflet/dist/leaflet.css'

/* Import tailwind. */
import 'tailwindcss/tailwind.css'

/* Add fontawesome core. */
import { library } from '@fortawesome/fontawesome-svg-core'

/* Add free solid styles. */
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons'
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faTruckPlane } from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

/* Add free brand styles. */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

/* Import font awesome icon component. */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Cryptoicon from 'vue-cryptoicon'
import { Bch, Btc, Eth, Dash, Xrp, Bnb } from 'vue-cryptoicon/src/icons'

library.add(
    faBagShopping,
    faBasketShopping,
    faBed,
    faBellConcierge,
    faChampagneGlasses,
    faCompass,
    faMapLocationDot,
    faMugSaucer,
    faPersonRunning,
    faPiggyBank,
    faRoute,
    faStore,
    faTruckPlane,
    faUserSecret,
    faUtensils,

    faTwitter,
)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Cryptoicon.add([ Bch, Btc, Eth, Dash, Xrp, Bnb ])
Vue.use(Cryptoicon)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
