const {response} = require('express');
const Producto = require('../models/Producto');

const obtenerProductos = async (req,res = response) => {

    const take = parseInt(req.query.take) || 10;
    const page = parseInt(req.query.skip) || 1;

    const skip = (page - 1) * take;

    const total = await Producto.countDocuments();
    const totalPages = Math.ceil(total / take);

    const productos = await Producto.find()
        .populate('tipoProducto', 'nombre')
        .populate('marca', 'nombre')
        .skip(skip)
        .limit(take);

    res.status(200).json({
        ok: true,
        msg: 'Productos obtenidos con éxito',
        productos: {
            productos,
            page,
            total,
            totalPages
        },
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