export let cartItems = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 1
    },

    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c1', 
        quantity: 1
    }

];

export function cartFunc(button){
    button.addEventListener('click',()=>{
        const productId = button.dataset.productId;
        const quantityValue = document.getElementById(`js-quantity-${productId}`).value;
        let matchingItem;
        let cartTotal = 0;
        cartItems.forEach((item) => {
          if(productId === item.productId){
            matchingItem = item;
          }
         })
          if(matchingItem){
            matchingItem.quantity += Number(quantityValue);
          }
          else{
            cartItems.push({ 
              productId: productId,
              quantity: Number(quantityValue)
            })
          }
          cartItems.forEach((item) => {
            cartTotal += item.quantity;
           })
    
        document.querySelector('.js-cart-quantity')
        .innerHTML = cartTotal;
    
        console.log(cartItems);
      })
}