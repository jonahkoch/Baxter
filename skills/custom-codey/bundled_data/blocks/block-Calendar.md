# Calendar

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

A **Squarespace calendar block** can be used to display your events, blog posts, products, or even photos on a page in your Squarespace site.

Calendar blocks are perfect for displaying content in a visual way, but they can't be used for booking appointments.

You can use the calendar block to add details to date specific content, like descriptions and images to your events, blog posts, or products.

Calendar blocks are designed to be responsive, which means the size and layout will adjust automatically to make sure your calendar looks great on all screen sizes.

**What you can customize about the calendar block using Squarespace**

- Calendar block fonts will be updated to match the **paragraph** font family that is assigned in your site style menu.
- Calendar block font sizes and colors can not be customized using any design menu in Squarespace at this time.
- Vertical alignment for calendar blocks can be assigned in a fluid engine section. The calendar block will always stretch to fill the content block horizontally.

## Selectors

| Calendar Block | .yui3-squarespacecalendar-content |
| --- | --- |
| Month & Year | .yui3-calendar-header-label |
| Previous Month Arrow (left) | .yui3-squarespacecalendar .yui3-calendarnav-prevmonth  |
| Next Month Arrow (right) | .yui3-squarespacecalendar .yui3-calendarnav-nextmonth |
| Row of Day Labels | .yui3-calendar-weekdayrow |
| Week Day Titles | .yui3-calendar-weekday |
| Week Day Title - Sunday Only | .yui3-squarespacecalendar-content [aria-label="Sunday"] |
| Week Day Title - Monday Only | .yui3-squarespacecalendar-content [aria-label="Monday"] |
| Week Day Title - Tuseday Only | .yui3-squarespacecalendar-content [aria-label="Tuesday"] |
| Week Day Title - Wednesday Only | .yui3-squarespacecalendar-content [aria-label="Wednesday"] |
| Week Day Title - Thursday Only | .yui3-squarespacecalendar-content [aria-label="Thursday"] |
| Week Day Title - Friday Only | .yui3-squarespacecalendar-content [aria-label="Friday"] |
| Week Day Title - Saturday Only | .yui3-squarespacecalendar-content [aria-label="Saturday"] |
| Previous Month Day Cell | .yui3-squarespacecalendar .yui3-calendar-prevmonth-day |
| Current Month Day Cell | .yui3-squarespacecalendar .yui3-calendar-day |
| Next Month Day Cell | .yui3-squarespacecalendar .yui3-calendar-nextmonth-day |
| Date - Number | .yui3-squarespacecalendar .marker |
| Current Day Cell | .yui3-calendar-day.today |
| Thumbnail Image | .yui3-squarespacecalendar .background-image-link |
| Popup  | .flyoutitem |
| Popup - Title | .yui3-squarespacecalendar .flyoutitem-title a |
| Popup - Time | .flyoutitem-datetime |
| Popup- Location | .flyoutitem-location |
| Popup - Description Area | .flyoutitem-excerpt |
| Popup - Description Text | .flyoutitem-excerpt |

## Snippets

- Add a border to every day cell
    
    ```css
    .yui3-calendar-day{border:1px solid #000}
    ```
    
- Add a custom border and background to today’s date
    
    ```css
    .yui3-calendar-day.today{
     border: 1px solid #000!important;
     background:yellow!important
    }
    ```
    
- Change prev/next month arrow size
    
    Those arrows are actually a character, so it can be changed with any text & font property 
    
    ```css
    .yui3-squarespacecalendar .small-layout .yui3-calendarnav-nextmonth:before,
     .yui3-squarespacecalendar .small-layout .yui3-calendarnav-prevmonth:before {
     font-size:40px
     }
    ```
    
- Display event thumbnail images on dates on smaller screens, including mobile
    
    ```css
    /* Make sure calendar cells with events are positioned to contain the image */
    .sqs-block-calendar td.has-event {
      position: relative !important;
      overflow: hidden !important;
    }
    
    /* Make sure the background container fills the cell */
    .sqs-block-calendar .background {
      position: absolute !important;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    /* Cover the cell neatly without distortion */
    .sqs-block-calendar .background-image {
      height: 100% !important;
      width: 100% !important;
      object-fit: cover !important;
      position: static !important;
      top: 0;
      left: 0;
      z-index: 1;
    }
    
    /* Keep the text/marker above the image */
    .sqs-block-calendar .marker,
    .sqs-block-calendar .itemlist {
      position: relative;
      z-index: 2;
    }
    
    ```