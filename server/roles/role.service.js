const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Role.findAll();
}

async function getById(id) {
    return await getRole(id);
}

async function create(params) {
    // validate
    if (await db.Role.findOne({ where: { role: params.role } })) {
        throw 'Role "' + params.role + '" is already registered';
    }

    const role = new db.Role(params);

    // save role
    await role.save();
}

async function update(id, params) {
    const role = await getRole(id);

    // validate
    const roleChanged = params.role && role.role !== params.role;
    if (roleChanged && await db.Role.findOne({ where: { role: params.role } })) {
        throw 'Role "' + params.role + '" is already registered';
    }

    // copy params to role and save
    Object.assign(role, params);
    await role.save();
}

async function _delete(id) {
    const role = await getRole(id);
    await role.destroy();
}

// helper functions

async function getRole(id) {
    id = 8;
    const role = await db.Role.findByPk(id);
    if (!role) throw 'Role not found';
    return role;
}
