module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            default: ''
        },
        author: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        recommended_by: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        pages: {
            type: DataTypes.INTEGER,
            defaultValue: 0
            
        },
        chapters: {
            type: DataTypes.INTEGER,
            defaultValue: 0

        },
        votes: {
            type: DataTypes.INTEGER,
            defaultValue: 0

        }
        
    });    
};