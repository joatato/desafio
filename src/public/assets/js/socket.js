// console.log("hola");
let nombre = prompt("Ingrese su nombre:");

let divMensajes = document.querySelector('#mensajes');
let textMensaje = document.querySelector('#mensaje');
let productMessage = document.querySelector('#mensajeDeActualizacion');
let divTemperatura = document.getElementById('temperatura');
let divActualizador = document.getElementById('actualizador')

if (textMensaje) {
    textMensaje.addEventListener('keyup', (evento) => {
        // console.log(evento.key, evento.keyCode, evento.target.value);
        if (evento.keyCode == 13) {
            if (evento.target.value.trim() != '') {
                socket.emit('mensaje', {
                    emisor: nombre,
                    mensaje: evento.target.value
                })
                textMensaje.value = '';
                textMensaje.focus();
            }

        }
    })

}

/* const watchChange = () => {
    socket.on('nuevoMensaje', () => {
        divMensajes.innerHTML += `<br>dice: <i>Se ha añadido un nuevo Producto</i>`
    })
}
module.exports = watchChange() */

let socket = io();

socket.on('connection', (data) => {
    console.log('Se ha enlazado')
})

socket.on('lecturaTemperatura', (temperatura) => {
    divTemperatura.innerHTML = temperatura;
})

socket.on('hola', (objeto) => {
    console.log(`${objeto.emisor} dice ${objeto.mensaje}`)

    socket.emit('respuestaAlSaludo', {
        emisor: nombre,
        mensaje: `Hola, desde el Frontend`
    })
})

socket.on('nuevoMensaje', (mensaje) => {
    divMensajes.innerHTML += `<br><strong>${mensaje.emisor}</strong> dice: <i>${mensaje.mensaje}</i>`
})

socket.on('newProduct', (product) => {
    console.log('Esto andaaaa!!!');
    productMessage.innerHTML = `<p> Se ha añadido un nuevo producto </p><b>${product.title}</b>`
    divActualizador.innerHTML += `<li>
    <b> ${product.title}</b>
    <br>
    Precio: ${product.price}
    <br>
    Descripción: ${product.description}
    <br>
    </li>`
})