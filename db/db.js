const { Sequelize, DataTypes, Model } = require('sequelize');
const { config } = require('./config')
var sinon = require("sinon");

const UserModel = require('./models/User')
const BookModel = require('./models/Book')
const ReadModel = require('./models/Read')
const ProcessModel = require('./models/Process')
const VoteModel = require('./models/Vote')


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite',
    logging: false
});



const User = UserModel(sequelize, DataTypes);
const Book = BookModel(sequelize, DataTypes);
const Read = ReadModel(sequelize, DataTypes, User, Book);
const Process = ProcessModel(sequelize, DataTypes, User, Book);
const Vote = VoteModel(sequelize, DataTypes, User, Book);

const database = {
    initDb: async (del) => {
        await sequelize.sync({ force: del, alter: true });
    },
    insertUser: async (username)=> {
        return await User.create({ username: username });
    },
    insertBook: async (title, username) => {
        return await Book.create(
            { 
                title: title, 
                recommended_by: username, 
        });

    },
    updateBook: async (bookId, data) => {
        const updateBook = await Book.findOne({ where: { id: bookId } })
        if (updateBook) return await updateBook.update(data, {where: { id: bookId } })
        return null
    },
    getAllBooks: async() =>{
        const books = await Book.findAll({
            attributes: ['id', 'title', 'author', 'description', 'recommended_by', 'votes']
        });
        return books;
    },
    insertRead: async (userId, bookId, chapter) => {
        return await Read.create(
            { 
                user_id: userId, 
                book_id: bookId, 
                chapter: chapter, 
        });
    },
    changeSS: async (userName, data) => {
        const updateUser = await User.findOne({ where: { username: userName } })
        if (updateUser) return await updateUser.update(data, {where: { username: userName } })
        return null
    },
    changeState: async (userName, data) => {
        const updateUser = await User.findOne({ where: { username: userName } })
        if (updateUser) return await updateUser.update(data, {where: { username: userName } })
        return null
    },
    changeStep: async (userName, data) => {
        const updateUser = await User.findOne({ where: { username: userName } })
        if (updateUser) return await updateUser.update(data, {where: { username: userName } })
        return null
    },
    getUser: async (userName) => {
        const users = await User.findAll({
            where: {
                username: userName
          }
        });
        return users[0];
    },
    checkState: async (userName) => {
        const users = await User.findAll({
            where: {
                username: userName
          }
        });
        return users[0]['dataValues']['state'];
    },
    checkStep: async (userName) => {
        const users = await User.findAll({
            where: {
                username: userName
          }
        });
        return users[0]['dataValues']['step'];
    },
    resetUser: async (userName) => {
        const updateUser = await User.findOne({ where: { username: userName } })
        if (updateUser) return await updateUser.update({ state: 'ready', step: 0}, {where: { username: userName } })
        return null;
    },
    createProcess: async (userName, idBook) => {
        const userId = await User.findOne({ where: { username: userName } });
        
        return await Process.create(
            { 
                user_id: userId['dataValues']['id'], 
                book_id: idBook, 
        });
    },
    getBookIDInProcess: async (userName) => {
        const userId = await User.findOne({ where: { username: userName } });
        const bookId = await Process.findOne({ where: { user_id: userId['dataValues']['id'] } })
        return bookId['dataValues']['book_id']
    },
    removeProcess: async (userName) => {
        const user = await User.findOne({ where: { username: userName } })
        Process.destroy({
            where: {
                user_id: user['dataValues']['id']
            }
        })
    },
    deleteBook: async (userName) => {
        const user = await User.findOne({ where: { username: userName } })
        const book = await Process.findOne({ where: {user_id: user['dataValues']['id']}})
        if (!book){
            return
        }
        Book.destroy({
            where: {
                id: book['dataValues']['id']
            }
        })
    },
    deleteBookDirect: async (bookId) => {
        const book = await Book.findOne({ where: { id: bookId } })
        if (!book){
            return
        }
        const bookDeleted = await Book.destroy({
            where: {
                id: bookId
            }
        })
    },
    voteBook: async (userName, bookId) => {
        const bookDb = await Book.findOne({ where: { id: bookId } })

        if (!bookDb) return

        const user = await User.findOne({ where: { username: userName } })

        const prevVote = await Vote.findOne({
            where: {
                user_id: user['dataValues']['id'],
                book_id: bookId
            }
        })
        

        if (prevVote){
            await Book.decrement('votes',{
                by: 1,
                where: {
                    id: bookId
                }
            });

            return await Vote.destroy({
                where: {
                    user_id: user['dataValues']['id'],
                    book_id: bookId
                }
            });
        }

        Book.increment('votes',{
            by: 1,
            where: {
                id: bookId
            }
        });

        return Vote.create({
            user_id: user['dataValues']['id'],
            book_id: bookId
        });
    }
}


module.exports = database;