import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

const PORT = 8080;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

const io = new Server(server);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public/assets/js'));

app.use('/api/products', (req, res, next) => {
  req.serverSocket = io;
  next();
}, productsRouter);

app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const env = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/pruebas_indices')
        // await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=base_clase9')
        console.log(`Conexión a servidor DB establecida...!!!`);

        // await cursoModelo.deleteMany({});
        // let resultado=await cursoModelo.create({
        //     codigo:109,
        //     nombre: 'Calculo II',
        //     horasPorSemana:8,
        //     temas:['limite','derivadas','integrales']
        // })
        // console.log(resultado);

        // await alumnoModelo.deleteMany({});
        // let resultado=await alumnoModelo.create({
        //     nombre:'Martin',
        //     apellido:'Palermo', dni:22000111,
        //     origen:'Argentina',
        //     cursando:[
        //         {
        //             curso:'640c8cefccef652b9d2f49b4'
        //         }
        //     ]
        // });
        // console.log(resultado)

    } catch (error) {
        console.log(error);
    }
}


env();

server.on('error', (error) => console.log(error));
