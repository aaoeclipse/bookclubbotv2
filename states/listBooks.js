const Discord = require('discord.js');

const db = require('../db/db')
const name = 'list';
const robotLink = 'https://www.creativefabrica.com/wp-content/uploads/2018/12/Robot-icon-by-rudezstudio-2-580x386.jpg'

module.exports = {
    name: name,
    description: 'Shows list of books to user',
    howto: `!${name}`,
    step: [
        async (_, __, client) => {
            // Get all books
            const allBooks = await db.getAllBooks();
            // Get dictionary of all books
            const dictBooks = []
            
            // Headers
            allBooks.forEach(book => {
                dictBooks.push({
                    name: `${book['dataValues']['id']} - ${book['dataValues']['title']}`,
                    value: `author: ${book['dataValues']['author']}
                    Description: ${book['dataValues']['description']}
                    Recomended by: ${book['dataValues']['recommended_by']}
                    Votes: ${book['dataValues']['votes']}`
                })
            });

            // Embed
            const exampleEmbed = {
                color: 0x0099ff,
                title: 'Books on List',
                url: 'https://discord.js.org',
                author: {
                    name: 'bookbot',
                    icon_url: robotLink,
                    url: 'https://discord.js.org',
                },
                description: 'Books currently on the list',
                thumbnail: {
                    url: robotLink,
                },
                fields: dictBooks,
                image: {
                    url: robotLink,
                },
                timestamp: new Date(),
                footer: {
                    text: 'remember you can vote with !vote!',
                    icon_url: robotLink,
                },
            };
            client.channel.send({ embed: exampleEmbed});
        }
    ]
}