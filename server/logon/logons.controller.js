const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const roleService = require('./logon.service');
const userService = require('../users/user.service');

var email = 'enter email address';

// routes

router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;
module.exports = getByEmail;

// route functions

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function getByEmail(res, next) {
    roleService.getByEmail(email)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    roleService.getAll()
        .then(role => res.json(role))
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
module.exports = email;
module.exports = getByEmail;
