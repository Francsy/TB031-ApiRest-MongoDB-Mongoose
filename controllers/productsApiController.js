// Controlador - Lógica de negocio de la app
const Product = require('../models/products')
const Provider = require('../models/providers')

const getProducts = async (req,res) => {
    if (req.params.id) { // con ID
      try {
            // let product = await Product.find({id:req.params.id},'-_id -__v'); OOTRA OPCIón
            let product = await Product.find({id:req.params.id}, {"_id" : 0,"__v":0}).populate('provider', '-_id -__v'); // []
            if (product.length>0) {
                res.status(200).json(product[0]); // Respuesta de la API para 1 producto
            }
            else {
                res.status(404).json({msj:"producto no encontrado con ID "+req.params.id}); // Respuesta de la API para 1 producto
            }    
        }
        catch(err){
            res.status(400).json({msj: err.message});
        }

    } else { // sin ID --> TODOS los products
        try {
            let products = await Product.find({}).populate('provider', '-_id -__v').select('-_id -__v'); // []
            res.status(200).json(products); // Respuesta de la API para muchos productos
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(400).json({msj: error.message});
        }
    }
}

const createProduct = async (req,res) => {
 
    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const {id, title, price, description, image, providerName } = req.body; // {} nuevo producto a guardar
    if(id && title && price && description && image && providerName) {
            const provider = await Provider.find({company_name: providerName});
            console.log('*****************')
            console.log(provider[0])
            const provider_id = provider[0]._id.toString();
        try{
            const newProduct = new Product({
                id,
                title,
                price,
                description,
                image,
                provider:provider_id
            });
        // let response = await new Product(newProduct);
        let answer = await newProduct.save(); // objeto de vuelta de guardar en la bbdd
        console.log("Este es el console.log de lo que devuelve la api", answer);

        res.status(201).json({
            success: true,
        message: 'Producto creado.',
        product: newProduct
        })    
        }catch(err){
            console.log('Este es el error que devuelve la api', err);
            res.status(400).json({
                success: false, message: err.message
            })
        }
    } else {
        res.status(400).json({ success: false, message: 'Datos introducidos insuficientes' })
    }
}
/* 
PRUEBA:

{ "id": 1,
"title": "Heura",
"price": 3.80,
"description": "PlantBased Game changers",
"image":"https://www.heura.com.png",
"providerName": "COEXDI"
}

 */

module.exports = {
    getProducts,
    createProduct
}
