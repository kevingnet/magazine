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
    return await db.Rating.findAll();
}

async function getById(id) {
    return await getRating(id);
}

async function create(params) {
    // validate
    if (await db.Rating.findOne({ where: { rating: params.rating } })) {
        throw 'Rating "' + params.rating + '" is already registered';
    }

    const rating = new db.Rating(params);

    // save rating
    await rating.save();
}

async function update(id, params) {
    const rating = await getRating(id);

    // validate
    const ratingChanged = params.rating && rating.rating !== params.rating;
    if (ratingChanged && await db.Rating.findOne({ where: { rating: params.rating } })) {
        throw 'Rating "' + params.rating + '" is already registered';
    }

    // copy params to rating and save
    Object.assign(rating, params);
    await rating.save();
}

async function _delete(id) {
    const rating = await getRating(id);
    await rating.destroy();
}

// helper functions

async function getRating(id) {
    const rating = await db.Rating.findByPk(id);
    if (!rating) throw 'Rating not found';
    return rating;
}
