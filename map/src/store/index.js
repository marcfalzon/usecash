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
        address: null,
        email: null,
    },
    getters: {
        isAdmin(_state) {
            if (
                _state.email === 'support@modenero.com'
                || _state.email === 'info@modenero.com'
                || _state.email === 'marc@falzon.co'
            ) {
                return true
            }

            return false
        },

    },
    actions: {
        async signin({ commit }, _email) {
            // FIXME: Add email verification.

            try {
                /* Request magic login. */
                const did = await magicKey.auth.loginWithMagicLink(_email)
                console.log('DID TOKEN', did)

                /* Send DID token to server. */
                const result = await superagent
                    .post('https://api.usecash.com/v1/magiclink')
                    // .post('http://127.0.0.1:9090/v1/magiclink')
                    .send({ did })
                    .set('accept', 'json')
                    .catch(err => console.error(err))
                console.log('DID TOKEN??? (result):', result)

                const data = await magicKey.user.getMetadata()
                console.log('MAGIC LOGIN (data):', data)

                /* Set (profile) user data. */
                commit('saveUser', data)

                /* Set (profile) email. */
                commit('saveEmail', data.email)

                /* Go to profile. */
                await router.push('/profile')
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
            commit('saveUser', null)

            /* Clear email. */
            commit('saveEmail', null)

            /* Go home. */
            await router.push('/')
        },

    },
    mutations: {
        saveUser(_state, _userData) {
            _state.user = _userData
        },

        saveEmail(_state, _email) {
            _state.email = _email
        },

    },
    modules: {
        //
    },
    plugins: [
        createPersistedState(),
    ],
})
