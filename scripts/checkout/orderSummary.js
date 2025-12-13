import {cart,
        removeFromCart,
        updateCartQuantity,
        updateQuantity, 
        updateDeliveryOption} from "../../data/cart.js";
import {deliveryOptions, getDeliveryOptions} from "../../data/deliveryOptions.js";
import {products, getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function renderOrderSummary() {
let cartItemsHTML = "";

cart.forEach(cartItem => {
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptions(deliveryOptionId);

    const today = dayjs();
    const deliveryDay = today.add(deliveryOption.deliveryDays, "days").format('dddd, MMMM D');
    
    cartItemsHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${deliveryDay}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input class="quantity-input js-quantity-input" 
                    data-product-id="${matchingProduct.id}"
                    value="${cartItem.quantity}"
                    type="number" min="1" max="100">
                <span class="save-quantity-link link-primary js-save-link" 
                    data-product-id="${matchingProduct.id}">
                    Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>
    `

});

document.querySelector(".js-order-summary").innerHTML = cartItemsHTML;

function deliveryOptionsHTML (matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach(option => {
        const today = dayjs();
        const deliveryDay = today.add(option.deliveryDays, "days").format('dddd, MMMM D');

        const priceString = option.priceCents === 0 ? "FREE" : `$${formatCurrency(option.priceCents)} -`;

        const isChecked = option.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option js-delivery-option"
         data-product-id = "${matchingProduct.id}"
         data-option-id = "${option.id}">
            <input type="radio"
            ${isChecked ? "checked" : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${deliveryDay}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
            </div>
        </div>
        `
    })
    return html;
}

document.querySelectorAll(".js-delivery-option")
.forEach(option => {
    option.addEventListener("click", () => {
        const productId = option.dataset.productId;
        const optionId = option.dataset.optionId;
        updateDeliveryOption(productId, optionId);
        renderOrderSummary();
    });
});

updateCartQuantity(".js-home-link");

document.querySelectorAll(".js-delete-link")
.forEach((link) => {
    link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const remove = document.querySelector(`.js-cart-item-container-${productId}`);
    remove.remove();

    updateCartQuantity(".js-home-link");
    });
});

document.querySelectorAll(".js-update-link")
.forEach(link => {
    link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
    
});

document.querySelectorAll(".js-save-link")
.forEach(link => {
    link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`)
    .classList.remove("is-editing-quantity");

    const input = document.querySelector(".js-quantity-input");
    let inputData = Number(input.value);
    
    updateQuantity(productId, inputData);

    const quantityLabel = document.querySelector(".quantity-label")
    quantityLabel.textContent = inputData;

    updateCartQuantity(".js-home-link");
});
});
}