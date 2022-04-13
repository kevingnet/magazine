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
    return await db.SubscriptionStatus.findAll();
}

async function getById(id) {
    return await getSubscriptionStatus(id);
}

async function create(params) {
    // validate
    if (await db.SubscriptionStatus.findOne({ where: { subscriptionStatus: params.subscriptionStatus } })) {
        throw 'SubscriptionStatus "' + params.subscriptionStatus + '" is already registered';
    }

    const subscriptionStatus = new db.SubscriptionStatus(params);

    // save subscriptionStatus
    await subscriptionStatus.save();
}

async function update(id, params) {
    const subscriptionStatus = await getSubscriptionStatus(id);

    // validate
    const subscriptionStatusChanged = params.subscriptionStatus && subscriptionStatus.subscriptionStatus !== params.subscriptionStatus;
    if (subscriptionStatusChanged && await db.SubscriptionStatus.findOne({ where: { subscriptionStatus: params.subscriptionStatus } })) {
        throw 'SubscriptionStatus "' + params.subscriptionStatus + '" is already registered';
    }

    // copy params to subscriptionStatus and save
    Object.assign(subscriptionStatus, params);
    await subscriptionStatus.save();
}

async function _delete(id) {
    const subscriptionStatus = await getSubscriptionStatus(id);
    await subscriptionStatus.destroy();
}

// helper functions

async function getSubscriptionStatus(id) {
    const subscriptionStatus = await db.SubscriptionStatus.findByPk(id);
    if (!subscriptionStatus) throw 'SubscriptionStatus not found';
    return subscriptionStatus;
}
