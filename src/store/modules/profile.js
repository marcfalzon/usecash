/* Import modules (getters). */
import getActiveSessionid from './profile/getters/getActiveSessionid'
import getSessions from './profile/getters/getSessions'

/* Import modules (actions). */
import addSession from './profile/actions/addSession'
import initProfile from './profile/actions/initProfile'

/* Import modules (mutations). */
import setActiveSessionid from './profile/mutations/setActiveSessionid'
import setEmptyProfile from './profile/mutations/setEmptyProfile'
import setSessions from './profile/mutations/setSessions'

/* Initialize state. */
const state = {
    /**
     * Active Session Id
     *
     * Most recently selected session's id.
     */
    activeSessionid: null,

    /**
     * Master Seed
     *
     * A 32-byte key, used to secure the entire purse.
     */
    masterSeed: null,

    /**
     * Sessions
     *
     * Every new session is created on a separate derivation path.
     * The `session` index is equivalent to the `account` level of BIP-32.
     *
     * A standard BCH derivation path is used,
     *     m/44'/145'/<session>'/0/<index>
     * to allow for convenience and portability to desktop and mobile wallets.
     */
    sessions: null,
}

/* Getters. */
const getters = {
    getActiveSessionid,
    getSessions,
}

/* Actions. */
const actions = {
    addSession,
    initProfile,
}

/* Mutations. */
const mutations = {
    setActiveSessionid,
    setEmptyProfile,
    setSessions,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
