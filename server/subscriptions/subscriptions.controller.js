const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const subscriptionService = require('./subscription.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    subscriptionService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    subscriptionService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    subscriptionService.create(req.body)
        .then(() => res.json({ message: 'Subscription created' }))
        .catch(next);
}

function update(req, res, next) {
    subscriptionService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Subscription updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    subscriptionService.delete(req.params.id)
        .then(() => res.json({ message: 'Subscription deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        subscription: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        subscription: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}
