class Cart {
    cartItems = undefined;
    #key;
    constructor(key){
        this.#key = key;
        this.#loadedFromStorage();
    }

    #loadedFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#key));
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

    saveStorage() {
        localStorage.setItem(this.#key, JSON.stringify(this.cartItems))
    }

    addToCart(productId) {
        // Проверяем, загружены ли данные из хранилища
        if (this.cartItems === undefined) {
            console.error('Необходимо сначала вызвать loadedFromStorage()');
            return;
        }
        
        let matchingItem;
        this.cartItems.forEach(item => {
            if(productId === item.productId) {
                matchingItem = item;
            }
        });
        
        if(matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }
        this.saveStorage();
    }

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach(cartItem => {
            if(cartItem.productId !== productId) {
                newCart.push(cartItem)
            }
        });
        this.cartItems = newCart;

        this.saveStorage();
    }

    updateCartQuantity(value) {
        let cartQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        document.querySelector(value).textContent = cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        const matchingItem = this.cartItems.find(item => item.productId === productId);
        
        if (!matchingItem) {
            return; // Товар не найден
        }
        
        if (newQuantity <= 0) {
            this.removeFromCart(productId); // Добавлен this
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

// Правильный порядок использования:
const cart = new Cart("cart-oop");
cart.loadedFromStorage(); // Сначала загружаем данные
cart.addToCart("8c9c52b5-5a19-4bcb-a5d1-158a74287c53"); // Затем добавляем товар

const businessCart = new Cart("business-cart");
businessCart.loadedFromStorage(); // Сначала загружаем данные
businessCart.addToCart("8c9c52b5-5a19-4bcb-a5d1-158a74287c53"); // Затем добавляем товар
businessCart.addToCart("8c9c52b5-5a19-4bcb-a5d1-158a74287c53"); // Затем добавляем товар

console.log(cart);
console.log(businessCart);