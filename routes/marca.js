const { Router } = require('express');
const { obtenerMarcas, guardarMarca } = require('../controllers/marca');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();

router.get('/',obtenerMarcas);

router.post(
    '/newMarca',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    guardarMarca
);

module.exports = router;