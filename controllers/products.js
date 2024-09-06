const {response} = require('express');
const Producto = require('../models/Producto');

const obtenerProductos = async (req, res = response) => {
    const take = parseInt(req.query.take) || 10;
    const page = parseInt(req.query.skip) || 1;
    const skip = (page - 1) * take;

    try {
        // Obtener el total de documentos
        const total = await Producto.countDocuments();
        const totalPages = Math.ceil(total / take);

        // Obtener los productos con paginación y relaciones
        const productos = await Producto.find()
            .populate('tipoProducto', 'nombre')
            .populate('marca', 'nombre')
            .skip(skip)
            .limit(take);

        // Convertir la imagen a base64 si existe
        const productosConImagenBase64 = productos.map(producto => {
            const productoObj = producto.toObject();
            
            if (producto.imagen) {
                productoObj.imagen = `data:image/jpeg;base64,${producto.imagen.toString('base64')}`;
            }

            return productoObj;
        });

        res.status(200).json({
            ok: true,
            msg: 'Productos obtenidos con éxito',
            productos: {
                productos: productosConImagenBase64,
                page,
                total,
                totalPages
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener productos'
        });
    }
};



const guardarProducto = async (req, res = response) => {
    try {  
        const { nombre, medida, precio, esOferta, tipoProducto, marca } = req.body;

        const producto = new Producto({
            nombre,
            medida,
            precio,
            esOferta,
            tipoProducto,
            marca,
            imagen: req.file.buffer,
        });

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

const actualizarProducto = async (req, res) => {
    try {
      const { id } = req.params;  // El ID del producto a actualizar
      const { nombre, medida, precio, esOferta, tipoProducto, marca } = req.body;
  
      // Buscar el producto por ID
      const producto = await Producto.findById(id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      // Actualizar los campos del producto
      producto.nombre = nombre || producto.nombre;
      producto.medida = medida || producto.medida;
      producto.precio = precio || producto.precio;
      producto.esOferta = esOferta || producto.esOferta;
      producto.tipoProducto = tipoProducto || producto.tipoProducto;
      producto.marca = marca || producto.marca;
  
      // Verificar si se ha enviado una nueva imagen
      if (req.file) {
        producto.imagen = req.file.buffer;      // Actualizar la imagen como Buffer
      }
  
      // Guardar los cambios
      await producto.save();
  
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

module.exports = {
    obtenerProductos,
    guardarProducto,
    actualizarProducto,
}