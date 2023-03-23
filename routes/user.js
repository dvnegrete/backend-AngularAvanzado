const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('./../middlewares/validar-campos');

const { getUsers, createUsers, updateUsers, deleteUsers } = require('./../controller/users');
const { validateJWT, validateAdminRole, validateAdminRoleOrSameUser } = require('../middlewares/validate-jwt');


const router = Router();

router.get("/", validateJWT, getUsers);

router.post("/", 
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('password', 'El Password es obligatorio').not().isEmpty(),
        check('email', 'El EMAIL es obligatorio').isEmail(),
        validarCampos
    ], 
    createUsers
);

router.put("/:id",
    [
        validateJWT,
        validateAdminRoleOrSameUser,
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        //check('password', 'El Password es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],  
    updateUsers
);

router.delete('/:id', 
        [validateJWT, validateAdminRole],
        deleteUsers);

module.exports = router;