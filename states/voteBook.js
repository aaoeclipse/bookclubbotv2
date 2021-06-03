const db = require('../db/db')
const { prefix } = require('../config.json');

const command = 'vote'

module.exports = {
    name: command,
    description: 'User votes for book',
    howto: `!${command} [id of books seperated by space]`,
    step: [
        async (content, username, client) => {
            const args = content.slice(prefix.length).trim().split(' ');

            if (args.length < 2) {
                client.channel.send("Incorrect format: !vote [id of book]");
                return
            }

            if (args.length > 2) {
                await args.forEach(async (bookToVote) => {

                    const idOfBook = parseInt(bookToVote);

                    if (idOfBook) {
                        const result = await db.voteBook(username, bookToVote);

                        if (!result) {
                            client.channel.send(`Error Voting for ${idOfBook}`);
                        } 
                    }
                });
                client.channel.send(`Done!`);

            } else {
                const idOfBook = args[1];

                if (!idOfBook) {
                    client.channel.send(`Error parsing ${bookToVote}`)
                }

                const result = await db.voteBook(username, args[1]);

                if (!result) {
                    client.channel.send(`Error Voting for ${idOfBook}`)
                } else {
                    client.channel.send(`Votes succesfuls for ${idOfBook}`);
                }
            }

        }
    ]
}