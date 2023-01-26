const mongoose = require('mongoose');
require('../utils/db_Mongo'); //conectarse a la base de datos FakeShop de Mongo

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true,
        unique: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Porfa, sólo imágenes JPG o PNG"
        }
    },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// Insertar un producto
// const p = new Product({
//     id: 1,
//     title: "Heura",
//     price: 3.80,
//     description: "PlantBased Game changers",
//     image:"https://www.heura.com.png",
//     provider: "63d0023844abf01339ee1697"
// });

// p.save().then((data)=>console.log(data));