import updateItemsCount from './functions.js'
import Storage from './Storage.js'

export default class Adapter{
    constructor(uiCart){
        this.uiCart = uiCart
    }

    update(order, total, itemsCount){
        this.uiCart.displayProducts(order, total)
        Storage.storeOrder(order)
        updateItemsCount(itemsCount)
    }
}