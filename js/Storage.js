export default class Storage{
    static storeProducts(products){
        localStorage.setItem('products', JSON.stringify(products))
    }

    static getProducts(){
        return JSON.parse(localStorage.getItem('products')) || []
    }

    static storeOrder(order){
        localStorage.setItem('order', JSON.stringify(order))
    }

    static getOrder(){
        return JSON.parse(localStorage.getItem('order')) || []
    }

}