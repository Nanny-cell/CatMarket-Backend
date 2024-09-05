const {response} = require('express');
const MarcaProducto = require('../models/MarcaProducto');

const obtenerMarcas = async (req,res = response) => {
    const marcas = await MarcaProducto.find();


    res.status(200).json({
        ok: true,
        msg: 'Marcas obtenidos con éxito',
        marcas,
    })
}

const guardarMarca = async (req,res = response) => {
    const marca = new MarcaProducto(req.body);

    try {
        const marcaGuardada = await marca.save();
        res.status(201).json({
            ok: true,
            msg: 'Marca creada con éxito',
            marca: marcaGuardada,
        })
    } catch (err) {        
        res.status(500).json({
            ok: false,
            msg: 'Favor hablar con el administrador del sistema',
        })
    }
}

module.exports = {
    obtenerMarcas,
    guardarMarca,
}