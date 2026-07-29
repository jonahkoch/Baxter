# Blogs

Type: Collections
Compatible Versions: 7, 7.1
Last Updated: April 23, 2025

All Squarespace sites can have a blog. These blogs have a main list page that displays a list of post content. 

In version 7.1, these list pages can have page sections above and below the list of blog posts. 

The individual blog posts are classic editor pages that do not have individual sessions, but they do have content blocks.

---

## ⭐ Blog Paywall Selectors

| Excerpt Text | .blog-item-paywall-excerpt |
| --- | --- |
| Paywall Background | .blog-item-content-paywall-background |
| Paywall Notice | .blog-item-content-paywall-notice |
| Sign Up Text | .blog-item-content-paywall-notice-text |
| Join Button | .blog-item-content-paywall-notice-link.sqs-button-element--primary  |
| Lock Icon | .blog-item-content-paywall-notice **svg** |

## ⭐️ Blog **Post** Paywall Snippets

*These codes are for the automatic paywall shown on a blog post URL, not the digital product paywall shown on the overview page or when Join Now is clicked on the blog post paywall.*

- Hide lock icon
    
    ```css
    .blog-item-content-paywall-notice svg{
    display:none
    }
    ```
    
- Change lock icon color
    
    ```css
    .blog-item-content-paywall-notice svg{
    color: red
    }
    ```
    
- Change the paywall text to your own
    
    ```css
    .blog-item-content-paywall-notice-text {
    font-size:0!important
    }
    .blog-item-content-paywall-notice-text:after {
    font-size:1.5rem!important;
    content:"Change this to your own text"
    }
    ```
    
- Change the Join Now button text
    
    Pro tip: adjust the padding to make this look more like the original button
    
    ```css
    .blog-item-content-paywall-notice-link.sqs-button-element--primary {
      font-size:0!important
    }
    .blog-item-content-paywall-notice-link:after {
    font-size:.8rem!important;
    content:"Change this to your own text";
    padding: 1rem
    }
    ```
    

---

## Version 7.1 Blog List

| Alternating Side by Side | .blog-alternating-side-by-side |
| --- | --- |
| Basic Grid | .blog-basic-grid |
| Basic Grid: individual blog item | .blog-basic-grid .blog-basic-grid--container |
| Masonry | .blog-masonry |
| Side by Side | .blog-side-by-side |
| Single Column | .blog-single-column |
| Blog Grid Text | .blog-basic-grid--text |
| Post Title | .blog-title |
| Post Date | .blog-date |
| Excerpt | .blog-excerpt |
| Read More Link | .blog-more-link |
| Read More Link Underline | .blog-more-link::after |
| All Meta Data | .blog-meta-section |
| Meta Data - Primary Only | .blog-meta-primary |
| Meta Data - Secondary Only | .blog-meta-secondary |
| Categories | .blog-categories-list |
| Author Bio - Name | .blog-author |
| Blog Thumbnail Container | .image-wrapper |
| Blog Thumbnail Image | .image-wrapper img |
| Pagination: blog list page | .blog-list-pagination |
| Pagination: blog list page - older | .blog-list-pagination .older |
| Pagination: blog list page - newer | .blog-list-pagination .newer |

<aside>
💡 **PRO TIP** 
This **read** **more** underline selector is actually a background color! Make it bigger by changing the height, change the color with background, or set it to **display:none** to get rid of it.

</aside>

## Blog List Style Snippets

- Remove read more underline
    
    ```css
    .blog-more-link:after{display:none}
    ```
    
- Turn read more link into a button
    
    ```css
    .blog-more-link {border: 1px solid #000; padding: .5rem!important; margin-top:.5rem}
    ```
    
- Add a hover effect to the read more link
    
    ```css
    .blog-more-link:hover{color:#fff; background:#000}
    ```
    
- Replace read more text with your own
    
    ```css
    .blog-more-link {font-size:0rem!important}
    .blog-more-link:after{display:none}
    .blog-more-link:before{content:"check it out"; font-size: 1rem}
    ```
    
- Two column grid layout on mobile
    
    ```css
    @media only screen and (max-width:767px){.blog-basic-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr))!important;
        grid-column-gap: 5px!important;
        grid-row-gap: 5px!important;
        grid-auto-rows: min-content!important;
    }}
    ```
    
- Replace pagination text on blog list
    
    This code sets the font to 0 and then adds text to replace it. Adjust the font size and line height as needed
    
    ```css
    .next-label, .prev-label{
        font-size:0
    }
    .next-label:after{
        font-size:1.25rem;
        content:"Explore More Tutorials";
        line-height:2.2rem
        }
    .prev-label:after{
        font-size:1.25rem;
        content:"See Previous List";
        line-height:2.2rem
        }
    ```
    

## Version 7.1 Individual Blog Post

| Blog Post Page | article |
| --- | --- |
| Blog Post Container | .blog-item-inner-wrapper |
| Post Title | .entry-title |
| Post Date | .blog-meta-item--date span |
| Post Content | .blog-item-content |
| All Meta Data | .blog-meta-item |
| Written By Text | .blog-meta-item--author |
| Author Name | .blog-meta-item--author a |
| Categories | .blog-meta-item--categories |
| Tags | .blog-meta-item--tags |
| Author Bio | .blog-item-author-profile-wrapper |
| Author Bio - Image | *.author-avatar-image* |
| Author Bio - Name | .author-name |
| Author Bio - Details | .author-bio |
| Author Bio - Website | .author-website |
| Pagination | .item-pagination[data-collection-type^="blog"] |
| Pagination: prev link | .item-pagination-link--prev |
| Pagination: next link | .item-pagination-link--next |
| Pagination Titles | .item-pagination-title |
| Pagination Arrows | .item-pagination[data-collection-type^="blog"] .item-pagination-icon svg |
| Comment section | .comments-content |
| Comments: header | .comments-content .header-controls |

<aside>
💡 **PRO TIP** 
Did you see the difference between the written by text and the author name? They are both on the same line, but the author name is an active link and the written by text is not, so we can use the **a** for active links to separate the two in your custom code!

</aside>

<aside>
💡 **PRO TIP**
Both categories and tags are active links. The codes above are great for targeting the background or moving them around the page, but to change something about the font style specifically, add the letter a, like this example that will change the tags to purple: 
**.blog-meta-item--tags a{color:purple!important}**

</aside>

<aside>
💡 **PRO TIP**
The blog post page pagination symbol is an SVG icon and not a character. To change its color, use the property stroke. 
For example: 
**.item-pagination[data-collection-type^="blog"] .item-pagination-icon svg {background:green; stroke:purple}**

</aside>

## Snippets

- Stack pagination on mobile screens
    
    ```css
    @media only screen and(max-width: 640px){
    .item-pagination--prev-next {
    flex-direction: column!important;
    }
    .item-pagination-link{
    max-width:100%;
    margin-bottom: 40px
    }
      .item-pagination-link--next{
        margin-bottom:0px!important
      }
      }
    ```
    
- Add a background color to pagination
    
    ```jsx
    .item-pagination[data-collection-type^="blog"]{
    background: #a1d9dd
    }
    ```
    
- Add a background image to pagination
    
    ```jsx
     .item-pagination[data-collection-type^="blog"]{
     background-imge: url(image-url-here);
     background-size: cover!important
     }
    ```
    

## Blog Elements: Brine

| Individual Post Page - Title | .BlogItem-title |
| --- | --- |
| Individual Post Page - Author | .Blog-meta-item--author |
| Individual Post Page - Date | .Blog-meta-item--date |
| Individual Post Page - Share buttons | .Share-buttons-item-icon |
| Individual Post Page - Like button | .sqs-simple-like |
| Individual Post Page - Previous/Next article | .BlogItem-pagination-link-label |
| Individual Post Page - Previous/next title | .BlogItem-pagination-link-title |
| Blog List Summary - Thumbnail image | .BlogList-item-image |
| Blog List Summary - Title | .BlogItem-title |
| Blog List Summary - Author name | .Blog-meta-item--author |
| Blog List Summary - Date | .Blog-meta-item--date |
| Blog List Summary - Excerpt | .BlogList-item-excerpt |
| Blog List Summary - Read More | .BlogList-item-readmore |

## Blog Elements: Bedford

| Individual Post Page - Title | .entry-title |
| --- | --- |
| Individual Post Page - Author | .entry-author |
| Individual Post Page - Date | .entry-dateline |
| Individual Post Page - Share buttons | .squarespace-social-buttons.inline-style |
| Individual Post Page - Like button | .sqs-simple-like |
| Individual Post Page - Previous/Next  | .pagination |
| Blog List Summary - Thumbnail image | .sqs-block-summary-v2 .img-wrapper img |
| Blog List Summary - Title | .entry-title |
| Blog List Summary - Author name | .entry-author |
| Blog List Summary - Date | .summary-metadata-item--date |
| Blog List Summary - Excerpt | .summary-metadata-item--author |
| Blog List Summary - Read More | .summary-read-more-link |

## Blog Elements: Pacific

| Individual Post Page - Title | .entry-title |
| --- | --- |
| Individual Post Page - Author | .entry-author |
| Individual Post Page - Date | .entry-dateline |
| Individual Post Page - Share buttons | .ss-social-button |
| Individual Post Page - Like button | .sqs-simple-like |
| Individual Post Page - Previous/Next | .pagination |
| Blog List Summary - Thumbnail image | .sqs-block-summary-v2 .img-wrapper img |
| Blog List Summary - Title | .entry-title |
| Blog List Summary - Author name | .entry-author |
| Blog List Summary - Date | .summary-metadata-item--date |
| Blog List Summary - Excerpt | .summary-metadata-item--author |
| Blog List Summary - Read More | .summary-read-more-link |

## Blog Elements: York

| Individual Post Title | .BlogItem-title |
| --- | --- |
| Individual Post - Author | .Blog-meta-item--author |
| Individual Post - Date | .Blog-meta-item--date |
| Individual Post - Share buttons | .Share-buttons-item--social |
| Individual Post - Like button | .Share-buttons-item--like |
| Individual Post - Previous/Next link | .BlogItem-pagination-link |
| Individual Post - Previous/Next title | .BlogItem-pagination-link-title |
| Blog List Summary - Thumbnail  | .sqs-block-summary-v2 .img-wrapper img |
| Blog List Summary - Title | .summary-title |
| Blog List Summary - Author name | .summary-author |
| Blog List Summary - Date | .summary-metadata-item--date |
| Blog List Summary - Excerpt | .summary-metadata-item--author |

## Blog Elements: Five

| Individual Post - Title | .entry-title |
| --- | --- |
| Individual Post - Author | .entry-title * |
| Individual Post - Date | .article-dateline .date * |
| Individual Post - Share buttons | .ss-social-button |
| Individual Post - Like button | .sqs-simple-like |
| Individual Post - Previous/Next | .pagination ul li a |
| Blog List Summary - Thumbnail | .sqs-block-summary-v2 .img-wrapper img |
| Blog List Summary - Title | .sqs-block-summary-v2 .summary-title |
| Blog List Summary - Author  | .summary-metadata-item--author |
| Blog List Summary - Date | .summary-metadata-item--date |
| Blog List Summary - Excerpt | .summary-metadata-item--date |
| Blog List Summary - Read More | .summary-read-more-link |

Social share plugin

```css
<div class="custom-share-buttons">
  <a id="share-bluesky" target="_blank">Share on Bluesky</a>
  <a id="share-threads" target="_blank">Share on Threads</a>
  <a id="share-linkedin" target="_blank">Share on LinkedIn</a>
</div>

<style>
  .custom-share-buttons {
    display: flex;
    gap: 10px;
    margin: 20px 0;
  }

  .custom-share-buttons a {
    padding: 10px 15px;
    background: #e5f5f6;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    color: #333;
    transition: background 0.3s ease;
  }

  .custom-share-buttons a:hover {
    background: #ccc;
  }
</style>

<script>
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  document.getElementById("share-bluesky").href = `https://bsky.app/intent/compose?text=${pageTitle}%20${pageUrl}`;
  document.getElementById("share-threads").href = `https://www.threads.net/intent/post?text=${pageTitle}%20${pageUrl}`;
  document.getElementById("share-linkedin").href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
</script>

```
