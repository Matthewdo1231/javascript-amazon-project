import { addToCart , cartItems , loadFromStorage} from "../../data/cart.js"
import * as cartModule from "../../data/cart.js"

describe('Test Suite: addToCart',() => {

    it('adds existing product to cart', () =>{
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1,
            }]);
         });
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')  
        expect(cartItems[0].quantity).toEqual(2)
        console.log(cartItems)
    })

    it('adds new product to cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() =>{
            return JSON.stringify([])
        })  

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cartItems[0].quantity).toEqual(1);
    })

})


describe('Test Suite : Mon-method functions',() => {
   it('Testing imported non-method functions',() =>{
    const helloWorldTest = {
        helloWorld: cartModule.helloWorld
    }

    spyOn(helloWorldTest, 'helloWorld').and.callFake(()=>{
        console.log('wtf')
    })
    
    helloWorldTest.helloWorld()

    expect(helloWorldTest.helloWorld).toHaveBeenCalledTimes(1);
   })

})