document.addEventListener('DOMContentLoaded', () => {
    const cardElements = document.querySelectorAll('.card');
    const cart = JSON.parse(sessionStorage.getItem('cart')) || {};

    cardElements.forEach((card, index) => {
        const cardTitleElement = card.querySelector('.card-title');
        const itemPriceElement = card.querySelector('#price');
        const itemPrice = parseInt(itemPriceElement.textContent.split(" ")[1]);
        const itemName = cardTitleElement.textContent.trim();
        const countElement = card.querySelector('.count');
        const addToCartButton = card.querySelector('.add-to-cart');
        const itemId = addToCartButton.getAttribute('data-item-id')
        const minusButton = card.querySelector('.minus');
        const plusButton = card.querySelector('.plus');

        minusButton.addEventListener('click', () => {
            if (cart[itemId] > 0) {
                cart[itemId] -= 1;
                countElement.textContent = cart[itemId];
            }
        });

        plusButton.addEventListener('click', () => {
            cart[itemId] = (cart[itemId] || 0) + 1;
            countElement.textContent = cart[itemId];
        });

        addToCartButton.addEventListener('click', () => {
            if (cart[itemId] == 0) {
                delete cart[itemId];
            }
            sessionStorage.setItem('cart', JSON.stringify(cart));
            addToList(itemName, itemPrice, cart[itemId], itemId);
            console.log(cart);
        });
    });

    function addToList(itemName, itemPrice, value, itemId) {
        var itemlist = document.getElementById('itemlist');
        var addeditems = [];
        // Object.entries(cart).forEach(([key, value]) => {
        if (!Object.keys(cart).includes(itemId)) {
            delitem = document.getElementById(`${itemId}`);
            itemlist.removeChild(delitem);
            addeditems.pop(`${itemId}`);
        } else if (addeditems.includes(itemId)) {
            upditem = document.getElementById(`${itemId}`);
            upditem.textContent = `${itemName} - ${value} - ${itemPrice} - ${value * itemPrice}`;
        } else {
            const newItem = document.createElement("li");
            newItem.textContent = `${itemName} - ${value} - ${itemPrice} - ${value * itemPrice}`;
            newItem.id = `${itemId}`;
            addeditems.push(`${itemId}`);
            itemlist.appendChild(newItem);
        }
        console.log(cart);
        console.log(addeditems);
        // itemlist.textContent = `${itemName} - ${value} - ${itemPrice} - ${value * itemPrice}`;
        // });
    }
    showVNVFilter();
});

function showVNVFilter() {
    const filters = document.getElementById('filters');
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');

    if (['All', 'Main Course', 'Appetizers'].includes(section)) {
        filters.style.display = 'block';
        vnvfilter();
    } else {
        filters.style.display = 'none';
    }
}

function vnvfilter() {
    const allFilterInput = document.getElementById('all');
    const vegFilterInput = document.getElementById('veg');
    const nonvegFilterInput = document.getElementById('nonveg');
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    allFilterInput.addEventListener('click', () => {
        window.location.href = `${window.location.origin}${window.location.pathname}?section=${section}`;
    });
    vegFilterInput.addEventListener('click', () => {
        window.location.href = `${window.location.origin}${window.location.pathname}?section=${section}&category=Veg`;
    });
    nonvegFilterInput.addEventListener('click', () => {
        window.location.href = `${window.location.origin}${window.location.pathname}?section=${section}&category=Non-Veg`;
    });
}


