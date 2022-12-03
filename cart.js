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
            item = `<tr>
            <td>${items[i].item.id}</td>
            <td>${items[i].item.name}</td>
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
}