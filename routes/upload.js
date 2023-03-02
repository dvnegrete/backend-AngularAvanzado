const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, showFileImg } = require('../controller/uploads');

const router = Router();
const expressFileUpload = require('express-fileupload');

router.use(expressFileUpload());

router.put('/:type/:id', validateJWT,  fileUpload);

router.get('/:type/:foto', validateJWT, showFileImg)

module.exports = router;