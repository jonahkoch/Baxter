# Shopping Cart Page

Type: Global Elements
Compatible Versions: 7.1
Last Updated: April 23, 2026

These selectors will work for the shopping cart page, a layout generated based on user activity that isn’t accessible in your main pages menu. 

## Selectors

| Shopping Cart Title | .cart-title |
| --- | --- |
| Cart Content | .cart-container |
| Product Row | .cart-row |
| Product Image - container | .cart-row-img-wrapper |
| Product Image | .cart-row-img |
| Product Title | .cart-row-title |
| Quantity | .cart-row-qty |
| Quantity increase + | .cart-row-qty-inc |
| Quantity decrease - | .cart-row-qty-dec |
| Variant | .cart-row-variant |
| Price | .cart-row-price |
| Subtotal - Section | .cart-summary |
| Subtotal - Label | .cart-subtotal-label |
| Subtotal - Price | .cart-subtotal-price |
| Checkout Button | .cart-checkout |

## Style Snippets

- Change the color of the product row underline
    
    The line displayed under the product is a bottom border. You can change the color, thickness, and style of the border. This code edits the color.
    
    ```css
    .cart-row {
    border-bottom-color:red
    }
    ```
    
- Change the color of the increase and decrease quantity buttons
    
    Increase and decrease are SVGs. To change the color, use the fill property
    
    ```css
    .cart-row-qty-inc svg {
    fill: green
    }
    .cart-row-qty-dec svg {
    fill: #ccc
    }
    ```
