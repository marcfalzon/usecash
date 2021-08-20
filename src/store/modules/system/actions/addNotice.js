/**
 * Add Notice
 */
const addNotice = ({ commit, getters }, _notice) => {
    /* Validate notice. */
    if (!_notice || !_notice.id) {
        return
    }

    /* Retrieve notices. */
    const notices = getters.getNotices

    /* Validate (duplicate) notice. */
    if (!notices[_notice.id]) {
        notices[_notice.id] = _notice

        /* Commit error message. */
        commit('setNotices', notices)
    }
}

/* Export module. */
export default addNotice
