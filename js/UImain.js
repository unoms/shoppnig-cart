export default class UI{
    constructor(selector, productsToDesplay){
        this.rootElement = document.querySelector(selector)
        this.products = productsToDesplay
    }

    _createProductsHtml(){
        let html = "";
        this.products.forEach(product => {
            html += ` 
            <div class="product">
                <img src="./img/${product.img}" alt="${product.description}">
                <div class="product-info">
                    <h3>${product.description}</h3>
                    <h4>$${product.price}</h4>
                </div>
                <button class="btn-add" data-id=${product.id}>Add to Cart</button>  
            </div>`
        });
        return html
    }

    displayProducts(){
        const html = this._createProductsHtml()
        this.rootElement.innerHTML = html
    }
}