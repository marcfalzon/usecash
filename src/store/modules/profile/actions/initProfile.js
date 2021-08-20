/* Import modules. */
// const moment = require('moment')

/**
 * Initialize Profile
 */
const initProfile = ({ state }) => {
    console.info('Initializing profile...') // eslint-disable-line no-console

    /* Validate purse. */
    if (state.masterSeed) {
        console.info('Profile already exists.') // eslint-disable-line no-console

        /* Cancel initialization. */
        return false
    } else {
        console.info('Initializing NEW profile...') // eslint-disable-line no-console
    }

    /* Return success. */
    return true
}

/* Export module. */
export default initProfile
