# Reservations Block (formerly Events)

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

The event content block is an integration with Tock. The selectors for the Tock **Book Now** button are below. You can use the codes in the button basics section of this PDF to create unique button styles, including hover effects!

For the selectors that you need to customize event collection pages and individual events, check out this page:

[Events](https://www.notion.so/Events-9d2467d74560431db9b6e482b46e5418?pvs=21)

## Selectors

| Book Now Button | .TockButton |
| --- | --- |
| Book Now Button Text | .TockWidget-B2 |

## Snippets

- Give the button a yellow background with green text on hover
    
    ```css
    .TockButton:hover{
     background: yellow!important
    }
    .TockButton:hover .TockWidget-B2 {
     color: green!important
    }
    ```
