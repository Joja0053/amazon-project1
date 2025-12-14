import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
},
{
    id: '3',
    deliveryDays: 2,
    priceCents: 999,
}
];

export function getDeliveryOptions(optionId) {
    let deliveryOption;

    deliveryOptions.forEach(option => {
        if(option.id === optionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let deliveryDate = today;
    let daysToAdd = deliveryOption.deliveryDays;
    
    // Добавляем дни, пропуская выходные
    while (daysToAdd > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        
        // Проверяем, не является ли день выходным (0 - воскресенье, 6 - суббота)
        const dayOfWeek = deliveryDate.day();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            daysToAdd--;
        }
    }
    
    return deliveryDate.format('dddd, MMMM D');
}