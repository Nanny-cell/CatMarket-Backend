const { Schema, model } = require('mongoose');

const MarcaProductoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
});

MarcaProductoSchema.method('toJSON', function () {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('MarcaProducto', MarcaProductoSchema);