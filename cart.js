window.onload = () => {
    let cartItems = []
    init()

    function init() {
        cartItems = JSON.parse(sessionStorage.getItem('cart')).items || []
        loadItems(cartItems)
        bindEvents()
    }

    function loadItems(items) {
        console.log(items)
        let pEl = document.getElementById('cart-items-list')
        var itemsTotal = 0
        let item = ''
        for (let i = 0; i < items.length; i++) {
            console.log(items[i])
            let itemTotal = items[i].item.price * items[i].amount
            console.log('total', itemTotal)
            item += `<tr>
            <td>${items[i].item.id}</td>
            <td>${items[i].item.title}</td>
            <td>${items[i].item.price}</td>
            <td>${items[i].amount}</td>
            <td>${itemTotal}</td>
            <td><button data-item-id="${items[i].item.id}" class="btn btn-danger remove-item-btn">Remove</button></td>
            </tr>`
            itemsTotal += itemTotal
        }
        pEl.innerHTML = item
        document.getElementById('total').innerHTML = itemsTotal.toFixed(2)
    }

    function bindEvents() {
        document.querySelectorAll('.remove-item-btn').forEach(function (el) {
            el.addEventListener('click', function (event) {
                let id = event.target.dataset.itemId
                console.log(id)
                removeItem(id)
            })
        })
    }
    function removeItem(id) {
        for (var i = 0; i < cartItems.length; i++) {

            if (cartItems[i].item.id === parseInt(id)) {
                cartItems.splice(i, 1)
                sessionStorage.setItem('cart', JSON.stringify({ item: cartItems }))
                init()
                break
            }
        }
    }
}