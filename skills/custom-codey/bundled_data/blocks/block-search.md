# Search Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

You can add a search content block for your entire site, or specify a specific collection. Your display options are light and dark, but both respond to the selectors below. The search results page built into every Squarespace site can be customized with CSS too! 

Check out the **global elements** section for more information on customizing the look of that page of your site.

## Selectors

| Search block | .search-input  |
| --- | --- |
| Search preview (if enabled) | .sqs-search-preview-ui |

## Snippets

- Change the Search Block Border Color
    
    ```css
    .search-input {border-color: blue}
    ```
    
- Change the Search Block Input Area Color
    
    ```css
    .search-input {background-color: purple}
    ```
    
- Change the Search Block Input Text Color
    
    ```css
    .search-input {color: purple}
    ```
    
- Hide the outline that shows up when your typing in the search bar
    
    ```css
    .search-input:focus{outline:none!important}
    ```
