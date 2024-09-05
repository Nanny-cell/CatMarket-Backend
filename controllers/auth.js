const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt')


const crearUsuario = async (req,res = response) => {
    const { name, mail, password } = req.body;
    try {
        let usuario = await Usuario.findOne({mail})
        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente',
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar jwt
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: 'Registro creado',
            uid: usuario.id,
            name: usuario.name,
            token,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con administrador',
        })
    }
}

const login = async (req,res = response) => {

    const { mail, password } = req.body;

    try {
        const usuario = await Usuario.findOne({mail})
        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no valido',
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no valido',
            })
        }

        //Generar jwt
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(200).json({
            ok: true,
            msg: 'Login true',
            uid: usuario.id,
            name: usuario.name,
            token,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con administrador',
        })
    }
}

const revalidarToken = async(req,res = response) => {
    
    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        msg: 'Token revalidado',
        token,
    })
}



module.exports = {
    crearUsuario,
    login,
    revalidarToken,
}