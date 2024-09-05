const { Schema, model } = require('mongoose');

const TipoProductoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
});

TipoProductoSchema.method('toJSON', function () {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('TipoProducto', TipoProductoSchema);