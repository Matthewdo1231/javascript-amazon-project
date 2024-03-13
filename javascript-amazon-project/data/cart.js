export let cartItems;

loadFromStorage();

import { renderPaymentSummary } from "../scripts/checkout/payment-summary.js"

export function loadFromStorage(){
cartItems = JSON.parse(localStorage.getItem('cartItems'));

if(!cartItems){
  cartItems = [
   ]
  } 
} 

export function addToCart(productId,quantityValue){
  let matchingItem;
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
        quantity: Number(quantityValue),
        deliveryOptionId: 1
      })
    } 

        saveToStorage();
}  

export function cartFunc(button){
    button.addEventListener('click',()=>{
        const productId = button.dataset.productId;
        const quantityValue = document.getElementById(`js-quantity-${productId}`).value;

        addToCart(productId,quantityValue);
        
        displayCartTotal();
  
      })
}

export function removeFromCart(productId){
  const newCart = [];
  cartItems.forEach((cartItem) =>{
     if(cartItem.productId !== productId){
      newCart.push(cartItem);
     }
  })
  cartItems = newCart;
  renderPaymentSummary();
  saveToStorage();
}

export function saveToStorage(){
  localStorage.setItem('cartItems',JSON.stringify(cartItems));  
}



export function displayCartTotal(){
  let cartTotal = 0;
  cartItems.forEach((item) => {
    cartTotal += item.quantity;
   })
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartTotal;
    }

export function updateDeliveryOption(productId, optionId){
    cartItems.forEach((item)=>{
        if(productId == item.productId){
            item.deliveryOptionId = optionId;
        }
    })
    saveToStorage();
}  


