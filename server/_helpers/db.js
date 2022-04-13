const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist

    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });

    // connect to db
    const sequelize = new Sequelize({
        database: 'magazine',
        dialect: "mysql",
        host: 'localhost',
        username: "root",
        password: "ChoosePassword",
        logging: true,
        isolationLevel: "READ COMMITTED"
    });

    // init models and add them to the exported db object
    db.Logon = require('../logon/logon.model')(sequelize);
    db.User = require('../users/user.model')(sequelize);
    db.Role = require('../roles/role.model')(sequelize);
    db.Category = require('../categories/category.model')(sequelize);
    db.Rating = require('../ratings/rating.model')(sequelize);
    db.ContentStatus = require('../contentStatuses/contentStatus.model')(sequelize);
    db.SubscriptionStatus = require('../subscriptionStatuses/subscriptionStatus.model')(sequelize);
    db.Contents = require('../contents/content.model')(sequelize);
    db.Subscriptions = require('../subscriptions/subscriptions.model')(sequelize);

    // sync all models with database
    await sequelize.sync({ alter: true });
}