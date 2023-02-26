let productMessage = document.querySelector('#mensajeDeActualizacion');
let divActualizador = document.getElementById('actualizador')
let socket = io();

/* socket.on('newProduct', (product) => {
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
}) */
socket.on('editProduct', async (products) => {
    console.log('Esto andaaaa!!!', products, products[0].title);
    divActualizador.innerHTML = ''
    for (const product of products) {
        divActualizador.innerHTML += `
    <li>
    <b> ${product.title}</b>
    <br>
    Precio: ${product.price}
    <br>
    Descripción: ${product.description}
    <br>
    </li>`
    }
    productMessage.innerHTML = `<p> Se ha editado la lista de productos </p>`


})

