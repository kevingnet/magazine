const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    findAndCountAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(pageSize = 4, pageOffset = 0 ) {
    return await db.User.findAll({
        offset: pageOffset, limit: pageSize});
}

async function findAndCountAll(condition = '', pageSize = 4, pageOffset = 0 ) {
    return await db.User.findAndCountAll({
        where: condition, offset: pageOffset, limit: pageSize});
}

async function getById(id) {
    return await getUser(id);
}

async function getByName(name) {
    return await getUserFromName(name);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = new db.User(params);
    // hash password
    user.password = await bcrypt.hash(params.password, 10);

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

async function getUserFromName(name) {
    const user = await db.User.findOne(name);
    if (!user) throw 'User not found';
    return user;
}
