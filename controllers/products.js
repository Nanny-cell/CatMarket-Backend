const {response} = require('express');
const Producto = require('../models/Producto');

const obtenerProductos = async (req,res = response) => {
    const productos = await Producto.find();


    res.status(200).json({
        ok: true,
        msg: 'Productos obtenidos con éxito',
        productos,
    })
}

const guardarProducto = async (req, res = response) => {
    const producto = new Producto(req.body);
    try {
        const productoGuardado = await producto.save();
        res.status(201).json({
            ok: true,
            msg: 'tipo de producto creado con éxito',
            producto: productoGuardado,
        })
    } catch (err) {        
        res.status(500).json({
            ok: false,
            msg: 'Favor hablar con el administrador del sistema',
        })
    }
}

module.exports = {
    obtenerProductos,
    guardarProducto,
}