const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const { login, googleSyncIn, renewToken } = require('./../controller/auth');

const router = Router();

router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',    
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    googleSyncIn
)

router.get('/renew', validateJWT, renewToken)

module.exports = router;