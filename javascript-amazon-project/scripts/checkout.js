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
        
         ${createDeliveryOptionHtml(matchingProduct,cartItem)}

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
  

  function createDeliveryOptionHtml(matchingProduct,cartItem){
    let optionsHtml = '';
    deliveryOption.forEach((deliveryoption)=>{
      let today = dayjs();
      let deliveryOptiondate = today.add(deliveryoption.deliveryDays,'days');
      let deliveryDateString = deliveryOptiondate.format('dddd MMMM D');
      let priceString = deliveryoption.priceCents == 0
        ? `FREE`
        : `$${(deliveryoption.priceCents / 100).toFixed(2)}`
      let isChecked = cartItem.deliveryOptionId == deliveryoption.id
        ?`Checked`
        :``
      optionsHtml += `
        <div class="delivery-date-option">
        <div class="delivery-date-radio-box">
        <input ${isChecked} type="radio" name="delivery-date-option-${matchingProduct.id}" value="option1">
        </div>
        <div>
        <p>${deliveryDateString}</p>
        <p>${priceString} - Shipping</p>
        </div>
    </div>
      `
    })
   return optionsHtml;
  }

  
