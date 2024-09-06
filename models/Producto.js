const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    medida: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    esOferta: {
        type: String,
        required: true,
    },
    imagen: {
        type: Buffer, 
    },
    tipoProducto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProducto',
        required: true,
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'MarcaProducto',
        required: true,
    }
});

ProductoSchema.method('toJSON', function () {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Producto', ProductoSchema);
