# Menu Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

Display an organized list of your offerings with a **Squarespace menu block.**

A premium feature for business and commerce plans, the menu content block allows you to place an organized menu of items directly into your Squarespace site.

Menu blocks will help you organize your delicious offerings into pages and sections that contain items. This makes it much easier for your visitors to find exactly what they're craving!

Each page is a group of related items. Maybe you have a "Starters" page, a "Main Courses" page, and a "Desserts" page. You can even add a little blurb under each page title to describe what it's all about (optional, but it adds a nice touch!). Inside each page you can have sections and individual menu items.

## Selectors

| Menu Block | .menu-block |
| --- | --- |
| Page Text Links - Area | .menu-block .menu-selector  |
| Page Text Links - Text | .menu-block .menu-selector * |
| Page Text Links - Active Page Text | .menu-block .menu-select-labels--active |
| Menu Section Header - Area | .menu-section-header |
| Menu Section Header - Title | .menu-section-title |
| Menu Item - Area | .menu-item |
| Menu Item Title | .menu-item-title |
| Menu Item Description | .menu-item-description |
| Menu Item Price - multi column | .menu-item-price-top |
| Menu Item Price - centered | .menu-item-price-bottom |
| Menu Item Currency | .menu-item .currency-sign |

## Snippets

- Remove the underline from an active link in a menu block
    
    ```css
    .menu-block .menu-select-labels--active {
     text-decoration: none!important
    }
    ```
    
- Create a hover effect and separately styled active link page in a menu block
    
    ```css
    .menu-block .menu-select-labels {
     background: #ccc; 
     padding: 1rem!important
    }
    .menu-block .menu-select-labels:hover{
     background:#fff; 
     color:#000; 
     border:1px solid #000
    }
    .menu-block .menu-select-labels--active {
     text-decoration: none!important;
     background: #000; 
     color:#fff
    }
    ```
    
    ![Menu.png](Menu%20Block/Menu.png)
