import { cartItems, removeFromCart } from "../data/cart.js"
import { products } from "../data/products.js"
import {deliveryOption} from "../data/deliveryoption.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

let checkoutItemHtml = '';

console.log('asdasd') 
    
cartItems.forEach((cartItem) =>{
    let matchingProduct;
    products.forEach((product) => {
        if(cartItem.productId == product.id){
            matchingProduct = product;
        }
    })

    //!!!!!!  Make del option interactive

    checkoutItemHtml += 
    `<div class="checkout-item-container js-cart-item-container-${matchingProduct.id}" >
    <p class="checkout-item-delivery-date">Delivery date: Wednesday, March 6</p>
    <div class="checkout-item-details-grid">
    <div class="checkout-item-image-box">
        <img class="checkout-item-image" src="${matchingProduct.image}">
    </div>
    <div class="checkout-item-details">
        <p class="checkout-item-name">${matchingProduct.name}</p>
        <p class="checkout-item-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</p>
        <p class="checkout-item-quantity">Quantity: ${cartItem.quantity} <span class = "delete-quantity-link">Update</span> 
             <span class = "delete-quantity-link js-delete-quantity-link" data-product-id="${matchingProduct.id}">Delete</span></p>
    </div>
    <div class="checkout-item-delivery-date-options">
        <p class="choose-delivery-option-text">Choose a delivery option:</p>
        <div class="choose-delivery-date-option-box">   
        
         ${createDeliveryOptionHtml(matchingProduct)}

      </div>
    </div>
    </div>
    </div>`
});

document.querySelector('.js-checkout-order-list-container')
 .innerHTML = checkoutItemHtml;


 document.querySelectorAll('.js-delete-quantity-link')
  .forEach((link) => {
      link.addEventListener('click',()=> {
         const dataProductId = link.dataset.productId;
         removeFromCart(dataProductId)
          document.querySelector(`.js-cart-item-container-${dataProductId}`).remove();
      })
  })


  function createDeliveryOptionHtml(matchingProduct){
    let optionsHtml = '';
    deliveryOption.forEach((deliveryoption)=>{
      let today = dayjs();
      let deliveryOptiondate = today.add(deliveryoption.deliveryDays,'days');
      optionsHtml += `
        <div class="delivery-date-option">
        <div class="delivery-date-radio-box">
        <input type="radio" name="delivery-date-option-${matchingProduct.id}" value="option1">
        </div>
        <div>
        <p>${deliveryOptiondate.format('dddd MMMM D')}</p>
        <p>$${(deliveryoption.priceCents / 100).toFixed(2)} - Shipping</p>
        </div>
    </div>
      `
    })
   return optionsHtml;
  }

  
