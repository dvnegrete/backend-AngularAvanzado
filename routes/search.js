const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getSearchAll, getCollection } = require('../controller/search');

const router = Router();

router.get('/all/:find', validateJWT, getSearchAll );

router.get('/collection/:table/:find', validateJWT, getCollection);

module.exports = router;