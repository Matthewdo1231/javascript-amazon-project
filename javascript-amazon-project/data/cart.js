export let cart = [];

export function cartFunc(button){
    button.addEventListener('click',()=>{
        const productName = button.dataset.productName;
        const quantityValue = document.getElementById(`js-quantity-${productName}`).value;
        let matchingItem;
        let cartTotal = 0;
        cart.forEach((item) => {
          if(productName === item.productName){
            matchingItem = item;
          }
         })
          if(matchingItem){
            matchingItem.quantity += Number(quantityValue);
          }
          else{
            cart.push({
              productName: productName,
              quantity: Number(quantityValue)
            })
          }
          cart.forEach((item) => {
            cartTotal += item.quantity;
           })
    
        document.querySelector('.js-cart-quantity')
        .innerHTML = cartTotal;
    
        console.log(cart);
      })
}