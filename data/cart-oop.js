function Cart(key) {
    const cart = {
    cartItems: undefined,

    loadedFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(key));
        if(!this.cartItems) {
            this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]
        }
    },

    saveStorage() {localStorage.setItem(key, JSON.stringify(this.cartItems))},

    addToCart(productId) {

        const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`)
        const quantity = Number(quantitySelector.value);

        let matchingItem;
        this.cartItems.forEach(item => {
            if(productId === item.productId) {
                matchingItem = item;
            }
        });
        if(matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        });
    }
    this.saveStorage();},

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach(cartItem => {
            if(cartItem.productId !== productId) {
            newCart.push(cartItem)
            }
            }
        );
        this.cartItems = newCart;

        this.saveStorage();
        },

    updateCartQuantity(value) {
        let cartQuantity= this.cartItems.reduce((total, item) => total + item.quantity, 0);
        document.querySelector(value).textContent = cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
        const matchingItem = this.cartItems.find(item => item.productId === productId);
        
        if (!matchingItem) {
            return; // Товар не найден
        }
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        matchingItem.quantity = newQuantity;
        this.saveStorage();
    },
    
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach(item => {
            if(productId === item.productId) {
            matchingItem = item;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveStorage();
        }
}

return cart;
}

class Cart {
    cartItems = undefined;

    constructor(key){
        this.key = key;
    }

    loadedFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.key));
        if(!this.cartItems) {
            this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]
        }
    }

    saveStorage() {localStorage.setItem(this.key, JSON.stringify(this.cartItems))}

    addToCart(productId) {

        const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`)
        const quantity = Number(quantitySelector.value);

        let matchingItem;
        this.cartItems.forEach(item => {
            if(productId === item.productId) {
                matchingItem = item;
            }
        });
        if(matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        });
    }
    this.saveStorage();}

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach(cartItem => {
            if(cartItem.productId !== productId) {
            newCart.push(cartItem)
            }
            }
        );
        this.cartItems = newCart;

        this.saveStorage();
        }

    updateCartQuantity(value) {
        let cartQuantity= this.cartItems.reduce((total, item) => total + item.quantity, 0);
        document.querySelector(value).textContent = cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        const matchingItem = this.cartItems.find(item => item.productId === productId);
        
        if (!matchingItem) {
            return; // Товар не найден
        }
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        matchingItem.quantity = newQuantity;
        this.saveStorage();
    }
    
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach(item => {
            if(productId === item.productId) {
            matchingItem = item;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveStorage();
        }
}

const cart = Cart("cart-oop");
const businessCart = Cart("business-cart");

cart.loadedFromStorage();
businessCart.loadedFromStorage();

console.log(cart);
console.log(businessCart);

