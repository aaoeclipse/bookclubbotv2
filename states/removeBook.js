const db = require('../db/db')
const wordParser = require('../utils/wordParser')

const name = 'remove';

module.exports = {
    name: name,
    description: 'Delete book',
    howto: `!${name} [id of book]`,
    step: [
        async (userInput, _, client) => {
            const args = wordParser(userInput);

            const book = await db.deleteBookDirect(args[0]);

            if (!book) {
                client.channel.send("No book with that ID");
                return
            }
            client.channel.send("Book Deleted!");
        }
    ]
}