const { Router } = require('express');
const { obtenerProductos, guardarProducto, actualizarProducto } = require('../controllers/products');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const multer = require('multer');


const upload = multer();

const router = Router();

router.get('/', obtenerProductos);

router.post(
    '/newProducto',
    upload.single('imagen'),
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

router.put('/updateProducto/:id', upload.single('imagen'), actualizarProducto)

module.exports = router;
