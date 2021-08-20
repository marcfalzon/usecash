/* Import modules. */
import superagent from 'superagent'

/**
 * Add Session
 *
 * Adds a new session to the current purse.
 */
// const addSession = ({ commit, getters }) => {
const addSession = async () => {
    console.info('Creating a NEW session...') // eslint-disable-line no-console

    const session = {
        profileid: 'nyusternie',
    }

    const response = await superagent
        .post('http://localhost:8080/v1/sessions')
        .send(session)
    console.log('RESPONSE', response.body)

}

/* Export module. */
export default addSession
