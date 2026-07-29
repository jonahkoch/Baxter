# Videos

Type: Collections
Compatible Versions: 7, 7.1
Last Updated: April 23, 2025

## Selectors

## Video List Selectors

Your list of videos does respond to **.page-section, .section-background**, & .**content-wrapper** selectors BUT it also responds to **.lesson** as the container for the whole thing.  

If you want to add a border to just the video section content (displayed inset) and no other sections on the page? This code will work: **.lessons {border :5px solid purple}**

You can also use this to make universal changes to things like changing all the text on this page to a specific font family: **.lessons * {font-family: serif!important}**

| Video Thumbnails | .lessons .grid-image |
| --- | --- |
| Meta Data Container | .lessons .lessons-grid-meta-container |
| Meta Data - Category | .lesson-category |
| Video Title | .lesson-title |
| Video Description | .lessons .grid-main-meta |
| Text container (title, excerpt, and meta) | .lessons .grid-item |
| Video Categories: Sidebar | .lessons .nested-category-tree-wrapper |
| Video Categories: Sidebar Links | .lessons .nested-category-tree-wrapper .category-link |
| Video Categories: Active Sidebar Link | .lessons .nested-category-tree-wrapper .category-link.active |

<aside>
💡 **PRO TIP** 
You don’t have to list **.lessons** as a selector, but this will help isolate your changes to the video page if you are using site wide CSS

</aside>

## Individual Video Page

You can’t add a code block to a video page. Installing any code changes for individual video pages can be done using site wide CSS (***Design > Custom CSS***) or by **Page Header Code Injection** found under the advanced section of the video list settings menu.

| Video Page | .lesson-item |
| --- | --- |
| Video player | .lesson-item .video-player |
| Video Information Text Container | .lesson-detail-text-wrapper |
| Meta Data | .lesson-item .lesson-grid-meta-container |
| Meta Data: Categories | .lesson-item .lesson-category |
| Meta Data: Date | .lesson-item .lesson-duration |
| Title | .lesson-details-title |
| Video Description | .lesson-details-description |
| Active links Inside Video Description | .lesson-item .lesson-details-description a |
| Prev/next Pagination | .lesson-item-pagination--prev-next |
| Pagination: Prev Link | .lesson-item-pagination-link--prev |
| Pagination: Next Link | .lesson-item-pagination-link--next |
| Pagination: icon | .lesson-item-pagination-icon svg |
| Related Videos (container) | .lessons-item-related-wrapper |
| Related Videos: title | .lessons-item-related-title |
| Related Videos: list | .lessons-item-related-item-list |
| Related Video: individual item | .related-item |
| Related Video: thumbnail | .related-item-link-thumbnail |
| Related Video: title link | .related-item-link-text |

<aside>
💡 **PRO TIP** 
At the time of releasing this info, this is the correct selector for the date BUT this is a strange name for the date, so it might be an error that will be updated later!

</aside>

## Snippets

## Video List Style Snippets

- Two columns of videos on mobile
    
    ```css
    @media only screen and (max-width:788px) { 
     .lessons .list-grid{
     display:grid; 
     grid-template-columns: repeat(2, minmax(0, 1fr))!important
    }
    }
    ```
    
- Center text on mobile only
    
    ```css
    @media only screen and (max-width:788px) { 
     .lessons *{
     text-align:center!important
    }
    }
    ```
    
- Rounded video thumbnail corners
    
    ```css
    .lessons .grid-image{border-radius:25px!important}
    ```
    
- Video thumbnail: Box shadow on hover
    
    ```css
    .lessons .grid-item:hover .grid-image{
     box-shadow: 5px 5px 10px #ddd
    }
    ```
    
- Video thumbnail & description border
    
    ```css
    .lessons .grid-item {
     border: 1px solid #000; 
    }
    .lessons .grid-meta-wrapper{
     padding: 1rem; 
     width:calc(100% - 2rem)!important
    }
    ```
    
- 9:16 ratio thumbnails
    
    ```css
    .lessons.collection-content-wrapper .grid-item .grid-item-image{
    top:0!important
    }
    .lessons.collection-content-wrapper .grid-image-wrapper{
    padding-bottom:176%
    }
    ```
    

## Video List Style Snippets: Category Top Links

- Top bar: Turn category links into buttons
    
    ```css
    .lessons .nested-category-tree-wrapper .category-link { 
     margin: .5rem; 
     background:pink; 
     padding: .5rem; 
     border-radius: .5rem;
    } 
    .lessons .nested-category-tree-wrapper .category-link:hover{
     background:#ADD8E6; 
     box-shadow: 5px 5px 10px #333
    )
    ```
    
- Center top bar category links
    
    ```css
    .lessons .nested-category-children {
     justify-content:center
    }
    ```
    
- Hide the **all** link at the beginning of the bar
    
    ```css
    .lessons.collection-content-wrapper
    .nested-category-breadcrumb-list-item:first-of-type{ 
     display: none
    }
    ```
    

## Pre-made codes for video list category sidebar links

- Sidebar: Turn category links into buttons
    
    ```css
    .lessons .nested-category-tree-wrapper .category-link { 
     margin: .5rem; 
     background:pink; 
     padding: .5rem; 
     border-radius: .5rem;
    }
    .lessons .nested-category-tree-wrapper .category-link:hover{
     background:#ADD8E6; 
     box-shadow: 5px 5px 10px #333
    )
    ```
    
- Hide the **all** link at the top of the sidebar
    
    ```css
    .lessons.collection-content-wrapper 
     .nested-category-tree-wrapper li:first-of-type {
     display:none
    }
    ```
    

## Video Page Layout Style Snippets

All of these layouts will need value adjustments depending on the size of the text on your site, and the header and footer height. Adjust any values until it looks perfect for your own website.

- Title and meta above video, description below
    
    ```css
    .lesson-item .video-player {
     margin-top: 10rem
    } 
    .lesson-details-title {
     margin-top:-115%!important; 
     padding-bottom:100%;
    } 
    .lesson-item .lesson-grid-meta-container {
     margin-top:-110%; 
     padding-bottom: 100%;
    }
    ```
    
- Split layout: text left, video right (desktop only)
    
    ```css
    @media only screen and (min-width: 788px){ 
    .lesson-item .lesson-details .lesson-desc{
    flex-direction:row!important;
    }
    .lesson-item .lesson-details .lesson-video-wrapper{
      width:50%;
      margin:auto;
      order:2
    }
    .lesson-item .lesson-detail-text-wrapper{
    width:50vw;
    margin:2vw
    }
    }
    ```
    
- Split layout: text right, video left (desktop only)
    
    ```css
    @media only screen and (min-width: 788px){ 
    .lesson-item .lesson-details .lesson-desc{
    flex-direction:row!important;
    }
    .lesson-item .lesson-details .lesson-video-wrapper{
      width:50%;
      margin:auto;
    }
    .lesson-item .lesson-detail-text-wrapper{
    width:50vw;
    margin:2vw
    }
    }
    ```
    
- Vertical video split layout: text right, video left (desktop only)
    
    ```css
    @media only screen and (min-width: 788px){ 
    .lesson-item .lesson-details .lesson-desc{
    flex-direction:row!important;
    }
    .lesson-item .lesson-details .lesson-video-wrapper{
      width:50%;
      margin:auto;
    }
    .lesson-item .lesson-detail-text-wrapper{
    margin:2vw
    }
      .lesson-item .lesson-details .lesson-video-inner-wrapper{
        padding-bottom:175%!important
      }
      }
    ```
    
- Vertical video split layout: text left, video right (desktop only)
    
    ```css
    @media only screen and (min-width: 788px){ 
    .lesson-item .lesson-details .lesson-desc{
    flex-direction:row!important;
    }
    .lesson-item .lesson-details .lesson-video-wrapper{
      width:50%;
      margin:auto;
      order:2;
    }
    .lesson-item .lesson-detail-text-wrapper{
    margin:2vw
    }
      .lesson-item .lesson-details .lesson-video-inner-wrapper{
        padding-bottom:175%!important
      }
      }
    ```
    
- Reduce video width & center it
    
    ```css
    .lesson-item .lesson-details .lesson-video-wrapper{
    width: 80%;
    margin:auto
    }
    ```
    
- Turn video description links into buttons (incl hover effects!✨)
    
    ```css
    .lesson-item .lesson-details-description a{
      background:#fff;
      color:#333;
      padding: 10px;
      border:3px solid #333;
      font-weight:bold
    }
    .lesson-item .lesson-details-description a:hover{
      background:#333;
      color:#fff;
    }
    ```
    
- Stack pagination & update font size (mobile only)
    
    ```css
    @media only screen and(max-width: 640px){
    .lesson-item-pagination--prev-next {
    flex-direction: column!important;
    }
    
    .lesson-item-pagination-link{
    max-width:100%;
    margin-bottom: 40px;
    }
    .lesson-item-pagination-link *{
    font-size:1.5rem!important
    }
    ```
    
- Rounded corner related video thumbnails
    
    ```css
    .related-item-link-thumbnail img{
    border-radius: 15px
    }
    ```
    
- Center title for related videos
    
    ```css
    .related-item{
    text-align:center
    }
    ```
    
- Smaller video: 80%
    
    ```css
    .lesson-item .video-player{
    width: 80%;
    margin:auto
    }
    ```
