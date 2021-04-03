import Product from '../js/Product.js'
import Order from '../js/Order.js'
import { test } from '@jest/globals'

//Mock products
const ardina5w30ST = new Product(68503, '', 10, '')
const ardina5w40 = new Product(68509, '', 11, '')
const ardina10w40 = new Product(68515, '', 5, '')
const ardina15w40 = new Product(68518, '', 7, '')

//Order
describe('Testing adding product to the order', ()=>{
    
    const order =  new Order()
    
    test('Add a product to the order', ()=>{
        order.addProduct(ardina5w30ST)
        const currentOrderState = order.getOrder()
        expect(currentOrderState[0].quantity).toBe(1)
    })

    test('Add one more product to the order', ()=>{
        order.addProduct(ardina5w30ST)
        const currentOrderState = order.getOrder()
        expect(currentOrderState[0].quantity).toBe(2)
    })

    test('Add a product and test the sum of the order', ()=>{
        order.addProduct(ardina5w40)
        expect(order.countOrder()).toBe(31)
    })

    test('Returning an order object', ()=>{
        const orderExpected = [
            { product: ardina5w30ST, quantity: 2 },
            { product: ardina5w40, quantity: 1 }
        ]    
        console.log(order.getOrder())  
        expect(order.getOrder()).toEqual(orderExpected)
    })

    test('Test total sum', ()=>{
        order.addProduct(ardina10w40)
        order.addProduct(ardina10w40)
        order.addProduct(ardina15w40)
        expect(order.countOrder()).toBe(48)
    })
})


describe('Testing removing products from the order', ()=>{
    const order = new Order()
    order.addProduct(ardina5w30ST)
    order.addProduct(ardina5w30ST)
    order.addProduct(ardina5w40)
    order.addProduct(ardina5w40)

    test('Testing removing a product from the order', ()=>{
        const orderExpected = [
            { product: ardina5w30ST, quantity: 2 },
            { product: ardina5w40, quantity: 1}
        ]
        order.reduceProductQuantity(ardina5w40)
        expect(order.getOrder()).toEqual(orderExpected)
    })

    test('Test total sum after removing a product', ()=>{
        expect(order.countOrder()).toBe(31)
    })

    test('Remove a product from the order completely', ()=>{
        const orderExpected = [
            { product: ardina5w40, quantity: 1 }
        ]
        order.removeProductCompletele(ardina5w30ST)
        expect(order.getOrder()).toEqual(orderExpected)
        expect(order.countOrder()).toBe(11)
    })
})