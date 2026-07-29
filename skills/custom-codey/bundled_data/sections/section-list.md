# List (People) Sections

Type: Page Sections
Compatible Versions: 7.1
Last Updated: April 23, 2025

You can customize the fonts and colors using the site styles menu, but these codes will help you isolate unique aspects of the list so you can add image filters, custom fonts, creative colors, and more.

The following selectors and snippets are for List Sections.

## Selectors

| List Section Title | .list-section-title |
| --- | --- |
| Pro Tip: Alignment | Regardless of the font style you’re using, adding P will give you text & font property control over the title. For example, this will align it to the left:
*.list-section-title p {text-align: left}* |
| List Section Button | .list-section-button |
| List Item Image | .list-image |
| List Item Title | .list-item-content__title |
| List Item Description Area | .list-item-content__description |
| List Item Description Text | .list-item-content__description p |
| List Item Button | .list-item-content__button |
| List Item Card | .list-item[data-is-card-enabled="true"] |
| Simple List | .user-items-list-simple   |
| Banner List | .user-items-list-banner-slideshow  |
| Banner Arrow Button | .user-items-list-banner-slideshow__arrow-button |
| Banner Arrow Background | .user-items-list-banner-slideshow__arrow-icon-background |
| Banner Arrow Icon | .user-items-list-banner-slideshow__arrow-icon-foreground  |
| Banner Slideshow Images | .user-items-list-banner-slideshow .slides img |
| Banner Slideshow Content | .user-items-list-banner-slideshow .slide-content |
| Carousel List | .user-items-list-carousel |
| Carousel Arrow Button | .user-items-list-carousel__arrow-button |
| Carousel Arrow Background | .user-items-list-carousel__arrow-icon-background |
| Carousel Arrow Icon | .user-items-list-carousel__arrow-icon-foreground |
| Carousel Image | .user-items-list-carousel__media-container |
| Mobile Carousel Arrow Background | .mobile-arrow-icon-background-area |
| Mobile Carousel Arrow Icon | .mobile-arrow-icon |

## Snippets

- Give The List Item Card A Border
    
    ```css
    .list-item[data-is-card-enabled="true"] {border:5px solid blue}
    ```
    
- Create A Rounded Corner List Item Card With Border Radius
    
    ```css
    .list-item[data-is-card-enabled="true"] {border-radius:25px}
    ```
    
- Create A Linear Gradient Background For A List Item Card
    
    ```css
    .list-item[data-is-card-enabled="true"] {
     background: linear-gradient(to right, blue, red)
    }
    ```
    
- Change The List Item Card Border Color On A Hover
    
    ```css
    .list-item[data-is-card-enabled="true"]:hover {border-color:red}
    ```
    
- Give A List Item Card A Box Shadow On A Hover
    
    ```css
    .list-item[data-is-card-enabled="true"]:hover {box-shadow: 5px 5px 10px #000}
    ```
    
- Display Two Font Styles in a List Item Description
    
    <aside>
    💡 **PRO TIP**
    You can use the multiple font types in a list item description to have two different text styles! 
    To isolate bold text, use the code name **.list-item-content__description strong** and reset the **font weight** back to **normal** like this example:
    
    </aside>
    
    ```css
    list-item-content__description strong {
     font-weight: normal!important; 
     font-family: serif;
     color: green; 
     font-size: 1rem
    }
    ```
    
- Move the side arrows to the top of a banner section
    
    ```css
    .user-items-list-banner-slideshow .arrow-container {
        align-items: flex-start!important;
         padding-top:40px
    }
    ```
