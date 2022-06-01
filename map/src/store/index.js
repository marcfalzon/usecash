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
        // user: null,
        address: null,
        did: null,
        email: null,

        // hasAuth: null,
        magicUser: null,
        profile: null,
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
        async signin({ commit }, _params) {
            // console.log('SIGNIN PARAMS', _params)
            // FIXME: Add email verification.

            try {
                /* Request magic login. */
                const did = await magicKey.auth.loginWithMagicLink(_params)
                // console.log('DID TOKEN', did)

                /* Set (Magic) DID token. */
                commit('saveDid', did)

                /* Send DID token to server. */
                const result = await superagent
                    .post('https://api.usecash.com/v1/magiclink')
                    // .post('http://127.0.0.1:9090/v1/magiclink')
                    .send({ did })
                    .set('accept', 'json')
                    .catch(err => console.error(err))
                // console.log('DID TOKEN??? (result):', result)

                /* Validate result. */
                if (!result) {
                    // TODO: Offer a better UI/UX.
                    return alert('Login error!')
                }

                const data = await magicKey.user.getMetadata()
                console.log('MAGIC LOGIN (data):', data)

                /* Set (magic) user data. */
                commit('saveMagicUser', data)

                /* Set (profile) email. */
                commit('saveEmail', data.email)

                /* Reload profile. */
                await router.go(0) // NOTE: Assumed to be on profile screen.
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
            commit('saveMagicUser', null)

            /* Clear email. */
            commit('saveEmail', null)

            /* Reload profile. */
            await router.go(0) // NOTE: Assumed to be on profile screen.
        },

    },
    mutations: {
        saveAddress(_state, _address) {
            _state.address = _address
        },

        saveDid(_state, _did) {
            _state.did = _did
        },

        saveEmail(_state, _email) {
            _state.email = _email
        },

        saveMagicUser(_state, _userData) {
            _state.magicUser = _userData
        },

        saveProfile(_state, _profile) {
            _state.profile = _profile
        },

    },
    modules: {
        //
    },
    plugins: [
        createPersistedState(),
    ],
})
