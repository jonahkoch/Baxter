# Cookie Alert

Type: Global Elements
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

To turn on this premium feature, navigate to *Settings > Website > Cookies & Visitor Data*

**This is not legal advice.**

Certain regions require website owners to inform visitors of cookies that are being used on a website, and Squarespace does just that! I strongly recommend adding a cookie alert to your website, and seeking legal advice on what text to include and how to set up the confirm & deny options.

Your cookie alert can be visible on every page so you will need to add any custom codes for this element to your site wide CSS file.

<aside>
🚨 Cookie alert codes were changed between July 10th and July 11th, 2025. You will need to update your custom code to use the new selectors below.

</aside>

# New Selectors: July 2024

| Cookie Banner 
 | .gdpr-cookie-banner |
| --- | --- |
| Disclaimer Text | .gdpr-cookie-banner.full-styling.popup .disclaimer-text |
| All Buttons | .button-group |
| Accept Button | .accept.sqs-button-element--primary |
| Decline Button | .decline.sqs-button-element--secondary |
| Manage Button | .manage.sqs-button-element--tertiary |
| Manage Overlay | .manage-cookies-overlay |
| Manage Overlay: Title | .manage-cookies-overlay h3 |
| Manage Overlay: Section Titles | .category-selection |
| Manage Overlay: Description
(also applies to on/off labels) | .category-description |
| Manage Overlay: Divider Line
*background color - not a border* | .manage-cookies-overlay hr |
| On/Off toggle: on | .manage-cookies-overlay .sqs-toggle--on |
| On/Off toggle: off | .manage-cookies-overlay .sqs-toggle--off |
| On/Off toggle | .toggle-wrapper |
| Mange Overlay: Save Preferences Button | .manage-cookies-overlay .save .sqs-button-element--primary |
| Cookie Preferences button | .manage-cookies-bar |

## New style snippets

- Green accept button / red decline button
    
    ```css
    .accept sqs-button-element--primary {
      background:green!important
    }
    
    .decline sqs-button-element--secondary {
      background:red!important
    }
    ```
    
- Green accept button / red decline button - hover state
    
    ```css
    .accept sqs-button-element--primary:hover {
      background:green!important
    }
    
    .decline sqs-button-element--secondary:hover {
      background:red!important
    }
    ```
    
- Forced rounded buttons
    
    ```css
    .button-group * {
    border-radius:20px!important
    }
    ```
    
- Box shadow for the entire alert
    
    ```css
    .gdpr-cookie-banner {
    box-shadow: -15px 0px 15px 
    }
    ```
    
- Manage overlay: rounded corners
    
    ```css
    .manage-cookies-overlay{
    border-raidus: 20px!important
    }
    ```
    
- Mange overlay: centered title
    
    ```css
    .manage-cookies-overlay h3{
    text-align:center
    }
    ```
    
- Mange overlay: smaller uppercase title
    
    ```css
    .manage-cookies-overlay h3{
    text-transform:uppercase;
    font-size: .9rem!important
    }
    ```
    
- Uppercase on/off toggle text
    
    ```css
    .toggle-wrapper {
    text-transform:uppercase
    }
    ```
    
- Keep cookie preferences button/bar visible at the bottom of the screen
    
    ```css
    .manage-cookies-bar {
    position:fixed;
     bottom:0!important;
      z-index:9999!important
    }
    ```
    

## Version 7.0 Selectors

These codes work for both the light and dark versions of the cookie alert.

| Cookie Alert Banner or Bar | .sqs-cookie-banner-v2 |
| --- | --- |
| Cookie Alert Text | .sqs-cookie-banner-v2 p |
| Cookie Alert “Accept” | .sqs-cookie-banner-v2-accept |
| Cookie Alert “Decline” | .sqs-cookie-banner-v2-denyWrapper |
| Cookie Alert “Accept” Text | .sqs-cookie-banner-v2-accept a |
| Cookie Alert “Decline” Text | .sqs-cookie-banner-v2-denyWrapper a |

## Version 7.0 Style Snippets

- Change cookie alert text to assigned paragraph font family
    
    ```css
    .sqs-cookie-banner-v2 p {
    font-family:var(--body-font-font-family)!important
    }
    ```
    
- Decline red / Accept green
    
    ```css
    .sqs-cookie-banner-v2-accept {
     background:green!important
    }
    .sqs-cookie-banner-v2-deny {
     background:red!important
    }
    ```
    
- Decline red / Accept green on Hover
    
    ```css
    .sqs-cookie-banner-v2-accept:hover {
     background:green!important
    }	
    .sqs-cookie-banner-v2-deny:hover {
     background:red!important
    }
    ```
    
- Rounded Buttons
    
    ```css
    .sqs-cookie-banner-v2-accept, .sqs-cookie-banner-v2-deny {
     border-radius:20px
    }
    ```
    
- Add a Box Shadow to the Entire Alert
    
    ```css
    .sqs-cookie-banner-v2 {
     box-shadow: -15px 0px 15px
    }
    ```
    
- Add an Inset Box Shadow to the Entire Alert
    
    ```css
    .sqs-cookie-banner-v2 {
     box-shadow: inset 2px 2px 10px #ccc;
     background: #FFF!important;
    }
    .sqs-cookie-banner-v2 *{
    color:#000!important
    }
    ```
