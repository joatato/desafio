import { Schema, model } from "mongoose";

const cartsColeccion = 'carts';

const cartsEsquema = new Schema({
    products: [
        {
            quantity: Number
        }
    ]
});

export const cartsModelo = model(cartsColeccion, cartsEsquema)
