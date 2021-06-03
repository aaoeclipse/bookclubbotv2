module.exports = (sequelize, DataTypes, User, Book) => {
    const Read = sequelize.define('Read', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: User,
                key: 'id'
              }
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: Book,
                key: 'id'
              }
        },
        chapter: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        review: {
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.STRING
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Read
};