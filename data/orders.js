export const orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveToStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

export function addToOrder(order) {
    orders.unshift(order);
    saveToStorage();
}