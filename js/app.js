import Repository from './Repository.js'
import UI from './UImain.js'
import Storage from './Storage.js'
import Order from './Order.js'
import UIcart from './UIcart.js'
import Adapter from './AdapterToOrder.js'

const $btnCart = document.querySelector('.nav-cart i.fa-cart-plus')
const $cartOverlay = document.querySelector('.cart-overlay')
const $cart = document.querySelector('.cart')
const $cartClose = document.querySelector('.cart .fa-window-close')


const uiCart =  new UIcart('.cart-container')
let order = new Order()
const adapter = new Adapter(uiCart)
order.addObserver(adapter)
let products = []

//Check if localstorage has an order
if(Storage.getOrder().length){
    order.setOrder(Storage.getOrder())
}

//Show a cart
$btnCart.addEventListener('click', ()=>{
    $cartOverlay.classList.add('showCartOverlay')
    $cart.classList.add('cartShow')
})

$cartClose.addEventListener('click', ()=>{
    $cart.classList.remove('cartShow')
    setTimeout(()=>{ $cartOverlay.classList.remove('showCartOverlay') }, 500)
})

//Get products
document.querySelector('.center-banner button')
    .addEventListener('click', ()=>{
        document.querySelector('.center-banner').style.display = "none"
        const repository = new Repository('products.json')
        repository.getProducts().then(data => {
            products = data
            const ui = new UI('.container-products', data)
            ui.displayProducts()
        })
})

//Clear the order
document.querySelector('.cart button')
    .addEventListener('click', (e)=>{
        order.removeOrder()
})

//Add an item to the cart
document.addEventListener('click', (e)=>{
    if(e.target.dataset.id){
        const product = products.find(product => product.id === parseInt(e.target.dataset.id, 10))
        order.addProduct(product)
    }
})

//chevron up and down handlers + remove
document.querySelector('.cart-container')
    .addEventListener('click', (e)=>{
        e.preventDefault()
        if(e.target.dataset.up){
            const id = parseInt(e.target.parentElement.dataset.cartid)
            const product = products.find(product => product.id === id)
            order.addProduct(product)
        }

        if(e.target.dataset.down){
            const id = parseInt(e.target.parentElement.dataset.cartid)
            const product = products.find(product => product.id === id)
            order.reduceProductQuantity(product)
        }

        if(e.target.dataset.remove){
            const id = parseInt(e.target.dataset.cartid)
            const product = products.find(product => product.id === id)
            order.removeProductCompletele(product)
        }
})
