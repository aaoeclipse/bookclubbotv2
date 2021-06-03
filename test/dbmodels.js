var db = require('../db/db')
var assert = require('assert')
var UserModel = require('../db/models/User')
const BookModel = require('../db/models/Book')
const ReadModel = require('../db/models/Read')

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkUniqueIndex,
    checkPropertyExists
  } = require('sequelize-test-helpers')
  

describe('User Model Database', () => {
    const User = UserModel(sequelize, dataTypes)
    const user = new User()

    context('properties', () => {
        ;['id', 'username', 'state'].forEach(checkPropertyExists(user))
      })
    
});

describe('Book Model Database', () => {
    const Book = BookModel(sequelize, dataTypes)
    const book = new Book()

    context('properties', () => {
        ;['id', 'title', 'author', 'recommended_by', 'pages', 'chapters'].forEach(checkPropertyExists(book))
      })
    
});
  
  