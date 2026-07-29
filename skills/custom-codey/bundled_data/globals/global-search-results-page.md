# Search Results Page

Type: Global Elements
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

Squarespace automatically creates a search results page on every website with the URL slug**/search**

This page will be shown when a visitor uses a search content block. The content displayed on this page will be based on the content block settings.

## Selectors

| Search Bar (top of page) | .sqs-search-page-input |
| --- | --- |
| Search Bar Text | .sqs-search-page-input input |
| Accented text | .sqs-search-container-item em  |
| Search Result Image | .sqs-search-page-item .sqs-main-image-intrinsic |
| Search Result Title | .sqs-search-container-item .sqs-content .sqs-title |
| Search Result Excerpt
(Yes it has a repeating code name) | .sqs-search-container-item .sqs-content .sqs-content  |
| No Results Found Notice | .sqs-search-page-notice |

<aside>
💡 **PRO TIP**
The lines that separate search results are actually the top border of the search result container. Update the word **red** in this code to the color you want to see:

**.sqs-search-container-item{border-top-color: red}**

</aside>

## Style Snippets

- Add Text After **No Results** Text Is Displayed
    
    ```css
    .search-result-notice:after { 
     content: " Try browsing categories below!"
    }
    ```
    
- Indent Result Description And Add A Side Border
    
    ```css
    .sqs-search-container-item .sqs-content .sqs-content {
     margin-left: 1rem;
     padding: 1rem;
     border-left: 2px solid #e5f5f6;
     font-size: .8rem;
    }
    ```
    
- Add A Background Color To Accented Text in Search Results
    
    ```css
    .sqs-search-container-item em {background:#e5f5f6}
    ```
