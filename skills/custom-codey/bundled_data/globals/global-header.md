# Header Elements

Type: Global Elements
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

See the [Mobile Menu](Mobile%20Menu%2098f275527ef54d49b811c8e702a62a7a.md) selection for mobile navigation selectors.

Your website header contains your logo, site navigation, and in Version 7.1, you can also have social media links and a call to action button that’s separate from your main navigation.

Visit [**insidethesquare.co/header**](http://insidethesquare.co/header) to learn more about your options without code.

## Selectors

### 7.1 Selectors

| Header | .header-announcement-bar-wrapper |
| --- | --- |
| Site Title - Image / Logo | .header-title-logo |
| Site Title - Text | .header-title-text a |
| All Navigation Links | .header-nav |
| Individual Navigation Link (not folder) | .header-nav-item |
| Active Link | .header-nav-item--active a |
| Dropdown Menu | .header-nav-folder-content |
| Dropdown Links | .header-nav-folder-content a |
| Dropdown icon (closed) | .header-dropdown-icon svg |
| Dropdown icon (open; arrows only) | .header-nav-item--folder:hover .header-dropdown-flip svg |
| *Dropdown icons are SVG’s: use fill and stroke properties to change their color* |  |
| Header Button | .header-actions-action--cta .btn  |
| Header Button - Mobile Only | .header--menu-open .header-menu-cta .btn |
| Mobile Logo - Image | .header-mobile-logo |
| Mobile Logo - Text | .header--menu-open .header-title-text a |
| Social nav links | .header-actions-action--social |
| Header Shopping Cart | .header-actions-action--cart |
| Header Cart - Icon  | .icon--cart |
| Header Cart - Quantity | .sqs-cart-quantity |
| Account Login Link | .user-accounts-text-link |

### Brine Theme Selectors (Version 7)

| Header | .header |
| --- | --- |
| Site Title - Image | .has-logo-image .Header-branding |
| Site Title - Text | .has-site-title .Header-branding |
| All Navigation | .header-nav |
| Main Navigation | .Header-nav--primary |
| Secondary Navigation | .Header-nav--secondary |
| Tagline | .Header-tagline |

### Bedford Theme Selectors (Version 7)

| Header | #header |
| --- | --- |
| Site Title - Image | #logoImage |
| Site Title - Text | #siteTitle |
| All Navigation | #header #headerNav |
| Main Navigation | #mainNavigation |
| Navigation Button | .collection.active.homepage |
| Mobile Logo - Image | #logoImage |
| Mobile Logo - Text | #siteTitle |

### Pacific Theme Selectors (Version 7)

| Header | #header |
| --- | --- |
| Site Title - Image | #logoImage |
| Site Title - Text | #siteTitle |
| All Navigation | #header #mainNavWrapper |
| Main Navigation | #headerNav .index.home a |
| Secondary Navigation | #mainNavWrapper nav a |

### York Theme Selectors (Version 7)

| Header | #header |
| --- | --- |
| Site Title - Image | .logo-image img |
| Site Title - Text | .site-title |
| All Navigation | .nav-wrapper nav |
| Navigation - Primary | .primary-nav-wrapper nav |
| Navigation - Secondary | .secondary-nav-wrapper nav |
| Mobile Logo - Image | .mobile-logo-image img |
| Mobile Logo - Text | .mobile-site-title |

## Style Snippets

<aside>
💡 The following header style snippets are for Version 7.1

</aside>

- NEW: customize the color of your dropdown icons
    
    ```css
    /* dropdown closed */
    .header-dropdown-icon svg{
      fill:red!important;
      stroke:red!important;
    }
    /* dropdown open */
    .header-nav-item--folder:hover .header-dropdown-flip svg{
      fill:blue!important;
      stroke:blue!important;
    }
    ```
    
- Add A Tagline After Your Logo Or Site Title
    
    ```css
    .header-title:after {
     content:"Tagline Goes Here"
    }
    ```
    
- Add A Tagline After Your Logo Or Site Title with Additional Space
    
    ```css
    .header-title:after { 
     white-space: pre; 
     content: "\A Tagline Goes Here" !important;
    }
    ```
    
- Remove Cart Quantity
    
    ```css
    .sqs-cart-quantity{ 
     display: none
    }
    ```
    
- Fun corner animation for a header button that turns rounded corners into 90degree corners on a hover
    
    ```css
    .header-actions-action--cta *{
    border-radius:50px!important;
    transition: all 1s!important
    }
    .header-actions-action--cta:hover *{
    border-radius:0px!important;
    transition: all 1s!important;
    opacity:1!important
    }
    ```
    
- Sliding in background color for a header button
    
    #000 is the neutral state color and #A1D9DD is the hover color
    
    ```css
    .header-actions-action--cta *{
    background: linear-gradient(to left, #000 50%, #A1D9DD 50%) right!important;
    background-size: 200%!important;
    transition: .5s ease-out!important;
    }
    
    .header-actions-action--cta:hover *{
    background-position: left!important;
    transition: .5s ease-out!important;
    opacity:1!important;
    color:#333!important
    }
    ```
    
- Shadow to background color header button on a hover
    
    ```css
    .header-actions-action--cta *{
      box-shadow:5px 5px 0px red;
      transition: all 1s ease-in!important;
    }
    
    .header-actions-action--cta:hover *{
      box-shadow:none;
      background:red!important;
      transition: all 1s ease-in!important
    }
    ```
    
- Separating background colors on a hover button
    
    ```css
    .header-actions-action--cta *{
      transition: .5s ease-out!important;
    }
    
    .header-actions-action--cta:hover *{
      box-shadow: 5px -5px 0px orange,
     -5px 5px 0px red;
      transition: .5s ease-out!important;
    }
    ```
    
- Lifted button with a shadow
    
    ```css
    .header-actions-action--cta{
      transition:all .5s!important;
    }
    
    .header-actions-action--cta:hover *{
      box-shadow: 0 10px 15px rgba(0,0,0,0.5);
      margin-top:-2px;
      opacity:1!important;
      transition:all .5s!important;
    }
    ```
    
- Replace Cart Icon with the Text CART (#)
    
    ```css
    .icon--cart .icon{
     display:none
    }
    .icon-cart-quantity{width: 6rem!important; 
     font-size:1rem; 
     top:0!important
    }
    .sqs-cart-quantity:before{
     content:"CART ("
    }
    .sqs-cart-quantity:after{
     content:")"
    }
    ```
    
- Change the Cart Icon colors
    
    ```css
    .icon--cart{
    /* outline color */
    stroke:red!important;
    /* fill color */
    fill:red!important
    }
    ```
    
- Use a Custom Header Background Image for Desktop View
    
    ```css
    .header {
     background-image:url('image-url’);
     background-repeat:no-repeat;
     background-size:cover;
     background-position: center;
    }
    ```
    
- Remove active link underline: main navigation
    
    ```css
    .header-nav *{
    text-decoration:none!important;
    background-image:none!important
    }
    ```
    
- Remove active link underline: dropdown
    
    ```css
    .header-menu-nav-item-content {
    background-image:none!important;
    }
    ```
    
- Change dropdown color
    
    ```css
    /* dropdown background */
    .header-menu-nav-item-content {
    background:blue!important;
    }
    /* dropdown links */
    .header-menu-nav-item-content a{
    color:#fff!important;
    }
    ```
    
- Change your logo on an individual page
    
    <aside>
    📺 For a step-by-step tutorial, visit this blog post: [https://insidethesquare.co/squarespace-tutorials/one-page-logo](https://insidethesquare.co/squarespace-tutorials/one-page-logo)
    
    </aside>
    
    1. First, you’ll need to upload the image.
    2. Click on Website, then Website Tools, then custom CSS.
    3. Click on Custom Files & upload your alternative logo image file here.
    4. Paste the code below into your Custom CSS.
    5. Replace the placeholder text with the URL for your image. If it doesn't happen automatically, click on the image in your custom files dropdown.
    6. Cut that text out of your CSS; you’ll need it, but not there!
    7. Navigate to the page you want this alternative logo to be on.
        1. If you’re using a business or commerce plan for your Squarespace website, click on the gear icon to access your Page Settings, and then click on Advanced.
        2. If you’re using a personal plan, click on Edit to edit the page, and add a code block to the first page section. Pro tip: Make sure you are editing the page, and not working in the footer!
    
    ```css
    <style>
    .header-title{
    background-image:url('image-url-here');
    background-size: contain
    }
    .header-title img{
    opacity:0
    } </style>
    ```
    
- Custom social icon colors
    
    Make sure you change the colors for your own unique style.
    
    This code changes the icon color:
    
    ```css
    .header .icon svg {
    fill: yellow!important
    }
    ```
    
    This coded changes the background color; only needed for solid or outline design formats:
    
    ```css
    .header .icon--fill {
    background: lightblue!important
    }
    ```
    
    This code changes the outline color and is only needed for the outline design format:
    
    ```css
    .header-icon-border-style-outline {
    color: green!important
    }
    ```
    
    This code changes the color of the icon and background on a hover:
    
    ```css
    .header .icon:hover svg {
    fill: pink!important
    }
    .header .icon--fill:hover {
    background: #e5f5f6important
    }
    ```
    
- How to create a split navigation
    
    To be clear, we’re making some layout changes here, and it wont be perfect! here are a few pro tips before you dig into the code:
    
    - You’ll need to remove all of the elements: icons, cart, button, etc
    - An even number of links is recommended
    - You will need to remove the code to adjust your site title/logo
    - **You need to set your layout to the last design option that will center your logo.** The links in your navigation will go under the logo, and we will move them with CSS. In edit mode, select edit site header, then select edit design, and choose the layout with the logo in the center and the links below it (last option)
    - **You’ll also need to be careful about the size of your menu.** This code is written for my logo and my menu link font sizes, but you might need to adjust the 1030px for your own design needs.
    - **Every site can be different and you’ll need to customize your code to make this work for you!**
    
    ```css
    @media only screen and (min-width: 1030px){
    .header-nav {
    position: absolute;
    margin-top:0!important;
    top: **2rem**;
    }
    .header-nav-item:nth-of-type(**2**) {
    margin-right: **50vw**!important;
    }
    .header-title {
    z-index: 99!important;
    }
    }
    ```
    
- Light nav links on background images that reset for header background color
    
    This code will change the link text to white (#FFF) when it's in the transparent state. It will also add a brightness filter to the logo so it will be visible too. Once you scroll and the background color kicks in, the links will go back to the colors you've chosen.
    
    ```css
    .header:not(.shrink):not(.transparent-header-theme--override) * {
    color:#fff!important
    }
    .header:not(.shrink):not(.transparent-header-theme--override).header-title-logo img {
    filter:brightness(100)
    }
    ```
