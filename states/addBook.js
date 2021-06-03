const db = require('../db/db')

const randG = [
    'Wadup',
    'Whats craking',
    'Yoyoyo',
    'Whats popin',
    'what\'s up my dude',
    'life is hard, but your are harder'
];

const name = 'add';

module.exports = {
    name: name,
    description: 'User adds book',
    numberOfSteps: 4,
    howto: `!${name}`,
    reset: async (username) => {
        // Delete Book
        await db.deleteBook(username);

        // Delete process
        db.removeProcess(username);
    
        // Reset user
        db.resetUser(username);
    },
    step: [
        // Step Zero
        async (_, username, client) => {
            // Change state and step of user
            await db.changeState(username, { state: name, step: 1 })
            client.channel.send(`${randG[Math.floor(Math.random() * randG.length)]} ${username}, i see you want to add a book to the list`);
            client.channel.send('Insert Title of book: ');
        },

        // Step One
        async (titleOfTheBook, username, client) => {
            const newBook = await db.insertBook(titleOfTheBook, username);
            await db.createProcess(username, newBook['dataValues']['id']);
            // Change Step of User
            await db.changeStep(username, { step: 2 });
            client.channel.send('Insert books author: ');
        },

        // Step Two
        async (bookAuthor, username, client) => {
            const idBook = await db.getBookIDInProcess(username);
            const updateBook = await db.updateBook(idBook, { author: bookAuthor});

            client.channel.send('Description of the book: ');
            await db.changeStep(username, { step: 3 });
        },

        // Step Three
        async (descriptionOfBook, username, client) => {
            const idBook = await db.getBookIDInProcess(username);
            const updateBook = await db.updateBook(idBook, { description: descriptionOfBook});
            client.channel.send('Done!');
            
            // Delete process
            db.removeProcess(username);
            
            // Reset User
            db.resetUser(username);
        },


    ],
}