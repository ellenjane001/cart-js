const products = [
    {
        id: 1, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", name: "product1", price: 25
    },
    {
        id: 2, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", name: "product2", price: 500
    },
    {
        id: 3, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80", name: "product3", price: 10
    },
    {
        id: 4, img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", name: "product4", price: 16
    },
    {
        id: 5, img: "https://images.unsplash.com/photo-1577058109956-67adf6edc586?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", name: "product5", price: 175
    },
]
window.onload = () => {
    let items = []
    let cartItems = []
    getItems()
    init()
    function init() {
        console.log('function init was called')
        if (sessionStorage.cart)
            cartItems = JSON.parse(sessionStorage.getItem('cart')).items
        else
            sessionStorage.setItem('cart', JSON.stringify({ items: [] }))
        updateCartIndicator()
    }
    function getItems() {
        items = [...products]
        createItems(products)
        bindEvents()
    }
    function createItems(data) {
        let itemsList = document.querySelector('#items-list')
        itemsList.innerHTML = ''
        let item = ''
        for (let i = 0; i < data.length; i++) {
            item += `<div class="col">
                        <div class="thumbnail card">
                        <img src='${data[i].img}' alt='${data[i].name}' class="card-img-top"/>
                            <div class="caption p-3">
                            <h3 class="d-flex justify-content-between">${data[i].name} 
                            <span class="label label-default">$${data[i].price}</span>
                                </h3>
                                <p><button data-item-id='${data[i].id}' class='btn btn-primary add-to-cart'>Add to Cart</button></p>
                            </div>
                        </div>
                    </div>`
        }
        itemsList.innerHTML = item
    }
    function bindEvents() {
        document.querySelectorAll('.add-to-cart').forEach(function (e) {
            e.addEventListener('click', function (event) {
                const id = event.target.dataset.itemId
                const button = this;
                button.innerHTML = 'Adding...'
                button.setAttribute('disabled', true)
                setTimeout(() => {
                    button.innerHTML = 'Add to Cart'
                    button.removeAttribute('disabled')
                    addItem(id)
                    updateCartIndicator()
                }, 1000)
            })
        })
    }
    function addItem(id) {
        let itemObj = items.filter(item => {
            return item.id === parseInt(id)
        })[0]
        let itemInCart = cartItems.filter(item => {
            return item.id === id
        })[0]
        if (itemInCart)
            itemInCart.amount++
        else
            cartItems.push({ item: itemObj, amount: 1 })
        sessionStorage.setItem('cart', JSON.stringify({ items: cartItems }))
    }

    function updateCartIndicator() {
        let itemsTotal = 0
        console.log('cart', cartItems)
        for (let i = 0; i < cartItems.length; i++) {
            itemsTotal += cartItems[i].amount
        }
        document.getElementById('cart-items-num').innerHTML = itemsTotal
    }
}