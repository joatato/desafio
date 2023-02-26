const { Router } = require('express')
const router = Router()
const productManager = require('../manager/productManager')
const pm = new productManager("./src/files/products.json")

router.get('/', async (req, res) => {
    let stock = await pm.getProduct()
    let products = stock
    stock ? stock = true : stock = false

    res.status(200).render('home', {
        title: "Estufas San Juan",
        existenciaDeStock: stock,
        productos: products
    })
})

router.get('/realtimeproducts', async (req, res) => {
    let stock = await pm.getProduct()
    let products = stock
    stock ? stock = true : stock = false

    res.status(200).render('realTimeProducts', {
        title: "Estufas San Juan",
        existenciaDeStock: stock,
        productos: products
    })
})

module.exports = router