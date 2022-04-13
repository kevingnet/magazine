const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.ContentStatus.findAll();
}

async function getById(id) {
    return await getContentStatus(id);
}

async function create(params) {
    // validate
    if (await db.ContentStatus.findOne({ where: { contentStatus: params.contentStatus } })) {
        throw 'ContentStatus "' + params.contentStatus + '" is already registered';
    }

    const contentStatus = new db.ContentStatus(params);

    // save contentStatus
    await contentStatus.save();
}

async function update(id, params) {
    const contentStatus = await getContentStatus(id);

    // validate
    const contentStatusChanged = params.contentStatus && contentStatus.contentStatus !== params.contentStatus;
    if (contentStatusChanged && await db.ContentStatus.findOne({ where: { contentStatus: params.contentStatus } })) {
        throw 'ContentStatus "' + params.contentStatus + '" is already registered';
    }

    // copy params to contentStatus and save
    Object.assign(contentStatus, params);
    await contentStatus.save();
}

async function _delete(id) {
    const contentStatus = await getContentStatus(id);
    await contentStatus.destroy();
}

// helper functions

async function getContentStatus(id) {
    const contentStatus = await db.ContentStatus.findByPk(id);
    if (!contentStatus) throw 'ContentStatus not found';
    return contentStatus;
}
