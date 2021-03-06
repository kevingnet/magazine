const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
var connection = require("../connection.js");
const mysql = require("mysql");

module.exports = {
    getById,
};

async function getById(id) {
    return await getRole(id);
}

// helper functions

var email = 'enter email address';
var idRole = 0;
var dbname = "User Name Not Found!"
var dbpwd = "invalid"

function getByEmail(callback){
    var sql = "SELECT Name, idRole, Password FROM sqldb.User WHERE Email = ?";

    connection.query(sql, email, function (err, result) {
        if (err) {
            console.log('query err ', err);
            throw err;
        }
        var string = JSON.stringify(result);
        var json =  JSON.parse(string);
        if(json && json[0] && 'Name' in json[0]){
            dbname = json[0].Name;
            idRole = json[0].idRole;
            dbpwd = json[0].Password;
        }
        return callback(dbname);
    })
}

async function getRole(id) {
    const user = await db.User.findByPk(id);
    const role = await db.Role.findByPk(user.idRole);
    if (!role) throw 'Role not found';
    return role;
}

module.exports = email;
module.exports = getByEmail;

