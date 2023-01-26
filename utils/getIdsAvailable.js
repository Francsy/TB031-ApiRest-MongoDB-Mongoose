const Product = require('../models/products')

const getIdAvailable = async () => {
    try {
        let allIds = await Product.find({}).distinct('id');
        allIds.sort((a,b) => a - b)
        let idsBeforeAvailable = allIds.filter((id, i) => id === i + 1 )
        let newId = idsBeforeAvailable.length + 1;
        return newId
    } catch (err) {
        throw err
    }
}

module.exports = getIdAvailable