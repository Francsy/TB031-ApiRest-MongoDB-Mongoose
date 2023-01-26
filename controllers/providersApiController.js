const Provider = require('../models/providers')
const Product = require('../models/products')

const getProviders = async (req, res) => {
    if (req.params.name){
        try {
            let provider = await Provider.find({company_name:req.params.name}, {"_id" : 0,"__v":0});
            if (provider.length>0) {
                res.status(200).json(provider[0]);
            }
            else {
                res.status(404).json({msj:"provider no encontrado por nombre: "+req.params.name});
            }    
        }
        catch(err){
            res.status(400).json({msj: err.message});
        }
    } else {

        try {
            let providers = await Provider.find({}, '-_id -__v');
            res.status(200).json(providers);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

const createProvider = async (req, res) => {
    const { company_name, CIF, address, url_web } = req.body;
    if (company_name && CIF && address && url_web) {
        try {
            const newProvider = new Provider({
                company_name,
                CIF,
                address,
                url_web
            })
            const answer = await newProvider.save();
            res.status(201).json(
                {
                    success: true,
                    message: 'Proveedor creado.',
                    newProvider
                }
            )
        } catch (err) {

            res.status(400).json({
                success: false, message: err.message
            })
        }
    } else {
        res.status(400).json({ success: false, message: 'Datos introducidos insuficientes' })
    }
}

const updateProvider = async (req, res) => {
    if (req.params.name) {
        const { name } = req.params;
        const { newName, CIF, address, url_web } = req.body;
        let provider = await Provider.findOne({ company_name: name })
        if (!provider) {
            res.status(404).json({ msj: `El proveedor con el nombre ${name} no existe` })
        }
        else {
            if (newName || CIF || address || url_web) {
                try {
                    const updateInfo = {
                        company_name: newName || provider.company_name,
                        CIF: CIF || provider.CIF,
                        address: address || provider.address,
                        url_web: url_web || provider.url_web
                    }
                    let providerUpdated = await Provider.findOneAndUpdate({ company_name: name }, updateInfo);
                    let answer = await providerUpdated.save();
                    console.log("Este es el console.log de lo que devuelve la api", answer);
                    res.status(201).json({
                        success: true,
                        message: 'Proveedor modificado.',
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
                    succes: false, message: 'Introduce un newName, CIF, address o url_web'
                })
            }
        }
    } else {
        res.status(400).json({
            succes: false, message: 'Introduce un id'
        })
    }
}

const deleteProvider = async (req, res) => {
    if (req.params.name) {
        try {
            const { name } = req.params
            let providerToDel = await Provider.findOne({ company_name: name })
            if (!providerToDel) {
                res.status(404).json({ msj: `El proveedor con el nombre ${name} no existe` })
            } else {
                let product = await Product.find({ provider: providerToDel._id }) //Se saca un arr con todos los productos asociados al proveedor
                if(product[0]) {
                    await Product.deleteMany({provider: providerToDel._id }) //Si al menos un producto asociado existe, se eliminan todos los productos
                }
                await Provider.findOneAndDelete({ company_name: name }); //Finalmente se elimina el proveedor
                res.status(201).json({
                    success: true,
                    message: 'Proveedor y productos asociados eliminados con éxito.'
                })
            }
        } catch (err) {
            res.status(400).json({
                success: false, message: err.message
            })
        }
    } else {
        res.status(400).json({ succes: false, message: 'Introduce un nombre de proveedor en la url' })
    }
}

module.exports = {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider
}