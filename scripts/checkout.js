import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { loadProductFetch } from '../data/products.js';
//import "../../data/cart-oop.js";
//import "../data/backend-practice.js";

async function loadPage() {
    await loadProductFetch();

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
new Promise((resolve) => {
    loadProductFetch(() => {
        resolve();
    });
}).then(() => {
    renderPaymentSummary();
    renderOrderSummary();
});
*/

/*loadProduct(() => {
    renderPaymentSummary();
    renderOrderSummary();
});
*/
