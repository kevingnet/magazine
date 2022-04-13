require('rootpath')();
const bodyParser = require('body-parser'); // middleware
var Promise = require('bluebird');

const express = require('express');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');
var connection = require("./connection.js");

var queryAsync = Promise.promisify(connection.query.bind(connection));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// global error handler
app.use(errorHandler);

// api routes
app.use('/logon', require('./logon/logons.controller'));
app.use('/users', require('./users/users.controller'));
app.use('/roles', require('./roles/roles.controller'));
app.use('/categories', require('./categories/categories.controller'));
app.use('/ratings', require('./ratings/ratings.controller'));
app.use('/content_statuses', require('./contentStatuses/contentStatuses.controller'));
app.use('/subscription_statuses', require('./subscriptionStatuses/subscriptionStatuses.controller'));
app.use('/contents', require('./contents/contents.controller'));
app.use('/subscriptions', require('./subscriptions/subscriptions.controller'));

// Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

function executeQuery([query, param], callback) {
    connection.query(query, param, function (err, rows, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        return callback(rows);
    });
}

var user_name_vars = function (email, callback) {
    dbname =  '';
    idRole =  '';
    dbpwd =  '';
    var sql = "SELECT name, idRole, password FROM magazine.Users WHERE email = ?";

    executeQuery([sql, email], function (err, rows) {
        if (err) {
            callback([email, "server error", err]);
        } else {
            let string = JSON.stringify(result);
            let json =  JSON.parse(string);
            if(json && json[0] && 'name' in json[0]){
                dbname = json[0].name;
                idRole = json[0].idRole;
                dbpwd = json[0].password;
                callback([dbname, idRole, dbpwd]);
            } else {
                callback([email, "response error", json]);
            }
        }
    });
}

var user_role_var = function (email, callback) {
    roleName = '';
    res = '';
    var sql = "SELECT role FROM magazine.Roles WHERE id = ?;";
    connection.query(sql, idRole, function (err, result) {
        if (err) {
            console.log('query err ', err);
            res = err;
        } else {
            let json =  JSON.parse(JSON.stringify(result));
            if(json && json[0] && 'role' in json[0]){
                roleName = json[0].role;
                res = roleName;
            } else {
                res = json;
            }
        }
        callback(res);
    })
}


// Route to welcome
app.post('/welcome', (req, res) => {
    email = req.body.email;
    password = req.body.password;

    userName = '';
    idRole = 'Guest';
    pwd = '';
    user_name_vars(email, function(result) {
        if(!result || !result[2] || !result[2][0]) {
            let jsres = JSON.stringify({ name: email, role: "Guest" });
            res.send(jsres);
            return;
        }
        userName = result[2][0].name;
        idRole = result[2][0].idRole;
        pwd = result[2][0].password;
        if(!userName) {
            let jsres = JSON.stringify({ name: email, role: "Guest" });
            res.send(jsres);
            return;
        }
        if(password != pwd) {
            let jsres = JSON.stringify({ name: email, error: "Invalid Password" });
            res.send(jsres);
            return;
        } else {
            user_role_var(idRole, function(result) {
                let role = result[0];
                let jsres = JSON.stringify({ name: userName, role: roleName });
                res.send(jsres);
                return;
            });
            return;
        }
        let jsres = JSON.stringify({ 'Server Error': 'Unknown' });
        res.send(jsres);
    });
});

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
console.log(port);
app.listen(port, () => {
    console.log('Magazine Demo App is up and listening on port: ${port}');
})

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    console.log("Disconnected!");
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
    console.log('Goodbye!');
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
