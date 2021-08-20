/**
 * Get Sessions
 *
 * Returns addresses for ALL (in-use) receiving sessions.
 */
const getSessions = (state) => {
    /* Validate state. */
    if (!state || !state.sessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = state.sessions

    /* Return sessions. */
    return sessions
}

/* Export module. */
export default getSessions
