export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }
];
}

function saveStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {

    const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`)
    const quantity = Number(quantitySelector.value);

    let matchingItem;
    cart.forEach(item => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    });

    if(matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
    }

    saveStorage();
}

export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach(cartItem => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
    }
  );
  cart = newCart;

  saveStorage();
}

export function updateCartQuantity (value) {
  let cartQuantity= cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(value).textContent = cartQuantity;
}


export function updateQuantity(productId, newQuantity) {
    const matchingItem = cart.find(item => item.productId === productId);
    
    if (!matchingItem) {
        return; // Товар не найден
    }
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    matchingItem.quantity = newQuantity;
    saveStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach(item => {
    if(productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveStorage();
}
