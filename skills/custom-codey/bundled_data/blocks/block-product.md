# Product Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

Essential for custom sales pages, **Squarespace product block** will display individual products on pages in your website.

Squarespace product blocks can be used to promote your products on other pages in your website, like related blog posts, events, and especially for custom sales pages.

You can show an image of the product, title, price, description, quantity, and have an add to cart button. You can also enable a quick view of the product, allowing customers to click on a button that shows up over the image on a hover.

This button opens up the quick view of the product details on top of the page they are currently on, so they can see more information without having to navigate to a new page.

## Product Block Selectors

| Product Title | .product-block .productDetails .product-title |
| --- | --- |
| Product Price | .product-block .productDetails .product-price |
| Product Image | .product-block .image-container img |
| Product Description | .product-block .productDetails .product-excerpt |
| Variant Title | .product-block .productDetails .variant-option-title |
| Variant Dropdown | .product-block .productDetails .variant-option select |
| Quantity Title | .product-block .productDetails .quantity-label |
| Quantity Input | up |
| Add To Cart Button | .product-block .productDetails .sqs-add-to-cart-button |
| Add To Cart Button Text | .product-block .productDetails  .sqs-add-to-cart-button * |

## Product Block Quick View Selectors

When you add a product block to a standard page in Squarespace, you can enable **quick view** which will create a button over the product image on a hover, allowing the visitor to open a lightbox with the quick view of the product details.

<aside>
💡 **PRO TIP** 
Your version matters! In Squarespace 7.1, the **view full item** link is underlined with a bottom border. To remove it you can set it to none with this code:
**.ProductItem-details-quickViewFullItemLink {border-bottom:none!important}**

In Squarespace 7 sites, the underline is actually a part of the link wrapper, so you need to use this code to hide it:
**ProductItem-details-quickViewFullItemLink-wrapper {border-bottom:none!important}**

</aside>

| Quick View Button | .sqs-product-quick-view-button |
| --- | --- |
| Quick View Lightbox | .sqs-product-quick-view-lightbox .ProductItem |
| Quick View Close Icon | .sqs-product-quick-view-lightbox-close-button line |
| Quick View Page Overlay | .sqs-product-quick-view-lightbox.sqs-modal-lightbox 
.sqs-modal-lightbox-content .lightbox-background |
| Quick View Product Image | .sqs-product-quick-view-lightbox 
.ProductItem-gallery-slides-item-image |
| Quick View Product Thumbnails | .sqs-product-quick-view-lightbox 
.ProductItem-gallery-thumbnails-item img |
| Quick View Product Title | .sqs-product-quick-view-lightbox .ProductItem-details 
.ProductItem-product-price |
| Quick View Price | .sqs-product-quick-view-lightbox .ProductItem-details 
.ProductItem-product-price * |
| Quick View Sale Price | .sqs-product-quick-view-lightbox .ProductItem.on-sale .ProductItem-details .product-price .sqs-money-native * |
| Quick View Original Price | .sqs-product-quick-view-lightbox .ProductItem-details 
.ProductItem-product-price .original-price * |
| Quick View Excerpt | .sqs-product-quick-view-lightbox .ProductItem-details 
.ProductItem-details-excerpt |
| Quick View Variant Dropdown | .sqs-product-quick-view-lightbox .ProductItem-details 
.variant-option select |
| Quick View Quantity Label | .sqs-product-quick-view-lightbox .quantity-label |
| Quick View Quantity Input | .sqs-product-quick-view-lightbox .product-quantity-input input |
| Quick View Add To Cart | .sqs-product-quick-view-lightbox .sqs-add-to-cart-button |
| View Full Item Link | .sqs-product-quick-view-lightbox 
.ProductItem-details-quickViewFullItemLink |

<aside>
💡 **PRO TIP**
The quick view close icon is actually a line icon! 
To change its color, you need to change the stroke color like this example here: 

**.sqs-product-quick-view-lightbox-close-button line {stroke:orange}**

</aside>

## Product Block Snippets

- Reduce the size of the product image in the product block
    
    *The width of the image container controls the image size*
    
    ```css
    .product-block .image-container {
    max-width: 30%!important
    }
    ```
    
- Add a background color to the entire product block
    
    *customize the padding value to increase or decrease space between the content and the edge of the background*
    
    ```css
    .product-block {
    background:#333;
    padding: 1rem
    }
    ```
