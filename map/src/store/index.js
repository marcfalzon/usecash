import Vue from 'vue'

// import Vuex, { createStore } from 'vuex'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { Magic } from 'magic-sdk'

import superagent from 'superagent'

import router from '../router'

Vue.use(Vuex)

/* Initialize magic key. */
const magicKey = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

export default new Vuex.Store({
    state: {
        user: null,
        // address: null,
        email: null,
        // test: 'hi there!',
    },
    getters: {
        isAdmin(_state) {
            if (_state.email === 'info@modenero.com') {
                return true
            }

            if (_state.email === 'mark') {
                return true
            }

            return false
        },

    },
    actions: {
        /* Set network. */
        // setNetwork({ commit }, _network) {
        //     commit('setNetwork', _network)
        // },

        async login({ commit }, _email) {
            try {
                /* Request magic login. */
                const did = await magicKey.auth.loginWithMagicLink(_email)
                console.log('DID TOKEN', did)

                /* Send DID token to server. */
                const result = await superagent
                    .post('http://127.0.0.1:9090/v1/magiclink')
                    // .post('https://api.usecash.com/v1/magiclink')
                    // .post('https://usecash-api.modenero.dev/v1/magiclink')
                    .send({ did })
                    .set('accept', 'json')
                    .catch(err => console.error(err))
                console.log('DID TOKEN (result):', result)

                const data = await magicKey.user.getMetadata()
                console.log('MAGIC LOGIN (data):', data)

                commit('setUser', data)

                commit('setEmail', data.email)

                await router.push('/mod')
            } catch (error) {
                console.error(error)
                // if (error instanceof SDKError) {
                //     console.error(error)
                // }
                //
                // if (error instanceof RPCError) {
                //     console.error(error)
                // }
                //
                // if (error instanceof ExtensionError) {
                //     console.error(error)
                // }
            }
        },

        async logout({ commit }) {
            /* Request logout. */
            await magicKey.user.logout()

            /* Clear user. */
            commit('setUser', null)

            /* Clear email. */
            commit('setEmail', null)

            /* Go home. */
            await router.push({ name: 'Home' })
        },

    },
    mutations: {
        /* Set network. */
        // setNetwork(_state, _network) {
        //     _state.network = _network
        // },

        setUser(_state, _userData) {
            _state.user = _userData
        },

        setEmail(_state, _email) {
            _state.email = _email
        },

    },
    modules: {
        //
    },
    plugins: [createPersistedState()],
})
