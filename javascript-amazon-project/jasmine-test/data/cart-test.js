import { addToCart , cartItems , loadFromStorage} from "../../data/cart.js"

describe('Test Suite: addToCart',() => {

    it('adds existing product to cart', () => {

        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify({
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionID: '1'
            })
        })       

        console.log(cartItems)

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cartItems[0].quantity).toEqual(2)

    })

    it('adds new product to cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([])
        })  

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    })

})
