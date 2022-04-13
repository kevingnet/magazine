const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const subscriptionStatusService = require('./subscriptionStatus.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    subscriptionStatusService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    subscriptionStatusService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    subscriptionStatusService.create(req.body)
        .then(() => res.json({ message: 'SubscriptionStatus created' }))
        .catch(next);
}

function update(req, res, next) {
    subscriptionStatusService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'SubscriptionStatus updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    subscriptionStatusService.delete(req.params.id)
        .then(() => res.json({ message: 'SubscriptionStatus deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        subscriptionStatus: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        subscriptionStatus: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}
