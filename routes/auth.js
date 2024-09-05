const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { revalidarToken, login, crearUsuario } = require('../controllers/auth');


const router = Router();

router.get('/renew', validarJWT, revalidarToken);

router.post(
    '/', 
    [
        check('mail','Mail Invalido').isEmail(),
        check('password','El password debe ser de minimo 6 caracteres').isLength({min: 6}),
        validarCampos,
    ],
    login
);

router.post(
    '/new', 
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('mail','Mail invalido').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos,
    ],
    crearUsuario
);

module.exports = router;