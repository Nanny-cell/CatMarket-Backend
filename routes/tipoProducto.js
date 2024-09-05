const { Router } = require('express');
const { obtenerTipoProductos, guardarTipoProducto } = require('../controllers/tipoProducto');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();

router.get('/',obtenerTipoProductos);

router.post(
    '/newTipoProducto',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    guardarTipoProducto
);

module.exports = router;
