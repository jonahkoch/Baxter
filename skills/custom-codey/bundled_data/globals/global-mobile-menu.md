# Mobile Menu

Type: Global Elements
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

The mobile version of your website will display an icon to open the navigation of your site, also known as your mobile menu.

In Version 7.1, you can change the header layout and menu layout using features built into Squarespace.

## Selectors

### Version 7.1 Selectors

| Mobile Menu | .header--menu-open .header-menu |
| --- | --- |
| Open Menu (ideal for backgrounds & borders) | .header-menu-bg |
| Mobile Menu Icon Container | .header-burger-btn |
| Mobile Menu Icon | .burger-inner |
| Mobile Menu Icon - Top Line | .burger-inner .top-bun |
| Mobile Menu Icon - Middle | .burger-inner .bottom-bun |
| Mobile Menu Icon - Bottom | .burger-inner .patty  |
| Mobile Menu Close | .header--menu-open .header-burger |
| Mobile Navigation (page list) | .header--menu-open .header-menu .header-menu-nav-list a |
| Folder Open Arrow | .header--menu-open .header-dropdown-icon |
| Folder Close Arrow | .header--menu-open .header-dropdown-flip |
| Folder “Back” Navigation Text | .header-menu-controls-control |
| Mobile Menu Header Button | .header--menu-open .header-menu-cta a  |

<aside>
💡 **PRO TIP**
To change the color of the folder arrows, use the property **color.** This code snippet willreplace the icon with a unicode arrow.

```html
.header--menu-open .header-dropdown-icon:After{content:"→"; color: purple}
.header--menu-open .header-dropdown-flip:After {content:"←"!important; color: green!important}
```

</aside>

### Brine Theme Selectors (Version 7)

| Mobile menu button | .Mobile-bar-menu |
| --- | --- |
| Mobile Menu | .Mobile-overlay-menu |
| Mobile Navigation (page list) | .Mobile-overlay-nav Mobile-overlay-nav--primary |
| Mobile Second Navigation(page list) | .Mobile-overlay-nav .Mobile-overlay-nav--secondary |
| Mobile Menu Close | .Mobile-overlay-close .Icon--close |

### Bedford Theme Selectors (Version 7)

| Mobile menu button | .mobile-nav-toggle |
| --- | --- |
| Mobile Menu | #sidecarNav nav |
| Mobile Menu Close | .mobile-nav-toggle |

### Pacific Theme Selectors (Version 7)

| Mobile menu button | .mobile-nav-toggle-label .top-bar, .mobile-nav-toggle-label 
.middle-bar, .mobile-nav-toggle-label .bottom-bar |
| --- | --- |
| Mobile Menu | #mobileNavToggle:checked~#overlayNav nav |
| Mobile Menu Close | #mobileNavToggle:checked~#header .mobile-nav-toggle-label |

### York Theme Selectors (Version 7)

| Mobile menu button | .mobile-nav-toggle-label |
| --- | --- |
| Mobile Menu | .overlay-nav-container |
| Mobile Navigation - Primary | .mobile-primary-nav-links a |
| Mobile Navigation - Secondary | .mobile-secondary-nav-links a |
| Mobile Menu Close | .mobile-nav-toggle-label .Icon--close |

## Style Snippets

### Version 7.1 Style Snippets

- Invert color on mobile menu icon when its open
    
    ```css
    .header--menu-open .burger-inner{
    filter:invert(1)!important
    }
    ```
    
- Replace the mobile menu with text
    
    ```css
    .burger-inner{
    display:none
    }
    .burger-box:before{
     content:"MENU"; 
     border: 1px solid #000; 
     padding: .25rem
    }
    .burger--active .burger-box:before{
     content:"CLOSE"
    }
    ```
    
- Use Your Own Image For The Mobile Menu Background
    
    ```css
    .header-menu .header-menu-bg{
     background-image: url(your-url-here);
     background-size: cover;
    }
    ```
    
- Replace the Mobile Menu Icon With Your Own Image
    
    ```css
    .burger {
     background-image: url('your-image-url-here');
     background-size: contain;
     background-repeat: no-repeat;
     background-position: right;
     background-color: transparent !important;
     height: 25px; 
    }
    .burger-inner {
     display: none;
    }
    ```
    
- Change mobile menu link font size
    
    ```css
    .header--menu-open .header-menu-nav-item a {
    font-size: 2rem;
    }
    ```
    
- Remove active page underline - mobile menu only
    
    ```css
    .header--menu-open .header-menu-nav-item--active *{
    background-image:none!important
    }
    ```
    
- Change social media icon color **only on mobile menu**
    
    ```css
    .header--menu-open .header-menu .header-menu-actions *{
    color:Red!important
    }
    ```
    
- Move your mobile menu button directly under the links
    
    ```css
    .header-menu-nav-folder-content {
     flex-grow: 0;
    }
    
    ```
    
- Change the color of individual lines in your mobile menu icon
    
    ```css
    .top-bun {background:red!important}
    .patty {background:green!important}
    .bottom-bun {background:blue!important}
    ```
    
- Round the corners of the mobile menu icon lines
    
    ```css
    .top-bun, .patty, .bottom-bun {
    border-radius:5px}
    ```
    
- Round background for the mobile menu icon
    
    ```css
    .header-burger-btn{
      background:orange;
      border-radius:50%;
      height: 3rem!important;
      width: 3rem!important;
    }
    .burger-inner *{
    background:#fff!important;
    border-radius: 5px;
    }
    .burger-box {
      width: 80%!important;
      margin:auto!important
    }
    .header--menu-open
      .burger-box {
      margin-left:0!important
    }
    ```
    

### Brine Style Snippets (Version 7)

- Add A Logo To The Top Of Your Mobile Menu
    
    ```css
    .Mobile-overlay-nav-item  .Mobile-overlay-menu {
     width: 100%; z-index: 1; 
    } 
    .Mobile-overlay-menu-main { 
     margin-top:50px; 
     background-image: url('your-image-url-here'); 
     background-position: top; 
     background-size: 50% auto; 
     background-repeat: no-repeat;
    }
    ```
