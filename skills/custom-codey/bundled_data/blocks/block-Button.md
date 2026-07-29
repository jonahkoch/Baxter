# Button Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

<aside>
💡 **PRO TIP**
Buttons are notorious for not responding to code changes with the added help of **!important**. 
If you are trying to change the background color of a button on a hover, use **!important** like this:
.sqs-block-button-element:hover {background-color: red**!important**}

</aside>

## About

**Squarespace button blocks** can be used to link to additional content, files, and even trigger an email.

**Please note:** button blocks refer to the content block that displays three button styles; primary, secondary, and tertiary.

The information in this article does not apply to other button styles, including product blocks, donation blocks, list sections, or your website header button.

**Button blocks are designed for guiding visitors to take action.** Create eye-catching buttons that effortlessly direct people to important information.

You have incredible flexibility with Squarespace button blocks. Link them to pages on your site, external websites, downloadable files, or even phone numbers and email addresses.

**Pro tip:** You can use the form & button conversions feature inside Squarespace Analytics to track clicks and measure the effectiveness of buttons on your site!

**What you can customize about the button block using Squarespace**

**Primary, secondary, and tertiary buttons can all have a unique style, created in the site style menu.** Click on the paintbrush icon on the upper right hand side of the screen and select the **button** option to change the style settings.

Colors for each button can also be changed using the **site** **styles** menu. Adjust the color for each button type using the color theme.

The text content for each button can be edited individually.

The font style for each button be changed using the **site** **styles** menu.

## Button Block Selectors

| All Buttons Blocks | .sqs-block-button-element |
| --- | --- |
| Primary Button | .sqs-block-button-element--medium |
| Primary Button Text | .sqs-block-button-element--medium * |
| Secondary Button | .sqs-block-button-element--large |
| Secondary Button Text | .sqs-block-button-element--large * |
| Tertiary Button | .sqs-button-element--small |
| Tertiary Button Text | .sqs-button-element--small * |
| Add to cart button | .sqs-add-to-cart-button-inner |
| Add to cart button text | .sqs-add-to-cart-button-inner * |
| Product page - add to cart | .sqs-add-to-cart-button |
| Product page - add to cart button text | .sqs-add-to-cart-button * |
| Member Area Button | .member-area-block .sqs-editable-button |

## Image Button Selectors

Image blocks available on blog posts, event pages, additional product details, and version 7 sites can have buttons associated with specific layout options. 

These selectors can help you target those button options to make style changes.

| Card Image Button | .design-layout-card .image-button |
| --- | --- |
| Collage Image Button | .design-layout-collage .image-button |
| Poster Image Button | .design-layout-poster .image-button |
| Overlap Image Button | .design-layout-overlap .image-button |
| Stack Image Button | .design-layout-stack .image-button |

<aside>
💡 **PRO TIP**
Add the letter **a** at the end of the code name above to change the style of the text inside that button. 
**A** stands for Active text link.

</aside>

## Form Button Selectors

| Newsletter Subscribe Button | .newsletter-form-button |
| --- | --- |
| Form Submit Button | .form-wrapper input[type=submit] |
| Lightbox Trigger Button | .form-block .lightbox-handle-wrapper button |
| Lightbox Form Submit Button | .form-wrapper input[type=submit] |

## Header Menu Button Selectors

| 7.1 sites | .header-actions .btn |
| --- | --- |
| Bedford Sites (desktop) | .enable-nav-button #headerNav nav>div:not(.folder):last-child a |
| Bedford Sites (mobile menu) | .enable-nav-button #sidecarNav nav>div:not(.folder):last-child a  |
| Account Login Menu Button | .user-accounts-link |

## Creative Button Snippets

- Grow on hover
    
    ```css
    .sqs-block-button-element {
    transition: all 1s
    }
    .sqs-block-button-element:hover {
    transform:scale(1.2);
    transition: all 1s
    }
    ```
    
- Shadow on hover
    
    ```css
    .sqs-block-button-element {
    transition: all 1s
    }
    .sqs-block-button-element:hover {
    box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
    transition: all 1s
    }
    ```
    
- Gradient flip on hover
    
    ```css
    .sqs-block-button-element {
    background: linear-gradient(to right, blue, red);
    transition: all 1s
    }
    .sqs-block-button-element:hover {
    background: linear-gradient(to left, blue, red);
    transition: all 1s
    }
    ```
    
- Curved to 90deg corner animation
    
    I saw this on Flodesk and recreated it for Squarespace!
    
    ```css
    .sqs-block-button-element {
    border-radius:50px!important;
    transition: all 1s!important
    }
    .sqs-block-button-element:hover {
    border-radius:0px!important;
    transition: all 1s!important;
    opacity:1!important
    }
    ```
    
- Sliding in background color
    
    #000 is the neutral state color and #A1D9DD is the hover color
    
    ```css
    .sqs-block-button-element{
    background: linear-gradient(to left, #000 50%, #A1D9DD 50%) right!important;
    background-size: 200%!important;
    transition: .5s ease-out!important;
    }
    
    .sqs-block-button-element:hover{
    background-position: left!important;
    transition: .5s ease-out!important;
    opacity:1!important;
    color:#333!important
    }
    ```
    
- Shadow to background color
    
    ```css
    .sqs-block-button-element{
      box-shadow:5px 5px 0px red;
      transition: all 1s ease-in!important;
    }
    
    .sqs-block-button-element:hover{
      box-shadow:none;
      background:red!important;
      transition: all 1s ease-in!important
    }
    ```
    
- Separating background colors
    
    ```css
    .sqs-block-button-element{
      transition: .5s ease-out!important;
    }
    
    .sqs-block-button-element:hover{
      box-shadow: 5px -5px 0px orange,
     -5px 5px 0px red;
      transition: .5s ease-out!important;
    }
    ```
    
- Lifted button with a shadow
    
    ```css
    .sqs-block-button-element{
      transition:all .5s!important;
    }
    
    .sqs-block-button-element:hover{
      box-shadow: 0 10px 15px rgba(0,0,0,0.5);
      margin-top:-2px;
      opacity:1!important;
      transition:all .5s!important;
    }
    ```