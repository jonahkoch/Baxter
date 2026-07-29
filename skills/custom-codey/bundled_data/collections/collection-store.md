# Store

Type: Collections
Compatible Versions: 7, 7.1
Last Updated: April 23, 2025

<aside>
⭐ Squarespace made MAJOR changes to the product page & storefront selectors. These have been launched to all 7.1 sites as of August 2025. 

Please check out this for more information: [insidethesquare.co/productv2ai](https://insidethesquare.co/productv2ai)

You’ll find the official Squarespace documentation here: [https://developers.squarespace.com/changes/upcoming-changes](https://developers.squarespace.com/changes/upcoming-changes)

</aside>

## Product Pages

### Version 7.1 Product Page Selectors

- All individual product page selectors
    
    **Product v2 Selectors  to be used for all 7.1 sites starting August 2025**
    
    | Breadcrumbs (container) | .product-detail .product-nav |
    | --- | --- |
    | Breadcrumb (text) | .product-nav-breadcrumb-link |
    | Product Details (container) | .product-content-wrapper |
    | Product Title (text) | .product-detail .product-title |
    | Product Price | .product-detail .product-price-value |
    | Sale: Sale Price | .product-detail .sale-price |
    | Sale: Original Price | .product-detail .original-price |
    | Quantity: title/label | .product-detail .quantity-label |
    | Quantity: input | .product-quantity-input |
    | Variant: title/label | .variant-option-title |
    | Variant: dropdown | .variant-select-wrapper |
    | Variant: button | .variant-radiobtn-wrapper .sqs-button-element--secondary |
    | Add to cart button | .product-detail .sqs-add-to-cart-button |
    | Additional details (conatiner) | .ProductItem-additional |
    | Pro tip: you can customize content inside the additional details container by using the above selector in your code. This code will make all the H2 text in an additional product details section blue. | .ProductItem-additional h2{color: blue!important} |
    | Product Images - simple(container) | .product-gallery |
    | Product Images - simple(thumbnails) | .product-gallery-thumbnails-item img |
    | Product Images - simple(arrow controls) | .product-gallery-carousel-controls .product-gallery-carousel-control:after |
    | Pro tip: the simple layout product gallery arrows are actually borders, so you can use border codes to customize them like this | .product-gallery-carousel-controls .product-gallery-carousel-control:after{border-color:Red} |
    | Product Images - wrap, half, full(container) | .pdp-gallery-slides |
    | Product images - half, full(arrow controls) | .product-detail .pdp-gallery .pdp-carousel-controls .chevron-prev, .product-detail .pdp-gallery .pdp-carousel-controls .chevron-next |
    | Pro tip: both the half & full layout product gallery arrows color is set using the color property like this | .product-detail .pdp-gallery .pdp-carousel-controls .chevron-prev, .product-detail .pdp-gallery .pdp-carousel-controls .chevron-next{color:yellow!important;} |
- Add-on Product Upsell Selectors
    
    
    | Add-on Product Card | .product-add-ons .add-on-card |
    | --- | --- |
    | Add-on Product Thumbnail | .product-add-ons .add-on-thumbnail |
    | Add-on Product Details: Container | .product-add-ons .add-on-details |
    | Add-on Product Details: Title | .product-add-ons .add-on-details .add-on-title |
    | Add-on Product Details: Price | .product-add-ons .add-on-details .product-price |
    | Add-on Product Button | .product-add-ons .sqs-add-to-cart-button |
    | Add-on Product: Add To Cart Icon
    (background) | .product-add-ons .add-on-add-to-cart-wrapper .sqs-add-to-cart-button  |
    | Add-on Product: Add To Cart Icon
    (plus icon) | .product-add-ons .add-on-add-to-cart-wrapper .sqs-add-to-cart-button svg |
    | Pro tip: the add to cart plus icon is an svg so we need to use the stroke property to change the color, like this | .product-add-ons .add-on-add-to-cart-wrapper .sqs-add-to-cart-button svg{
    stroke:red!important;
    } |

### Brine Individual Product Page Selectors

| Breadcrumb Navigation | .ProductItem .ProductItem-nav 
.ProductItem-nav-breadcrumb |
| --- | --- |
| Breadcrumb: Store | .ProductItem .ProductItem-nav 
.ProductItem-nav-breadcrumba:first-child |
| Breadcrumb: Listing | .ProductItem .ProductItem-nav 
.ProductItem-nav-breadcrumba:last-child |
| Product Image - Stacked | .ProductItem-gallery-slides-item-image |
| Product Image - Slideshow Main | .ProductItem-gallery-slides-item.sqs-pdp-gallery-slide-active |
| Product Image - Slideshow Thumbnail | .ProductItem-gallery-thumbnails-item img |
| Product Title | .ProductItem .pdp-details 
.ProductItem-details-title |
| Product Price | .ProductItem .pdp-details .product-price |
| Sale Item: Original Price | .pdp-details .product-price .original-price |
| Sale Item: Sale Price | .on-sale .pdp-details .product-price |
| Sale Item: Sale Label | .pdp-details .product-mark.sale |
| Product Excerpt | .ProductItem-details-excerpt |
| Variant Dropdown | .pdp-details .variant-option select |
| Variant Dropdown: Arrow | .pdp-details .variant-select-wrapper:after |
| Quantity Label | .pdp-details .quantity-label |
| Quantity Input Field | .pdp-details .product-quantity-input |
| Sold Out Label | .sold-out .pdp-details .product-mark |
| Add To Cart Button | .pdp-details .sqs-add-to-cart-button-wrapper .sqs-add-to-cart-button |
| Product Share Icons | .pdp-details .Share-buttons-item-icon |
| Additional Details Area | .ProductItem-additional |

<aside>
💡 **PRO TIP**
To change the color of the original price and the sale price, be sure to use the word **!important** to force a browser to use your code over the site styles file. 
This example would change the original price to grey and the sale price to green: 

**.on-sale .pdp-details .product-price {color:green!important} .pdp-details .product-price .original-price {color:grey!important}**

</aside>

<aside>
💡 **PRO TIP**
The sale label is not always enabled on a product page. 
This code will make that label visible: 

**.pdp-details .product-mark.sale{display:block!important}**

</aside>

<aside>
💡 **PRO TIP**
The variant dropdown arrow is actually a unicode character. To change its color and size, use the same code you would to adjust a normal font, like this example which will make the arrow large and teal. 

**.pdp-details .variant-select-wrapper:after {font-size: 30px; color:teal}**

</aside>

<aside>
💡 **PRO TIP
T**o change the color of the social share icons, use the code for a color fill, like this example which will turn the icons orange: 

**.pdp-details .Share-buttons-item-icon {fill:orange}**

You can also create a hover effect for these buttons using that same concept. 
This example will turn the icons blue on a hover**: 

.pdp-details .Share-buttons-item-icon:hover {fill:blue}**

</aside>

### Bedford Product Page Selectors

| Back To Store Link | #productNav |
| --- | --- |
| Product Title | #productDetails .product-title |
| Product Price | #productDetails .product-price |
| Product Sale Label | #productDetails .product-mark |
| Product Description | #productDetails .product-excerpt |
| Variant Title | .variant-option-title |
| Variant Dropdown | .variant-option select |
| Quantity Title | .quantity-label |
| Quantity Input | #productDetails input:not([type='submit']) |
| Add To Cart Button | .sqs-add-to-cart-button |
| Add To Cart Button Text |  .sqs-add-to-cart-button * |
| Product Image |  #productGallery |

### Version 7.1 Product Page Snippets

- How to change the variant button style
    
    ```css
    *.variant-option .sqs-button-element--secondary {
    background:#F6EDCE!important; /* change the button background color */
    border: 2px solid #EDD17D!important; /* change the button border */
    border-radius:0!important;/* change the button shape */
    font-size: 1rem!important;/* change the button font size */
    text-transform: uppercase;/* change the button character style */
    }
    ```
    
- How to change the variant button on a hover
    
    ```css
    .variant-option .sqs-button-element--secondary:hover {
    background:#EDD17D!important; / change the button background color /
    color: brown!important; / change the font color /
    box-shadow: 5px 5px 15px rgba(0,0,0,0.2) / give the button a shadow */
    }
    ```
    
- How to change the selected button style
    
    ```css
    .pdp-details .variant-radiobtn-wrapper input[type="radio"]:checked+label {
    background: #e5f5f6 !important;/ change the button background color /
    color: #50bdb8 !important;/ change the button font color /
    border: 1px solid #50bdb8 !important; / change the button border /
    border-radius: 3rem !important; / change the button shape */
    }
    ```
    
- How to change the color of the variant dropdown arrow
    
    The variant dropdown arrow is a border created with code. To change its color, adjust the border color like this example code, which will turn that arrow teal: 
    
    ```css
    **.ProductItem .pdp-details .variant-select-wrapper:after {
    border-color: teal
    }**
    ```
    
- How to increase the font size for add-on product titles
    
    ```css
    .product-details .pdp-product-add-ons .add-on-details .add-on-title {
    font-size: 1.5rem
    }
    ```
    
- Change the color of the add-on product button
    
    ```css
    .product-details .pdp-product-add-ons .sqs-add-to-cart-button-wrapper *{
    background-color:red
    }
    ```
    
- Add text to add-on product button
    
    ```css
    .pdp-product-add-ons .add-on-add-to-cart-wrapper .sqs-add-to-cart-button{
    width: unset!important; /*creates space for text */
    border-radius:0!important; /* removes curved corners */
    }
    .product-details .pdp-product-add-ons .add-on-add-to-cart-wrapper .sqs-add-to-cart-button:before{
    content:"ADD TO CART "; /* change this text to what you want it to be */
    padding: .5rem /* creates space between text and button edge */
    }
    ```
    
- Change add-on background color on a hover
    
    ```css
    .product-details .pdp-product-add-ons .add-on-card:hover{
    background:#fff
    }
    ```
    
- Remove the border from add-on products
    
    ```css
    .product-details .pdp-product-add-ons .add-on-card{
    border:none!important
    }
    ```
    
- Round add-on product image
    
    ```css
    .product-details .pdp-product-add-ons .add-on-thumbnail {
    border-radius:50%
    }
    ```
    
- Example add-on product with background color hover effects
    
    ![Screenshot 2024-05-20 at 10.47.47 AM.png](Store/Screenshot_2024-05-20_at_10.47.47_AM.png)
    
    ```css
    .product-details .pdp-product-add-ons .add-on-card {
    border-radius:50px
    }
    .product-details .pdp-product-add-ons .add-on-card:hover{
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
    background:#fff
    }
    .product-details .pdp-product-add-ons .add-on-thumbnail {
    transform:Scale(1.2);
    border-radius:50%
    }
    .product-details .pdp-product-add-ons .add-on-details .add-on-title{
    font-weight:bold;
    margin-bottom:0!important
    }
    ```
    
- Change **full** product page gallery height
    
    ```css
    .pdp-layout-full-width-carousel .pdp-gallery-images{
    max-height: 30vh;
    }
    ```
    
- Force slide indicator to be visible (half layout)
    
    ```css
    .pdp-gallery-slide-indicator{
    display:inline!important
    }
    ```
    
- Change gallery height (container for images & controls)
    
    ```css
    .pdp-gallery-images{
    height:40%
    }
    ```
    
- Prevent image crop (half, full, wrap layouts)
    
    ```css
    .pdp-gallery-slides-image{
    object-fit:contain!important
    }
    ```
    
- Move breadcrumb nav to top, pushing down gallery and product details (half, full, wrap layouts)
    
    ```css
    .pdp-gallery-images{
      height:40%;
      top:5rem
    }
    .pdp-details-title{
      margin-top:3rem!important
    }
    .ProductItem-nav-breadcrumb{
      position:absolute;
      left:3rem!important
    }
    ```
    

## Storefront

### Version 7.1 Storefront Selectors

**Product v2 Selectors: to be used for all 7.1 sites starting August 2025**

| Store title (container) | .product-list-header |
| --- | --- |
| Store title (text) | .product-list-header h2 |
| Product category - top (container) | .product-list .nested-category-children |
| Product category - top (text) | .product-list .nested-category-children a |
| Product category - top (divider underline) | .product-list .nested-category-children::after |
| Pro tip: this divider line is a bottom border and responds to border codes like this: | .product-list .nested-category-children::after{
border-bottom: 3px dotted blue!important
} |
| Product category - sidebar (container) | .nested-category-tree-wrapper |
| Product category - sidebar (link container) | .nested-category-tree-wrapper .category-item |
| Product category - sidebar (link text) | .nested-category-tree-wrapper .category-link |
| List of products (container) | .product-list-container |
| Individual product (container) | .product-list-item |
| Individual product (image) | .product-list-item-image .grid-image-wrapper img |
| Individual product (info container) | .product-list-item-meta |
| Individual product (title) | product-list-item-title |
| Individual product (price) | .product-list-item-price |
| Individual product (add to cart button) | .product-list-item .sqs-add-to-cart-button |
| Sale Label (text) | .product-list-item .product-mark.sale |
| Sale Price | .product-list-item .sale-price |
| Original Price | .product-list-item .original-price |
| Added to cart popover notification (container) | .template-cart-item-added-popover |
| Added to cart popover notification (text) | .template-cart-item-added-popover p |
| Added to cart popover notification (close X) | .template-cart-item-added-popover .close svg |
| Pro tip: the popover close X is an svg, so you’ll need to use the stroke property to change the color | .template-cart-item-added-popover .close svg{
stroke: blue!important
} |

### Version 7.1 Storefront Snippets

- stop autocrop of product images
    
    ```css
    .product-list-item-image .grid-image-wrapper img{
      object-fit:contain!important
    }
    ```
    
- reduce add to cart button size
    
    ```css
    .product-list-item .sqs-add-to-cart-button{
      width:50%!important;
      margin:auto
    }
    ```
    

### Brine Storefront Selectors

| Product Listings | .ProductList-grid |
| --- | --- |
| Product Image | .ProductList-innerImageWrapper img |
| Product Title | .ProductList .ProductList-title |
| Product Price | .ProductList .product-price |
| Sale Price | .ProductList .on-sale .product-price |
| Original Price | .original-price |

### Bedford Storefront Selectors

| Store Title | .category-nav .nav-section-label, .folder-nav .nav-section-label |
| --- | --- |
| Category Link Section | .category-nav |
| Category Links | .category-nav-links |
| All Categories Link | .view-list #categoryNav ul li.active-link.all a |
|  Individual Categories | .category-nav-links a |
| Product Listings | #productList |
| Product Image | .product-image  |
| Product Title | .product-title |
| Product Price | .product-price |
| Sale Label (over image) | #productList .product .product-mark |
| Sale Price | .sqs-money-native:not(.original-price)  |
| Original Price | .original-price |

## Product Block

| Product Title | .product-block .productDetails .product-title |
| --- | --- |
| Product Price | .product-block .productDetails .product-price |
| Product Image | .product-block .image-container img |
| Product Description | .product-block .productDetails .product-excerpt |
| Variant Title | .product-block .productDetails .variant-option-title |
| Variant Dropdown | .product-block .productDetails .variant-option select |
| Quantity Title | .product-block .productDetails .quantity-label |
| Quantity Input | .product-block .productDetails .product-quantity-input |
| Add To Cart Button | .product-block .productDetails .sqs-add-to-cart-button |
| Add To Cart Button Text | .product-block .productDetails  .sqs-add-to-cart-button * |

## Product Block Quick View

When you add a product block to a standard page in Squarespace, you can enable **quick view** which will create a button over the product image on a hover, allowing the visitor to open a lightbox with the quick view of the product details.

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
| Quick View Product Title | .sqs-product-quick-view-lightbox .pdp-details .ProductItem-product-price |
| Quick View Price | .sqs-product-quick-view-lightbox .pdp-details .ProductItem-product-price * |
| Quick View Sale Price | .sqs-product-quick-view-lightbox .ProductItem.on-sale .pdp-details .product-price .sqs-money-native * |
| Quick View Original Price | .sqs-product-quick-view-lightbox .pdp-details .ProductItem-product-price .original-price * |
| Quick View Excerpt | .sqs-product-quick-view-lightbox .pdp-details .ProductItem-details-excerpt |
| Quick View Variant Dropdown | .sqs-product-quick-view-lightbox .pdp-details 
.variant-option select |
| Quick View Quantity Label | .sqs-product-quick-view-lightbox .quantity-label |
| Quick View Quantity Input | .sqs-product-quick-view-lightbox .product-quantity-input input |
| Quick View Add To Cart | .sqs-product-quick-view-lightbox .sqs-add-to-cart-button |
| View Full Item Link | .sqs-product-quick-view-lightbox 
.ProductItem-details-quickViewFullItemLink |

<aside>
💡 **PRO TIP**

The quick view close icon is actually a line icon. To change its color, you need to change the stroke color like this example here:

**.sqs-product-quick-view-lightbox-close-button line {stroke:orange}**

</aside>

<aside>
💡 **PRO TIP**

In Squarespace 7.1, the **view full item** link is underlined with a bottom border. 
To remove it you can set it to none with this code:

**.ProductItem-details-quickViewFullItemLink {border-bottom:none!important}**

In Squarespace 7 sites, the underline is actually a part of the link wrapper, so you need to use this code to hide it:

.**ProductItem-details-quickViewFullItemLink-wrapper {border-bottom:none!important}**

</aside>

## Related Snippets

- Summary Block: Hide price when product is sold out
    
    ```css
    .sqs-block-summary-v2 .summary-item .summary-thumbnail-outer-container:has( .summary-product-status .product-mark ) + .summary-content .summary-price .product-price {
      display : none;
      }
    ```
    
- Shopping cart background color
    
    ```css
    #cart .system-page {
        background: #F7F0E4 !important;
    }
    ```
    
- Rounded cart corners
    
    ```css
    #cart .system-page {
     border-radius:15px!important
    }
    ```
    
- Add custom text before product add on
    
    ```css
    @media only screen and (max-width:767px){
        .pdp-product-add-ons::before {
        white-space:pre;
        content: "This would pair well with...\A \A"
    }
    }
      @media only screen and (min-width:768px){
          .pdp-product-add-ons::before {
        content: "This would pair well with..."
       }
      }
    ```
