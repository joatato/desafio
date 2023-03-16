import { Router } from 'express';

// DEBO CAMBIARLO A productManagerDB.js . Pero por el momento no me anda asi que lo dejamos así.
import productManager from '../dao/productManagerFS.js';

const router = Router();
const pm = new productManager();

router.get('/', async (req, res) => {
  let stock = await pm.getProduct();
  let products = stock;
  stock ? (stock = true) : (stock = false);

  res.status(200).render('home', {
    title: 'Estufas San Juan',
    existenciaDeStock: stock,
    productos: products,
  });
});

router.get('/realtimeproducts', async (req, res) => {
  let stock = await pm.getProduct();
  let products = stock;
  stock ? (stock = true) : (stock = false);

  res.status(200).render('realTimeProducts', {
    title: 'Estufas San Juan',
    existenciaDeStock: stock,
    productos: products,
  });
});

export default router; 