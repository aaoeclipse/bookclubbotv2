const db = require('../db/db')
const { prefix } = require('../config.json');

const createChannel = require('../utils/createChannel')
const wordParser = require('../utils/wordParser')
const command = 'channel'

module.exports = {
    name: command,
    description: 'User votes for book',
    howto: `!${command} [id of books seperated by space]`,
    step: [
       async (mssg, username, client) => {
        const user_msg =  wordParser(mssg);
        createChannel(client, user_msg[0], user_msg[1])
       }
    ]
}