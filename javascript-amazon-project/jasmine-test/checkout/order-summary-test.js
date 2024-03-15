import { renderOrderSummary } from "../../scripts/checkout/order-summary.js"
import { cartItems , loadFromStorage } from "../../data/cart.js"

describe('Test Suite: OrderSummary',() => {
    const itemId1= 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const itemId2= 'e43638ce-6aa0-4b85-b27f-e1d07eb678c1';
    it('displays the cart',() =>{
        document.querySelector('.js-test-container')
        .innerHTML = `<div class = "js-checkout-order-list-container"></div>`
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: 1,
            },
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c1',
                quantity: 1,
                deliveryOptionId: 1,
            }
        ]);
    });
        loadFromStorage();
        
        renderOrderSummary();
        expect(document.querySelectorAll('.checkout-item-container').length).toEqual(2)
        expect(document.querySelector(`.js-item-quantity-${itemId1}`).innerHTML).toEqual('2')
    })

    it('removes the cart', () =>{
        document.querySelector('.js-test-container')
        .innerHTML = `<div class = "js-checkout-order-list-container"></div>`
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: 1,
            },
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c1',
                quantity: 1,
                deliveryOptionId: 1,
            }
        ]);
    });
        loadFromStorage();
        renderOrderSummary();

    })
   

})