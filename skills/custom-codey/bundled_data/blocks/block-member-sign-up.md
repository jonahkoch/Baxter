# Member Sign Up Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

When you create a members area within your Squarespace site, you used to be able to encourage people to sign up using the member sign-up block. Squarespace changed this block to the Digital Product Block in early 2024. These codes are used for the older block if you still have it in place on your site.

For any new content using the digital product block, refer to the selectors on this page:

[Digital Product Block](https://www.notion.so/Digital-Product-Block-6b52276883304dc58027c55d60539b87?pvs=21)

## Selectors

| Sign Up Block Title | .member-area-title |
| --- | --- |
| Sign Up Block Price | .member-area-block .product-price  |
| Sign Up Block Description | .member-area-description |
| Sign Up Block Button | .member-area-block .sqs-editable-button |
| Header Link for Login | .user-accounts-link  |

## Snippets

- Change the member login link to say “Student Login”
    
    ```css
    .user-accounts-link .user-accounts-text-link:before {
     content: "Student Login" !important
    }
    ```
    
- Create rounded corners for the member sign up block
    
    ```css
    .member-area-block .sqs-editable-button {border-radius: 25px}
    ```
    
- Switch Background Color of a member sign up block on Hover
    
    ```css
    .member-area-block .sqs-editable-button {
     background: #98ca45!important
    }
    
    .member-area-block .sqs-editable-button:hover {
     background: #50bdb8!important;
     opacity:1!important;
    }
    ```
    
- Arrow After Text That Moves on Hover
    
    ```css
    .member-area-block .sqs-editable-button *:after {
     content:"\A0 →";
    }
    .member-area-block .sqs-editable-button:hover *:after {
     Margin-left:.5rem
    }
    .member-area-block .sqs-editable-button:hover{
     Opacity:1!important
    }
    ```
    
- Outline Button to Full Cover on Hover
    
    ```css
    .member-area-block .sqs-editable-button {
     border: 2px solid #000!important;
     background:transparent!important;
     color:#000!important
    }
    
    .member-area-block .sqs-editable-button:hover{
     background:#000!important;
     opacity:1!important
    }
    
    .member-area-block .sqs-editable-button:hover * {
     color:#fff
    }
    ```
