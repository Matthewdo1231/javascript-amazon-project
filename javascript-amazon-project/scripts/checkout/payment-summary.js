import { cartItems } from "../../data/cart.js"
import { products } from "../../data/products.js"
import {deliveryOption} from "../../data/deliveryoption.js"

export function renderPaymentSummary(){
   let paymentSummaryHtml = '';

   let totalItems = 0;
   let shippingFee = 0;
   let allItemPrice = 0;
   let totalBeforeTax = 0;
   let estimatedTax = 0;
   let orderTotal = 0; 

   cartItems.forEach( (item) => {
    products.forEach((product)=>{
        let matchingItem;
        if(item.productId === product.id){
            matchingItem = product;
             totalItems += 1;

            deliveryOption.forEach((option) => {
                if(option.id == item.deliveryOptionId){
                    shippingFee += option.priceCents;
                }
                
            })
            allItemPrice += matchingItem.priceCents * item.quantity;
        }
        
     }) 
   });

   totalBeforeTax = ( shippingFee + allItemPrice );
   estimatedTax = (totalBeforeTax / 100) *.10;
   orderTotal = (totalBeforeTax / 100) + estimatedTax;

   paymentSummaryHtml = `
        <div class="order-summary-info">
            <p class="order-summary-header-text">Order Summary</p>
            <div class="order-summary-items-grid">
              <div>Items (${totalItems}):</div>
              <div>$${(allItemPrice/100).toFixed(2)}</div>
             </div>
            <div class="order-summary-shipping-grid">
              <div class="order-summary-shipping-text">Shipping & handling:</div>
              <div class="order-summary-shing-price-text">$${(shippingFee/100).toFixed(2)}</div>
             </div>
            <div class="order-summary-non-tax-price-grid">
              <div class="order-summary-total-before-tax-text">Total before tax:</div>
              <div class="order-summary-total-before-tax-price-text">$${(totalBeforeTax/100).toFixed(2)}</div>
             </div>
             <div class="order-summary-taxed-price-grid">
              <div class="order-summary-total-with-tax-text">Estimated tax (10%):</div>
              <div class="order-summary-total-with-tax-price">$${(estimatedTax).toFixed(2)}</div>
             </div>
             <div class="order-summary-order-total-grid">
              <div class="order-summary-order-total-text">Order total:</div>
              <div class="order-summary-order-total-price">$${(orderTotal).toFixed(2)}</div>
             </div>       
           </div>          
          <div class="order-payment-option">
              <div class="order-summary-payment-option-paypal">Use PayPal</div>
              <input class="summary-paypal-checkbox" type="checkbox">
           </div>
           <div class="place-your-order-container">
              <button class="place-your-order-button">Place your order</button>
           </div>   
        </div>
        ` 
    document.querySelector('.js-checkout-order-summary-container')  
     .innerHTML = paymentSummaryHtml;
}
