# Portfolios & Projects

Type: Collections
Compatible Versions: 7.1
Last Updated: April 23, 2025

<aside>
💡 Portfolios and the project pages that are nested in them are a feature specific to Squarespace 7.1 sites. **These codes are not for Squarespace 7 sites.**

</aside>

Accordion blocks display a list of titles with additional descriptions that can be revealed on a click. There are options to change the line thickness, font style and more inside Squarespace design menus.

Portfolio’s are collections of projects that have nested URLs, very similar to blog posts. 

The portfolios and projects can have page sections but they do not have tags, categories, or comment capabilities.

## Selectors

## Portfolio Page Selectors

### Grid: Simple

| Portfolio Display | .portfolio-grid-basic  |
| --- | --- |
| Individual Project | .portfolio-grid-basic .grid-item |
| Project Title | .portfolio-grid-basic .portfolio-title |
| Project Image | .portfolio-grid-basic .grid-item .grid-image |

### Grid: Overlay

| Portfolio Display | .portfolio-grid-overlay |
| --- | --- |
| Individual Project | .portfolio-grid-overlay .grid-item |
| Project Title | .portfolio-grid-overlay .grid-item .portfolio-title |
| Project Image | .portfolio-grid-overlay .grid-item .portfolio-image |
| Project Image Overlay | .portfolio-grid-overlay .grid-item .portfolio-overlay |

### Hover: Background

| Portfolio Display | .portfolio-hover[data-mode="hover-cover"] |
| --- | --- |
| Project Title List | .portfolio-hover-items-list * |
| Project Image | .portfolio-hover-bg-img |

### Hover: Fixed

| Project Title List | .portfolio-hover[data-variant-hover-static] 
.portfolio-hover-item-title |
| --- | --- |
| Project Image | .portfolio-hover-bg-img |

### Hover: Follow Cursor

| Project Title List | .portfolio-hover-item-title |
| --- | --- |
| Project List Delimiter | .portfolio-hover-item:not(:last-child) 
.portfolio-hover-item-title::after |
| Project Image | .portfolio-hover-bg-img |

## Project Page Selectors

| Pagination | .item-pagination--prev-next |
| --- | --- |
| Previous Project Title | .item-pagination-link--prev * |
| Previous Project Arrow Icon | .item-pagination-link--prev .icon svg |
| Next Project Title | .item-pagination-link--next * |
| Next Project Arrow Icon | .item-pagination-link--next .icon svg |
| Both Pagination Icons | .item-pagination-link .item-pagination-icon svg |
| HIde All Pagination | .item-pagination--prev-next {display: none} |

## Snippets

### Change previous and next arrow icon colors

The previous and next arrows are SVG icons. You can change their color using the stroke property like this example, that will change the left/previous arrow to yellow:

```css
.item-pagination-link--prev .icon svg {stroke: yellow!important}
```

### Make arrows bigger

To make those arrows bigger, you can use the property stroke width like this example code here: 

```css
 .item-pagination-link--prev .icon svg {stroke-width: 5px}
```

### Replace arrow with unicode character

You can replace that arrow with a unicode character, using this code example here:

```css
.item-pagination-link--prev .icon svg {
 stroke-width: 0px; 
}
.item-pagination-link--prev .icon:before {
 content:"←"; 
 font-size: 1.5rem!important
}
```
