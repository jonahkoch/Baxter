# Newsletter Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

You can use the **Squarespace newsletter block** to grow your email list!

Having a list of email addresses that belong to people who want to hear from you is an important part of any modern business.

The Squarespace newsletter block makes it easy for anyone to sign up for your email list so you can send them important information.

This newsletter block works with Squarespace email campaigns, and can also connect to Mailchimp, Google drive, and Zapier.

**How to customize the Squarespace newsletter block with CSS**

CSS stands for Cascading Style Sheet and it’s a special type of code that you can use to customize Squarespace.

This tutorials will teach you how to use basic custom code to create a unique style for your newsletter block: [insidethesquare.co/squarespace-tutorials/newsletter](https://insidethesquare.co/squarespace-tutorials/newsletter)

## Selectors

| Newsletter Block | .newsletter-block |
| --- | --- |
| Newsletter Body | .newsletter-form-body |
| Newsletter Title | .newsletter-form-header-title |
| Newsletter Description | .newsletter-form-header-description |
| Newsletter Form Input Box | .newsletter-form-field-element |
| User Input Text | .newsletter-form input |
| Newsletter Button | .newsletter-form-button |
| Newsletter Disclaimer Text | .newsletter-form-footnote |
| Form Submission Message | .form-submission-text |

<aside>
💡 **PRO TIP**
Use the selector above to add a border to the entire newsletter form, change the background color, add a box-shadow, or even change all of the text to a new color using an * symbol like this: 

**.newsletter-block * {color:orange!important}**

</aside>

## Snippets

- Add a border to the newsletter block
    
    ```css
    .newsletter-block{
    border:1px solid #333
    }
    ```
    
- Make the disclaimer text of a newsletter block capitalized
    
    ```css
    .newsletter-form-footnote  {
    text-transform:uppercase!important
    }
    ```
    
- Curve the corners of the newsletter block email input & give it a border
    
    ```css
    .newsletter-form-field-element{
    border-radius: 30px;
    border:1px solid #333!important
    }
    ```
    
- Change the color of the newsletter block submit button on a hover
    
    ```css
    .newsletter-form .newsletter-form-button:hover{
    background: #ccc!important;
    color:#333!important;
    opacity:1!important
    }
    ```
    
- Make the newsletter block button full-width on mobile
    
    ```css
    @media only screen and (max-width: 640px) { 
    .newsletter-form *{
        width: 100%!important;
        max-width: 100vw!important;
        }}
    ```
