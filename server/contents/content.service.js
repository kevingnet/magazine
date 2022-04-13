const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Content.findAll();
}

async function getById(id) {
    return await getContent(id);
}

async function create(params) {
    // validate
    if (await db.Content.findOne({ where: { content: params.content } })) {
        throw 'Content "' + params.content + '" is already registered';
    }

    const content = new db.Content(params);

    // save content
    await content.save();
}

async function update(id, params) {
    const content = await getContent(id);

    // validate
    const contentChanged = params.content && content.content !== params.content;
    if (contentChanged && await db.Content.findOne({ where: { content: params.content } })) {
        throw 'Content "' + params.content + '" is already registered';
    }

    // copy params to content and save
    Object.assign(content, params);
    await content.save();
}

async function _delete(id) {
    const content = await getContent(id);
    await content.destroy();
}

// helper functions

async function getContent(id) {
    const content = await db.Content.findByPk(id);
    if (!content) throw 'Content not found';
    return content;
}
