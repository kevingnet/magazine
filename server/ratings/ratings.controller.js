const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const ratingService = require('./rating.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    ratingService.getAll()
        .then(rating => res.json(rating))
        .catch(next);
}

function getById(req, res, next) {
    ratingService.getById(req.params.id)
        .then(rating => res.json(rating))
        .catch(next);
}

function create(req, res, next) {
    ratingService.create(req.body)
        .then(() => res.json({ message: 'Rating created' }))
        .catch(next);
}

function update(req, res, next) {
    ratingService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Rating updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    ratingService.delete(req.params.id)
        .then(() => res.json({ message: 'Rating deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        rating: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        rating: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}
