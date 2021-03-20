const cards = document.getElementById("cards")
const items  = document.getElementById("items")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        pintarCarrito()
    }
})
cards.addEventListener("click", e => {
    agregarCarrito(e)
})
items.addEventListener("click", e => {
    aumentarDisminuir(e)
})

const fetchData = async () => {
    try {
        const res = await fetch("api.json")
        const data = await res.json()
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto =>{
        templateCard.querySelector("h5").textContent = producto.title
        templateCard.querySelector("p").textContent = producto.precio
        templateCard.querySelector("img").setAttribute("src", producto.imagen)
        templateCard.querySelector(".btn-dark").dataset.id = producto.id
        const duplicado = templateCard.cloneNode(true)
        fragment.appendChild(duplicado)
    })
    cards.appendChild(fragment)
}

const agregarCarrito = e => {
    if (e.target.classList.contains("btn-dark")) {
        armarCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const armarCarrito = objeto => {
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        title: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1 
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito [producto.id] = {...producto}
    pintarCarrito()

}

const pintarCarrito = () => {
    items.innerHTML = ""
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id
        templateCarrito.querySelectorAll("td")[0].textContent = producto.title
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio

        const clonar = templateCarrito.cloneNode(true)
        fragment.appendChild(clonar)
    })
    items.appendChild(fragment)

    crearFooter ()

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const crearFooter = () => {
    footer.innerHTML = ""
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - Tus libros te esperan!</th>`
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad})=> acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll("td")[0].textContent = nCantidad
    templateFooter.querySelector("span").textContent = nPrecio

    const clonar = templateFooter.cloneNode(true)
    fragment.appendChild(clonar)
    footer.appendChild(fragment)

    const vaciarCarro = document.getElementById("vaciar-carrito")
    vaciarCarro.addEventListener("click", () => {
        carrito = {}
        pintarCarrito()
    })

    const compra = document.getElementById("comprar-carrito")
    compra.addEventListener("click", () => {
        $('.modal').fadeIn()
        carrito = {}
        pintarCarrito()
    })
}

const aumentarDisminuir = e => {
    //ACCION DE AUMENTAR
    if(e.target.classList.contains("btn-info")) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if(e.target.classList.contains("btn-danger")) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

