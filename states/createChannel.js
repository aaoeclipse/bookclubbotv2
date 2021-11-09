const db = require('../db/db')
const { prefix } = require('../config.json');

const createChannel = require('../utils/createChannel')
const wordParser = require('../utils/wordParser')
const command = 'channel'

const admin = [
    "aaoeclipse",
    "a2oeclipse"
]

module.exports = {
    name: command,
    description: 'Create Channel',
    howto: `!${command} [name of book] [chapters]`,
    step: [
       async (mssg, username, client) => {
        if (!username in admin){
            client.channel.send("Sorry this is an admin only command");
            return
        }
        const user_msg =  wordParser(mssg);
        createChannel(client, user_msg[0], user_msg[1])
       }
    ]
}