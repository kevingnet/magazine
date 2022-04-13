const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Category.findAll();
}

async function getById(id) {
    return await getCategory(id);
}

async function create(params) {
    // validate
    if (await db.Category.findOne({ where: { category: params.category } })) {
        throw 'Category "' + params.category + '" is already registered';
    }

    const category = new db.Category(params);
    
    // save category
    await category.save();
}

async function update(id, params) {
    const category = await getCategory(id);

    // validate
    const categoryChanged = params.category && category.category !== params.category;
    if (categoryChanged && await db.Category.findOne({ where: { category: params.category } })) {
        throw 'Category "' + params.category + '" is already registered';
    }

    // copy params to category and save
    Object.assign(category, params);
    await category.save();
}

async function _delete(id) {
    const category = await getCategory(id);
    await category.destroy();
}

// helper functions

async function getCategory(id) {
    const category = await db.Category.findByPk(id);
    if (!category) throw 'Category not found';
    return category;
}
