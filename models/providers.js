const mongoose = require('mongoose');
require('../utils/db_Mongo'); //conectarse a la base de datos FakeShop de Mongo

const objectSchema = {
    company_name: { 
        type: String, 
        required: true,
        unique: true
    },
    CIF: { 
        type: String, 
        required: true,
        unique: true
    },
    address: { 
        type: String, 
        required: true 
    },
    url_web: { 
        type: String, 
        required: true,
        unique: true
    }
};
// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;


// Insertar un provider
// const p = new Provider({
//     company_name: "COEXDI",
//     CIF: "08049394854K",
//     address: "Plaza del Pilar Redondo",
//     url_web: "www.coexdi.es"
// });

// p.save().then((data)=>console.log(data));

