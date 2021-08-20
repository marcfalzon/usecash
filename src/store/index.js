/* Import (core) modules. */
import Vue from 'vue'
import Vuex from 'vuex'

/* Import persisted state (for vuex). */
import createPersistedState from 'vuex-persistedstate'

/* Import (local) modules. */
import profile from './modules/profile'
// import system from './modules/system'
// import utils from './modules/utils'

/* Initialize Vuex. */
Vue.use(Vuex)

/* Export store. */
export default new Vuex.Store({
    modules: {
        profile,
        // system,
        // utils,
    },
    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== 'production'
})
