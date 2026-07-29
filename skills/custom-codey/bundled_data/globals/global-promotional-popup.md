# Promotional Popup

Type: Global Elements
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

To turn on this premium feature, navigate to *Marketing > Promotional Popup*

You can use the Style Menu at the bottom of the Promotional Popup Menu to change fonts and colors.

Use the selectors below to add unique borders, gradients, unique custom fonts, or even a background image.

## Selectors

| Popup Box | .sqs-slide-layer-content |
| --- | --- |
| Website Overlay | .sqs-slide-wrapper[data-slide-type="popup-overlay"] .sqs-slide |
| Close Button | .sqs-popup-overlay-close |
| Title Text | #sqs-slash-page-header |
| Description Text Area | .sqs-slice-body |
| Description Text | .sqs-slice-body * |
| Newsletter Email Field | #overlayNewsletterEmail-field |
| Newsletter Subscribe Button | .sqs-slide-layer-content button |
| Newsletter Disclaimer Area | .form-disclaimer-text |
| Newsletter Disclaimer Text | .form-disclaimer-text * |
| Buttons | .sqs-slice-buttons a |

<aside>
💡 **PRO TIP**
Have multiple buttons? You can change one at a time using the nth-child selector. 

This code will make the first button blue, second red, and the third button green:

**.sqs-slice-buttons li:nth-child(1) a{background: blue!important}
.sqs-slice-buttons li:nth-child(2) a{background: red!important}
.sqs-slice-buttons li:nth-child(3) a{background: green!important}**

</aside>

## Snippets

- Add a custom border
    
    ```css
    .sqs-slide-layer-content {
    border: 5px solid red
    }
    ```
    
    <aside>
    💡 To learn more about borders, check out this article:
    
    [Border Basics for Beginners](https://www.notion.so/Border-Basics-for-Beginners-4961bc9391024fcda6a5bd8f4de47f1e?pvs=21)
    
    </aside>
    
- Change all promo fonts to a different font family
    
    ```css
    .sqs-popup-overlay * {
    font-family:Poppins!important
    }
    ```
    
- Change the color of all promo popup fonts
    
    ```css
    .sqs-popup-overlay * {
    color: red!important
    }
    ```
