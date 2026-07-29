# Digital Product Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

You can use **Squarespace digital product blocks** to promote products on specific pages of your website.

This article is about the content block that will display information about your digital product. For information about creating a digital product, visit this [official article from the Squarespace support blog](https://support.squarespace.com/hc/en-us/articles/360050367672-Digital-product-blocks).

Digital product blocks are a conveniant way to promote your  paid memberships or access to premium content from any page on your website.

You can use these content blocks to create enticing sign-up pages that showcase your different membership options. You can even add these blocks to any page or post to promote your gated content.

**Before you dive in, make sure you:**

Have a Squarespace plan that includes digital products.

Connect your site to Stripe or PayPal (or both) to accept payments.

Create the exclusive content you want to offer (like a blog, course, or video library) and set up your membership plans.

**What you can customize about the digital product block using Squarespace**

The digital product block is designed to match the main style settings of your site that you have selected using the site style menu.

Unfortunately we don’t have a lot of customization options to make this block unique, but you can easily create custom code to customize it. You’ll find more information in the next section of this article.

## Digital Product Block Selectors

| Entire Block	 | .pricing-plan-block |
| --- | --- |
| Title	 | .pricing-plan-title |
| Single Price	 | .pricing-plan-price-amount |
| Multiple Price: Container  | .pricing-plan-block .pricing-plan-pricing-toggle-wrapper |
| Multiple Price: Left Option  | .pricing-plan-pricing-options .left-option * |
| Multiple Price: Right Option | .pricing-plan-pricing-options .right-option * |
| Frequency | .pricing-plan-price-billing-period |
| Description	 | .pricing-plan-description |
| Button | .join-button |
| Line	 | .pricing-plan-benefits-divider |
| Benefit: checkmark  | .pricing-plan-benefit-description:first-letter |
| Benefit: text	 | .pricing-plan-benefit-description |

## Snippets

- Change the benefit description checkmark color
    
    ```css
    .pricing-plan-benefit-description:first-letter {color:red!important}
    ```
    
- Pricing options with 90 degree corners
    
    ```css
    .pricing-plan-pricing-options *{
    border-radius:0!important
    }
    ```
    
- Customize the divider line
    
    The divider line that show up before the benefits list is a top and bottom border of 1px. You can increase the border width and it will increase double that value. You can also hide top or bottom border and customize the alternate, like this code example:
    
    ```css
    .pricing-plan-benefits-divider {
    border-top:5px dotted #50bdb8;
    border-bottom:none
    }
    ```
