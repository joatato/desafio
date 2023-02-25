const express = require('express')
const PORT = 8080
const engine = require('express-handlebars').engine;
const app = express()
const Server = require('socket.io').Server;



const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const viewsRouter = require('./routes/views.router.js')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./src/public/assets/js'));

app.use('/api/products', (req, res, next) => {
    req.serverSocket = io
    next()
}, productsRouter)

app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)



const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});



const io = new Server(server);

io.on('connection', (socket) => {
    // console.log(socket.handshake);
    console.log(`Se han conectado, socket id ${socket.id}`)

    socket.emit('hola', {
        emisor: 'Servidor',
        mensaje: `Hola, desde el server...!!!`
    })

    socket.on('respuestaAlSaludo', (mensaje) => {
        console.log(`${mensaje.emisor} dice ${mensaje.mensaje}`);
    })

    socket.on('mensaje', (mensaje) => {
        console.log(`${mensaje.emisor} dice ${mensaje.mensaje}`);

        // socket.broadcast.emit('nuevoMensaje',mensaje)
        io.emit('nuevoMensaje', mensaje)

    })


})

let temperatura = 27;
let flag = 0;
setInterval(() => {
    // sensor midiendo algo... una lógica y códigos importantes... ta ta ta... y dispara el emit al final...
    // logica que uno requiera para su app... todo lo simple o compleja que sea...
    let aleatorio = Math.random();
    flag++;
    if (flag <= 3) {
        temperatura += aleatorio;
    } else {
        temperatura -= aleatorio;
        if (flag > 6) {
            flag = 0;
        }
    }
    io.emit('lecturaTemperatura', temperatura.toFixed(2));
}, 1500);
server.on('error', (error) => console.log(error));

