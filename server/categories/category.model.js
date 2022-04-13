const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        category: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('Category', attributes, options);
}