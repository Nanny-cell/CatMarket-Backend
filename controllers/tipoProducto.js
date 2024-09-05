const {response} = require('express');
const TipoProducto = require('../models/TipoProducto');

const obtenerTipoProductos = async (req,res = response) => {
    const tipoProductos = await TipoProducto.find();


    res.status(200).json({
        ok: true,
        msg: 'Tipo de Productos obtenidos con éxito',
        tipoProductos,
    })
}

const guardarTipoProducto = async (req, res = response) => {
    const tipoProducto = new TipoProducto(req.body);

    try {
        const tipoProductoGuardado = await tipoProducto.save();
        res.status(201).json({
            ok: true,
            msg: 'tipo de producto creado con éxito',
            tipoProducto: tipoProductoGuardado,
        })
    } catch (err) {        
        res.status(500).json({
            ok: false,
            msg: 'Favor hablar con el administrador del sistema',
        })
    }
}

module.exports = {
    obtenerTipoProductos,
    guardarTipoProducto,
}