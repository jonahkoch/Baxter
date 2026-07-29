# Summary Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

Share your existing content on other pages with a **Squarespace summary blocks**.

Summary blocks are a convenient way to share content from your existing blog posts, events, products, or even videos on other pages of your website.

This content block can display images, titles, excerpts, meta data, and links to your content in an organized way.

Summary blocks have a few premade layouts to choose from, and each collection page has it’s display settings.

You can filter the summary block content by tags and categories, making it easy to feature information that your website visitors will want to see next!

**How to customize the content in Squarespace summary blocks with CSS**

[**How to change read more link text on a Squarespace summary blocks**](https://insidethesquare.co/squarespace-tutorials/summary-link-text)

Change the automatic text link for a summary block with the codes from this tutorial!

[Read More →](https://insidethesquare.co/squarespace-tutorials/summary-link-text)

## Selectors

| Summary Block Title | .summary-header-text |
| --- | --- |
| Summary Item Title | .summary-title |
| Thumbnail | .sqs-block-summary-v2 .summary-thumbnail-container  |
| Event Overlay | .summary-thumbnail-event-date |
| Event Overlay: Month | .summary-thumbnail-event-date-month |
| Event Overlay: Day | .summary-thumbnail-event-date-day |
| Excerpt | .summary-excerpt |
| Read More Link | .summary-read-more-link |
| Primary Metadata | .summary-metadata--primary |
| Secondary Metadata | .summary-metadata--secondary |
| *Pro Tip: Changing text & font properties?*  | *add an * after your metadata selector* |
| Metadata: Product Price | .summary-price |
| Metadata: Date | .summary-metadata-item--date |
| Metadata: Category | .summary-metadata-item--cats |
| Metadata: Tags | .summary-metadata-item--tags |
| Metadata: Author | .summary-metadata-item--author |
| Metadata: Location | .summary-metadata-item--location |
| Metadata: Comments | .summary-metadata-item--comments |
| Metadata: Event Time (12hr) | .event-time-12hr |
| Metadata: Event Time (24hr) | .event-time-24hr |
| Carousel | .sqs-gallery-design-carousel |
| Carousel: arrows | .sqs-gallery-design-carousel .sqs-gallery-controls  |
| Carousel: arrow next | .sqs-gallery-design-carousel .sqs-gallery-controls .next |
| Carousel: arrow previous | .sqs-gallery-design-carousel .sqs-gallery-controls .previous |
| Grid | .sqs-gallery-design-autogrid |
| List | .sqs-gallery-design-list |
| Wall | .sqs-gallery-design-autocolumns |
| Carousel Arrows: Previous | .summary-carousel-pager-prev:before |
| Carousel Arrows: Next | .summary-carousel-pager-next:before |

<aside>
💡 **PRO TIP**
There are four main summary types that you can insert into any standard page, and all four of them respond to the following **code names** in both 7.1 & 7. You can use these summary types at the start of your code to isolate a specific summary block. For example, if you want to make sure that blog titles in a list summary are the color red, I would combine the codes like this: 

**.sqs-gallery-design-list .summary-title {color: red!important}**

</aside>

<aside>
💡 **PRO TIP**
The prev/next arrows are actually characters tucked into the before pseudo state! You’ll want to use font and text properties to adjust them, like this snippet example:

**.summary-carousel-pager-prev:before {color: red}
.summary-carousel-pager-next:before {color: blue}**

</aside>

- Extend all summary items to the full height and add a background color
    
    ```jsx
    .summary-item{
     min-height:100%;
     background: #e5f5f6!important
    }
    ```
    
- Image after content
    
    ```css
    /* Keep items in a row */
    .summary-item-list.sqs-gallery {
      display: flex !important;
      flex-wrap: wrap;
      gap: 30px;
      height: auto !important;
    }
    
    /* Set up column layout for individual items */
    .summary-item.sqs-gallery-design-autocolumns-slide {
      flex: 1;
      min-width: 300px; /* Minimum width before wrapping */
      display: flex;
      flex-direction: column;
      position: relative !important;
      left: auto !important;
      top: auto !important;
    }
    
    /* Move thumbnail below content */
    .summary-content {
      order: 1;
      margin-bottom: 20px;
    }
    
    .summary-thumbnail-outer-container {
      order: 2;
      width: 100%;
    }
    
    /* Ensure images fill container width */
    .summary-thumbnail img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    /* Adjust content spacing */
    .summary-title {
      margin-bottom: 15px;
    }
    
    .summary-excerpt {
      margin: 15px 0;
    }
    
    /* Responsive adjustments */
    @media screen and (max-width: 768px) {
      .summary-item-list.sqs-gallery {
        flex-direction: column;
      }
      
      .summary-item.sqs-gallery-design-autocolumns-slide {
        width: 100% !important;
        margin-bottom: 30px;
      }
    }
    ```
