const { Router } = require('express');
const { obtenerProductos, guardarProducto } = require('../controllers/products');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();

router.get('/',obtenerProductos);

router.post(
    '/newProducto',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('medida', 'El nombre es obligatorio').not().isEmpty(),
        check('marca', 'El nombre es obligatorio').not().isEmpty(),
        check('precio', 'El nombre es obligatorio').not().isEmpty(),
        check('tipoProducto', 'El nombre es obligatorio').not().isEmpty(),
        check('marca', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    guardarProducto
);

module.exports = router;
