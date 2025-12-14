import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import isSatSun from './utils/isWeekend.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

renderPaymentSummary();
renderOrderSummary();

const date = dayjs().format("dddd");

console.log(isSatSun(date));