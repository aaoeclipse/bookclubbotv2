module.exports = (sequelize, DataTypes, User, Book) => {
    return sequelize.define(
        'Process', {
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
        }
    });    
};