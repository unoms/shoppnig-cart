export default class UIcart{
    constructor(selector){
        this.rootElement = document.querySelector(selector)
    }
    
    _createCartHtml(order, total){
        let html = "<h2>Your Cart</h2>";
        order.forEach(item => {
            html += ` 
            <div class="cart-product">
                <img src="./img/${item.product.img}" alt="${item.product.description}">
                <div class="cart-info">
                    <h3>${ item.product.description || ''}</h3>
                    <h4>$${ item.product.price || 0 }</h4>
                    <h4><a href="#" data-remove="true" data-cartId=${item.product.id}>Remove</a>
                </div>
                <div class="cart-amount" data-cartId=${item.product.id}>
                    <i class="fa fa-chevron-up" data-up="true"></i>
                    <span>${ item.quantity || 0 }</span>
                    <i class="fa fa-chevron-down" data-down="true"></i>
                </div>
            </div>
            `
        });

        //Add footer
        html += `
            <div class="cart-footer">
                <span>Your Total: <span class="cart-total">${ total || 0 }</span></span>
            </div>
        `
        return html
    }

    displayProducts(order, total){
        this.rootElement.innerHTML = ""
        const html = this._createCartHtml(order, total)
        this.rootElement.innerHTML = html
    }

}