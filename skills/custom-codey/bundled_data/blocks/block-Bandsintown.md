# Bandsintown

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

A **Squarespace bandsintown block** is an easy way to display your tour, festival, or live stream schedule right on your Squarespace site.

When you connect this Squarespace content block with your Bandsintown profile, your website visitors can RSVP, buy tickets, join live shows, and even get reminders about upcoming events – all with just a click!

**Important to know:** You can't edit the block's content directly on Squarespace. Instead, make changes to your Bandsintown account, and they'll automatically update on your site.

**What you can customize about the Bandsintown block using Squarespace**

You can choose to display all **upcoming** shows or list **specific** **dates**.

The **text** **style** will match your paragraph 2 style and can not be changed for this specific content block using the site editor.

The **button** **style** will match the colors that are used by the color theme for that section of your site and cannot be changed for this specific content block using the site editor.

## Selectors

| Bandsintown Block | .sqs-tourdates-bandsintown-list-content |
| --- | --- |
| Bandsintown - Tour Item | .sqs-tourdates__item |
| Bandsintown - Tour Item Text | .sqs-tourdates__info |
| Bandsintown - Tour Date | .sqs-tourdates__date |
| Bandsintown - Day of the Week | .sqs-tourdates__weekday |
| Bandsintown - Venue Name | .sqs-tourdates__venue |
| Bandsintown - Venue Location | .sqs-tourdates__location |
| Bandsintown - Buttons | .sqs-tourdates__button |

## Snippets

- Alternating Color Tour Date Items
    
    ```css
    .sqs-tourdates__item:nth-child(odd) {
     background:#ccc
    }
    .sqs-tourdates__item:nth-child(even) {
     background:#ddd
    }
    ```
    
- Raised Item Details on Hover
    
    ```css
    .sqs-tourdates__item:hover{
      box-shadow: 5px 5px 15px rgba(0,0,0,0.3)!important;
    }
    ```