const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const userService = require('./user.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tutorials, totalPages, currentPage };
};

// route functions
function getAll(req, res, next) {
    const { page, size, idRole } = req.query;
    const { limit, offset } = getPagination(page, size);
    /*
    if(idRole) {
        const Op = Sequelize.Op;
        var condition = idRole ? { idRole: { [Op.eq]: `${idRole}` } } : null;
    } else {
        var condition = ''
    }
    userService.findAndCountAll(condition, limit, offset)
        .then(users => res.json(users))
        .catch(next);*/
    userService.getAll(limit, offset)
        .then(users => res.json(users))
        .catch(next);
}

function getAll1(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().username().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        token: Joi.string(),
        idRole: Joi.number().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        username: Joi.string().username().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        token: Joi.string(),
        idRole: Joi.number().empty(''), //db enforces idRole
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
