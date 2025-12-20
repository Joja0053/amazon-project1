import {cart,
        removeFromCart,
        updateCartQuantity,
        updateQuantity, 
        updateDeliveryOption} from "../../data/cart.js";
import {deliveryOptions, getDeliveryOptions} from "../../data/deliveryOptions.js";
import { orders, addToOrder } from "../../data/orders.js";
import {products, getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";

console.log(orders);

export function renderPaymentSummary() {
        let productPriceCents = 0;     
        let shippingPriceCents = 0;

        cart.forEach(cartItem => {

            const product = getProduct(cartItem.productId);
            productPriceCents += product.priceCents * cartItem.quantity;
            
            const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
            shippingPriceCents += deliveryOption.priceCents;
});

const totalBeforeTax = productPriceCents + shippingPriceCents;
const taxCents = totalBeforeTax * 0.1;
const totalCents = totalBeforeTax + taxCents;

let html = '';

html += `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.reduce((total, item) => total + item.quantity, 0)}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
`;

document.querySelector(".js-payment-summary").innerHTML = html;

document.querySelector(".js-place-order")
.addEventListener("click", async () => {
  const response = await fetch("https://supersimplebackend.dev/orders", {
    method: "POSt",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      cart: cart
    })
  });

  const order = await response.json();
  addToOrder(order);

  window.location.href = "orders.html";
});
}