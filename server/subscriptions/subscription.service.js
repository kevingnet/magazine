const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Subscription.findAll();
}

async function getById(id) {
    return await getSubscription(id);
}

async function create(params) {
    // validate
    if (await db.Subscription.findOne({ where: { subscription: params.subscription } })) {
        throw 'Subscription "' + params.subscription + '" is already registered';
    }

    const subscription = new db.Subscription(params);

    // save subscription
    await subscription.save();
}

async function update(id, params) {
    const subscription = await getSubscription(id);

    // validate
    const subscriptionChanged = params.subscription && subscription.subscription !== params.subscription;
    if (subscriptionChanged && await db.Subscription.findOne({ where: { subscription: params.subscription } })) {
        throw 'Subscription "' + params.subscription + '" is already registered';
    }

    // copy params to subscription and save
    Object.assign(subscription, params);
    await subscription.save();
}

async function _delete(id) {
    const subscription = await getSubscription(id);
    await subscription.destroy();
}

// helper functions

async function getSubscription(id) {
    const subscription = await db.Subscription.findByPk(id);
    if (!subscription) throw 'Subscription not found';
    return subscription;
}
