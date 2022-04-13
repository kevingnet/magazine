const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        rating: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('Rating', attributes, options);
}