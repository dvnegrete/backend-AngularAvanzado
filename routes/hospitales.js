const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getHospitales, createHospitales, updateHospitales, deleteHospitales } = require('./../controller/hospitales');

const router = Router();

router.get('/', validateJWT ,getHospitales);

router.post("/", 
    [
        validateJWT,
        check('nombre', 'El Nombre del Hospital es necesario').not().isEmpty(),
        validarCampos   
    ], 
    createHospitales
    );
    
    router.put("/:id",
    [
        validateJWT,
        check('nombre', 'El Nombre del Hospital es necesario').not().isEmpty(),
    ],  
    updateHospitales
);

router.delete('/:id', validateJWT, deleteHospitales);


module.exports = router;