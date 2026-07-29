# Form Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

<aside>
🌟 **New Feature:** file uploads are now available in Squarespace forms! The selectors have been added below, and a there are a few new style snippets to try.

</aside>

## About

You can use a **Squarespace form block** to collect information from your website visitors.

**Form blocks are a versatile tool for collecting information from your website visitors.** You can use them to create contact forms, surveys, applications, or any type of form you need.

To make sure you receive form submissions, connect a storage option like your email address or a third-party service.

Remember, form fields might adjust based on your site's language or visitor's location.

**Please note that form blocks are NOT designed for HIPAA-compliant purposes.**

**What you can customize about the form block using Squarespace**

**There are all kinds of amazing design settings available inside Squarespace that you can use to customize the look of your form block.** There are two main areas to reach these settings: your **site** **style** menu, accessible by clicking the paintbrush icon on the top right hand corner of your website preview, or double clicking on the form to open the editing options, and selecting the **design** tab.

In the **design** tab of the form block, you’ll be able to:

Change the submit button style (primary, secondary, or tertiary)

Toggle on/off First Input Highlight

Enable Lightbox mode

Add a background color

Add a custom border (stroke)

Change blend mode & blur options too.

In your **site** **style** menu is where you can change the form field style, text options, and adjust colors based on color themes.

## Form Block Selectors

| Form Field Title | .field-list .title |
| --- | --- |
| Form Field Input Box | .sqs-block-form .field-list .field input, .field textarea |
| Caption Text - First Name / Last Name / Address Fields | .sqs-block-form .form-wrapper .field-list .field .caption |
| Required Text | .sqs-block-form span.required |
| Radio Option Text | .field.radio .option |
| Checkbox Title | .field.checkbox .title |
| Checkbox Option Text | .field.checkbox .option |
| Checkbox Box | .form-wrapper .field-list .field.checkbox input |
| Survey Title | .sqs-block-form .field-list .field.likert .title |
| Survey Option Title Text | .form-wrapper .field-list .field.likert .question |
| Survey Line | .sqs-block-form .field-list .field.likert .option |
| Survey Option Text | .form-wrapper .field-list .field.likert .option * |
| Survey Option Indicator | input[type='radio'] |
| Dropdown Options | .sqs-block-form .field-list .field select |
| Dropdown Arrow | .sqs-block-form svg path |
| Date- Title | .sqs-block-form .field-list .field.date .title |
| Date - Input | .sqs-block-form .field-list .field.date input |
| Time - Title | .sqs-block-form .field-list .field.time .title |
| Time - Input | .sqs-block-form .field-list .field.time input |
| Radio - Title | .form-wrapper .field-list .field.radio .title |
| Radio - Option Title | .form-wrapper .field-list .field.radio label |
| Currency - Title | .field-list .field.currency .title |
| Currency - Input | .field-list .field.currency input |
| Twitter - Title | .field-list .field.twitter .title |
| Twitter - Input | .field-list .field.twitter input |
| Website - Title | .field-list .field.website .title |
| Website - Input | .field-list .field.website input |
| Number - Title | .field-list .field.number .title |
| Number - Input | .field-list .field.number input |
| Address - Title | .field-list .fields.address .title |
| Address - Country Dropdown  | .field-list .fields .country-select * |
| Address - Field Labels | .field-list .fields.address .field .caption |
| Address - Field Input | .field-list .fields.address input |
| File Upload Field | .form-item.field.file |
| File Upload Area | .file-upload |
| Add Your File Text 
*this is a VERY messy selector name and it has changed twice since the file upload release 🫠*  | .utsR_PbuBlohcFioliRe |
| Section Text | .sqs-block-form .form-wrapper .field-list .section * |
| Section Line | .sqs-block-form .form-wrapper .field-list .section.underline |
| Submit Button | .form-wrapper .sqs-button-element--primary |
| Post Submit Text | .form-wrapper .form-submission-text |
| Form Error | .form-field-error |

### Important Pro Tips for Form Customization

<aside>
💡 **PRO TIP**
The survey line is actually a top border applied to the survey options. You can change the look of that border like this example code here: 

**.sqs-block-form .field-list .field.likert .option {border-top: 5px double purple}**

</aside>

<aside>
💡 **PRO TIP**
The section line is actually a bottom border. You can change the look of that border like this example code here: 
**.form-wrapper .field-list .section.underline {border-bottom: 5px double purple}**

</aside>

<aside>
💡 **PRO TIP**
You can get really creative with the interactive side of forms by changing the way a form looks when someone is typing in a certain field. If you want to have a unique border highlighting the field they are typing in, you can use a code like this example here with the focus pseudo-class.

**.sqs-block-form input:focus {background:yellow!important}**

You can also use this same code to remove the solid black outline that Squarespace puts around the focused form field with this code:

.**sqs-block-form input:focus {outline:none!important}**

</aside>

## Contact Form Selectors - Lightbox Mode

<aside>
💡 **PRO TIP**
Using any of the standard form selectors above, start your code with the selector **`.lightbox-content`** and your CSS will only apply to a form when the lightbox mode is enabled!

</aside>

| Lightbox container | .sqs-modal-lightbox-content .lightbox-inner .lightbox-content |
| --- | --- |
| Lightbox button | .lightbox-handle |
| Lightbox Form Background | .sqs-modal-lightbox-content .lightbox-inner .lightbox-content |
| Lightbox Form Close Icon | .lightbox-close |
| Lightbox Form - Site Overlay | .sqs-modal-lightbox-content .lightbox-background |
| Submit button | .lightbox-content .form-wrapper .sqs-button-element--primary |
| Post Submit Text | .lightbox-content .form-wrapper .form-submission-text |

<aside>
💡 **PRO TIP**
The opacity for the site overly is set to .4 which represents 40%. You can change the color and opacity in one line, like this example here: 

**`.sqs-modal-lightbox-content .lightbox-background {background: orange; opacity: .8}`**

</aside>

## Snippets

The following codes can be copied and pasted directly into the CSS of your own site, but I want to encourage you to customize it! When possible, try adjusting the font size, colors, and any other values you see in this code. Keep in mind that this code will change borders, background, and colors; your default font will still be used.

- Replace **(required)** with an asterisk
    
    ```css
    .sqs-block-form span.required{
    visibility:hidden
    }
    .sqs-block-form span.required:before{
    content:" * "; 
    visibility:visible!important
    }
    ```
    
- Change the input text style
    
    ```css
    .sqs-block-form .field-list .field input, .field textarea {
     color: purple!important;
     font-family:Serif;
    }
    ```
    
    <aside>
    💡 **PRO TIP** 
    You can only use a font in your CSS if you already have it installed on your site in your site styles menu or with custom code. If you want to install your own font in Squarespace, [**check out this tutorial**](https://insidethesquare.co/squarespace-tutorials/custom-font-in-squarespace). It’s a little old, but the same steps still apply! 😅
    
    </aside>
    
- Change the background color and remove the outline for fields in active/focus mode
    
    ```css
    .sqs-block-form .field-list .field input:focus, .field textarea:focus {
     background: pink;
     outline: transparent
    }
    ```
    
- Change the checkbox to a circle & adjust colors
    
    *Update this border color and fill color to match your site style!*
    
    ```css
    .form-wrapper .field-list .field.checkbox input {
    border:1px solid pink; 
    border-radius:50%
    }
    .form-wrapper .field-list .field.checkbox input:checked {
    background:pink
    }
    .form-wrapper .field-list .field.checkbox input:checked:before{
    background-color:red
    }
    ```
    
- Change the survey option circle colors - NOT radio option
    
    *Adjust the background colors in the code below; only adjust the size values if necessary*
    
    ```css
    input[type='radio']:after {
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            top: -2px;
            left: -1px;
            position: relative;
            background-color: **#d1d3d1**;
            content: '';
            display: inline-block;
            visibility: visible;
        }
    
        input[type='radio']:checked:after {
            background-color: #ffa500;
            content: '';
        }
    ```
    
- Full height light box on the right-hand side of the screen
    
    ```css
     .sqs-modal-lightbox-content .lightbox-inner .lightbox-content {
     position:absolute;
     right:0;
     margin-top:0rem!important;
     height: 100vh; 
    }
    ```
    
- Full height light box on the left-hand side of the screen
    
    ```css
     .sqs-modal-lightbox-content .lightbox-inner .lightbox-content {
     position:absolute;
     left:0;
     margin-top:0rem!important;
     height: 100vh; 
    }
    ```
    
- Replace form submission error with your own text
    
    ```css
    .form-field-error{
    font-size:0
    }
    .form-field-error:after{
    content:"form error: please correct this field";
    font-size: .8rem;
    padding-top:.5rem
    }
    ```
    
- Change form submission error colors
    
    ```css
    .form-field-error{
    background: pink;
    color:red;
    }
    ```
    
- Capitalize form submission error
    
    ```css
    .form-field-error{
    text-transform: uppercase
    }
    ```
    
- 90 degree corners for the file upload space
    
    ```css
    .file-upload {
    border-radius: 0!important
    }
    ```
    
- Change the “add your file” text to a custom message
    
    ```css
    utsR_PbuBlohcFioliRe{
    font-size:0
    }
    utsR_PbuBlohcFioliRe:after{
    content:"click here to add your image";
    font-size:1rem
    }
    ```
    
- Remove file upload plus icon
    
    ```css
    .OZGdKtLDo5wqzTGYLe2R{
    display:none
    }
    ```
    
- Replace file upload plus icon with your own image
    
    ```css
    .OZGdKtLDo5wqzTGYLe2R svg{
    display:none
    }
    .OZGdKtLDo5wqzTGYLe2R {
    background-color:transparent; 
    background-image:url(image-url-here)!important;
    background-size: contain!important
    }
    ```
