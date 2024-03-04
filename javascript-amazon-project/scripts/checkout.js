import { cartItems } from "../data/cart.js"
import { products } from "../data/products.js"

let checkoutItemHtml = '';

console.log(cartItems)

cartItems.forEach((cartItem) =>{
    let matchingProduct;
    products.forEach((product) => {
        if(cartItem.productId == product.id){
            matchingProduct = product;
        }
    })

    //!!Please save cartItems into Local storage to save it when the page unloads, Create a local storage

    checkoutItemHtml += 
    `<div class="checkout-item-container">
    <p class="checkout-item-delivery-date">Delivery date: Wednesday, March 6</p>
    <div class="checkout-item-details-grid">
    <div class="checkout-item-image-box">
        <img class="checkout-item-image" src="${matchingProduct.image}">
    </div>
    <div class="checkout-item-details">
        <p class="checkout-item-name">${matchingProduct.name}</p>
        <p class="checkout-item-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</p>
        <p class="checkout-item-quantity">Quantity: ${cartItem.quantity} Update Delete</p>
    </div>
    <div class="checkout-item-delivery-date-options">
        <p class="choose-delivery-option-text">Choose a delivery option:</p>
        <div class="choose-delivery-date-option-box">   
        <div class="delivery-date-option">
            <div class="delivery-date-radio-box">
            <input type="radio" name="delivery-date-options" value="option1">
            </div>
            <div>
            <p>Wednesday March 6</p>
            <p>FREE Shipping</p>
            </div>
        </div>
        <div class="delivery-date-option">
            <div class="delivery-date-radio-box">
            <input type="radio" name="delivery-date-options" value="option1">
            </div>
            <div>
            <p>Thursday, February 29</p>
            <p> $4.99 - Shipping</p>
            </div>
        </div>
        <div class="delivery-date-option">
            <div class="delivery-date-radio-box">
            <input type="radio" name="delivery-date-options" value="option1">
            </div>
            <div>
            <p>Tuesday, February 27</p>
            <p> $9.99 - Shipping</p>
            </div>
        </div>
        </div>
    </div>
    </div>
    </div>`
});

document.querySelector('.js-checkout-order-list-container')
 .innerHTML = checkoutItemHtml;
