import Product from './Product.js'

export default class Repository{
constructor(dbUrl){
    this.dbUrl =  dbUrl
}
    async getProducts(){
        let products = []
        try{
            const result = await fetch(this.dbUrl)
            const productsRaw = await result.json()
            products = productsRaw.products.map(el => {
                return new Product(el.id, el.description, el.price, el.img)
            })

        }catch(e){
            console.error(e)
        }
        return products
    }
}