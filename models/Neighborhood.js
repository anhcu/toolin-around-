// Creates Neighborhood model.
// Includes id and name

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Neighborhood extends Model {}

Neighborhood.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'neighborhood',
    }
);

// EXPORT NEIGHBORHOOD MODEL FOR USE IN ROUTES
module.exports = Neighborhood;
