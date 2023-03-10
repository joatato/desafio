import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { productModels } from './models/productModels.js';

export default class productManager {

    constructor() {
    }

    async getProduct(req, res) {

        let products;
        try {
            products = await productModels.find()
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener products de la DB`
            })
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            products
        })

    }

    async addProduct(req, res) {

        // faltan las validaciones:
        // - que lleguen todos los datos necesarios, obligatorios (hay que mirar en el Schema,
        // lo que definimos como required)
        // - que no se generen duplicados en la coleccion (en el Schema estar atentos a los unique)
        // ... etc....
        

        /* res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({
            productsCreados
        }) */

        let product = req.body
        console.log(product);
        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || Object.keys(product).some(key => key !== 'title' && key !== 'description' && key !== 'code' && key !== 'price' && key !== 'stock' && key !== 'category' && key !== 'thumbnail')) {
            res.setHeader('Content-Type', 'application/json')
            let falta = []
            if (!product.title) {
                falta.push("title")
            }
            if (!product.description) {
                falta.push("description")
            }
            if (!product.code) {
                falta.push("code")
            }
            if (!product.price) {
                falta.push("price")
            }
            if (!product.stock) {
                falta.push("stock")
            }
            if (!product.category) {
                falta.push("category")
            }
            falta.join(", ")
            if (falta.length) {
                res.setHeader('Content-Type', 'application/json')
                return res.status(400).json({
                    message: `400 Bad Request. Debe ingresar: ${falta}. Para poder cargar el producto`,
                    product
                })
            }
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({
                message: `400 Bad Request. Hay par??metros que est?? ingresando de sobra.`,
                product
            })
        }
        let productsCreados = await productModels.create(product);
        if (productsCreados) {
            let products = await pm.getProduct()
            io.emit('editProduct', products);

            console.log(productsCreados)
            res.setHeader('Content-Type', 'application/json')
            return res.status(201).json({
                message: `Todo ok...!`,
                product
            })
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(400).json({
                message: `400 Bad Request. El product con c??digo: ${product.code} . Ya existe en la base de datos`
            })
        }



    }

    /* async addProduct(product) {
        let products = await this.getProduct() 
        let code = products.findIndex(pr => pr.code == product.code)
        if (code == -1) {
            product.status = true
            product.id = uuidv4()
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))
            return true
        } else {
            console.log(`El producto con c??digo: ${product.code} . Ya existe en ${this.path}`)
            return false
        }
    } */

    async getProductById(id) {
        let products = await this.getProduct()
        let copiaProduct = {}
        for (const producto of products) {
            if (producto.id == id) {
                copiaProduct = producto
                console.log(producto)
                return copiaProduct
            }
        }
        return false
    }

    async updateProduct(id, key, value) {
        let products = await this.getProduct()
        let existencia = products.findIndex(pr => pr.id == id)
        if (existencia !== -1) {
            products[existencia][key] = value
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))
        }
    }

    async deleteProduct(id) {
        let products = await this.getProduct()
        let quePaso = products.filter(pr => pr.id == id)
        if (quePaso != -1) {
            let updatedProducts = products.filter(producto => producto.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 5))
            return true
        }
        return false
    }
}

