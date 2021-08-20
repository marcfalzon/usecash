/**
 * Destroy Profile
 *
 * This will completely destory the user's profile,
 * as well as ALL imported seeds.
 */
const destroyProfile = (state) => {
    /* Reset active session. */
    state.activeSessionid = null

    /* Reset sessions. */
    state.sessions = null
}

/* Export module. */
export default destroyProfile
