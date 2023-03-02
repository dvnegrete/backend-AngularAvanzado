const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getMedicos, createMedicos, updateMedicos, deleteMedicos,  } = require('../controller/medicos');

const router = Router();

router.get('/', validateJWT, getMedicos);

router.post("/", 
    [
        validateJWT,
        check('nombre', "El nombre del Medico es Obligatorio").not().isEmpty(),        
        check('hospital', "El Hospital ID debe ser valido").isMongoId(),
        validarCampos
    ], 
    createMedicos
);

router.put("/:id",
    [
        validateJWT,
    ],  
    updateMedicos
);

router.delete('/:id', validateJWT, deleteMedicos);


module.exports = router;