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


server.on('error', (error) => console.log(error));

