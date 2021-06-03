module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true
            
        },
        state: {
            type: DataTypes.STRING,
            defaultValue: 'ready'
        },
        step: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
        
    });
};