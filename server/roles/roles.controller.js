const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const roleService = require('./role.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    roleService.getAll()
        .then(role => res.json(role))
        .catch(next);
}

function getById(req, res, next) {
    roleService.getById(req.params.id)
        .then(role => res.json(role))
        .catch(next);
}

function create(req, res, next) {
    roleService.create(req.body)
        .then(() => res.json({ message: 'Role created' }))
        .catch(next);
}

function update(req, res, next) {
    roleService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Role updated' }))
        .catch(next);
}


function _delete(req, res, next) {
    roleService.delete(req.params.id)
        .then(() => res.json({ message: 'Role deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}
