const Product = require('../models/products')
const Provider = require('../models/providers')
const getIdAvailable = require('../utils/getIdsAvailable') // Función para que los ids se asignen automaticamente

const getProducts = async (req, res) => {
    if (req.params.id) {
        try {
            let product = await Product.findOne({ id: req.params.id }, { "_id": 0, "__v": 0 }).populate('provider', '-_id -__v'); // []
            if (product) {
                res.status(200).json(product); // Respuesta de la API para 1 producto
            }
            else {
                res.status(404).json({ msj: "producto no encontrado con ID " + req.params.id }); // Respuesta de la API para 1 producto
            }
        }
        catch (err) {
            res.status(400).json({ msj: err.message });
        }

    } else {
        try {
            let products = await Product.find({}).populate('provider', '-_id -__v').select('-_id -__v').sort({id: 1}); // []
            res.status(200).json(products); // Respuesta de la API para muchos productos
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`)
            res.status(400).json({ msj: error.message });
        }
    }
}

const createProduct = async (req, res) => {

    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const { title, price, description, image, providerName } = req.body; // {} nuevo producto a guardar
    if (title && price && description && image && providerName) {
        const id = await getIdAvailable();
        const provider = await Provider.find({ company_name: providerName });
        const provider_id = provider[0]._id.toString();
        try {
            const newProduct = new Product({
                id,
                title,
                price,
                description,
                image,
                provider: provider_id
            });
            let answer = await newProduct.save();
            console.log("Este es el console.log de lo que devuelve la api", answer);

            res.status(201).json({
                success: true,
                message: 'Producto creado.',
                product: newProduct
            })
        } catch (err) {
            console.log('Este es el error que devuelve la api', err);
            res.status(400).json({
                success: false, message: err.message
            })
        }
    } else {
        res.status(400).json({ success: false, message: 'Datos introducidos insuficientes' })
    }
}

const updateProduct = async (req, res) => {
    if (req.params.id) {
        const { id } = req.params;
        const { title, price, description, image, providerName } = req.body;
        let product = await Product.findOne({ id })
        if (!product) {
            res.status(404).json({ msj: "producto no encontrado con ID " + req.params.id })
        }
        else {
            if (title || price || description || image) {
                try {
                    const updateInfo = {
                        title: title || product.title,
                        price: price || product.price,
                        description: description || product.description,
                        image: image || product.image
                    }
                    if (providerName) {
                        const provider = await Provider.findOne({ company_name: providerName })
                        updateInfo.provider = provider._id.toString()
                    }
                    let doc = await Product.findOneAndUpdate({ id }, updateInfo);
                    let answer = await doc.save();
                    console.log("Este es el console.log de lo que devuelve la api", answer);
                    res.status(201).json({
                        success: true,
                        message: 'Producto modificado.',
                        product: updateInfo
                    })
                } catch (err) {
                    console.log('Este es el error que devuelve la api', err);
                    res.status(400).json({
                        success: false, message: err.message
                    })
                }
            } else {
                res.status(400).json({
                    succes: false, message: 'Introduce un title, price, description o image'
                })
            }
        }
    } else {
        res.status(400).json({
            succes: false, message: 'Introduce un id'
        })
    }
}

const deleteProduct = async (req, res) => {
    if (req.params.id) {
        try {
            const { id } = req.params
            let product = await Product.findOne({ id })
            if (!product) {
                res.status(404).json({ msj: `El producto con id ${id} no existe` })
            } else {
                await Product.findOneAndDelete({ id });
                res.status(201).json({
                    success: true,
                    message: 'Producto eliminado.'
                })
            }
        } catch (err) {
            res.status(400).json({
                success: false, message: err.message
            })
        }
    } else {
        res.status(400).json({ succes: false, message: 'Introduce un id' })
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}
