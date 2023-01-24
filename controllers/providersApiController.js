const Provider = require('../models/providers')

const getProviders = async (req, res) => {
    try {
        let providers = await Provider.find({}, '-_id -__v');
        res.status(200).json(providers);
    } catch (err) {
        res.status(400).json({ message: err.message });
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

module.exports = {
    getProviders,
    createProvider
}