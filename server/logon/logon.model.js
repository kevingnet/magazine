const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        role: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        defaultScope: {
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('Role', attributes, options);
}