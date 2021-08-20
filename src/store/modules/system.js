/* Import modules (getters). */
import getFlags from './system/getters/getFlags'
import getLocale from './system/getters/getLocale'
import getNotices from './system/getters/getNotices'
import getPool from './system/getters/getPool'

/* Import modules (actions). */
import addNotice from './system/actions/addNotice'
import updatePool from './system/actions/updatePool'

/* Import modules (mutations). */
import setFlags from './system/mutations/setFlags'
import setLocale from './system/mutations/setLocale'
import setNotices from './system/mutations/setNotices'
import setPool from './system/mutations/setPool'

/* Initialize state. */
const state = {
    /**
     * Flags
     *
     * 1. Dark mode
     * 2. Unconfirmed transactions
     */
    flags: { // FIXME: Initialize at app start.
        darkMode: false,
        unconfirmed: true,
    },

    /**
     * Locale
     *
     * Controls the localization language.
     * (default is english)
     */
    locale: 'en-US', // FIXME: Initialize at app start.

    /**
     * Notices
     *
     * System notices that nag/remind the user of some important action or
     * information; which can be permanently disabled ("Do Not Show Again")
     * via checkbox and confirmation.
     *
     * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
     *       of this storage field.
     */
    notices: {},

    /**
     * Active Pool Server
     */
    pool: null,

    /**
     * Application Version
     */
    version: null,

}

/* Getters. */
const getters = {
    getFlags,
    getLocale,
    getNotices,
    getPool,
}

/* Actions. */
const actions = {
    addNotice,
    updatePool,
}

/* Mutations. */
const mutations = {
    setFlags,
    setLocale,
    setNotices,
    setPool,
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
