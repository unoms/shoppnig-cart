export default class Order{

    constructor(){
        this._order = []
        this.observers = []
    }

    addObserver(observer){
        if(typeof observer.update === 'function'){
            this.observers.push(observer)
        }
    }

    addProduct(product){
        let index = this._order.findIndex( p => p.product.id === product.id)
        if(index === -1){  //new product
            this._order.push({ product: product, quantity: 1 })
        }else{
            this._order[index].quantity++
        }
        this.notifyObservers()
    }

    reduceProductQuantity(product){
        const index = this._order.findIndex( p => p.product.id === product.id )
        if(index === -1){ //No such product in the order
            return
        }else if( this._order[index].quantity >= 2){
            this._order[index].quantity--
        }else if(this._order[index].quantity === 1 ){
            this._order.splice(index, 1)
        }
        this.notifyObservers()
    }

    removeProductCompletele(product){
        const index = this._order.findIndex( p => p.product.id === product.id )
        if(index === -1){ //No such product in the order
            return
        }else{
            this._order.splice(index, 1)
        }
        this.notifyObservers()
    }

    removeOrder(){
        this._order = []
        console.log(this._order)
        this.notifyObservers()
    }

    countOrder(){
        let total =0;
        const len = this._order.length
        for(let i = 0; i < len; i++){
            total += this._order[i].quantity * this._order[i].product.price
        }
        return total
    }

    countItems(){
        let total = 0;
        this._order.forEach(item => total += item.quantity)
        return total
    }

    getOrder(){
        return this._order
    }

    setOrder(order){
        this._order = order
        this.notifyObservers()
    }

    notifyObservers(){
        this.observers.forEach(observer => {
            if(typeof observer.update === 'function'){
                observer.update(this._order, this.countOrder(), this.countItems())
            }
        })
    }

}

