# Content Link

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

<aside>
💡 **PRO TIP**
Version 7.1 content link blocks won't always display a page preview or description, but they will display a page title.

</aside>

## About

You can use **Squarespace content link blocks** to add a clickable title for any specific page on your site.

**Important info to know about content link blocks:**

If you're using Squarespace version 7.1, content link blocks only show the page title.

**There is a difference between content link blocks and regular text links:** Text links are simple and great for quick references within your text. Content link blocks can take up more space, but they can have a unique text style, unlike a text link.

**What you can customize about the content link block using Squarespace**

The content link block can have a unique font style applied to it which is the main reason for using this link format instead of a text based link!

Follow these steps to change the **font** **style** for your content link block:

1. Click on the paintbrush icon on the top right hand corner of your screen to open your **Site** **Style** menu. You can also select the word *style* under the word *website* in your left sidebar menu.
2. Select the **Font** option.
3. Click on **Assign** **Styles**, the last option in your font menu
4. Scroll down until you see the **content** **link** option and click on the word **title** underneath that label.
5. For the style option, select **custom**.
6. Use the options below to assign a new font family, weight, style, size and any other option you want. This will only apply to your **custom** **link** **block** text and wont change anything else on your Squarespace site.

## Selectors

| Content Link Block | .sqs-block-collectionlink |
| --- | --- |
| Page Preview Image | .collectionlink-thumbnail |
| Content Link Text | .collectionlink-content-below-thumbnail |
| Content Link - Title Only | .collectionlink-title  |
| Content Link - Description Only | .collectionlink-description |

## Snippets

- Preview Image Grayscale on Hover
    
    ```css
    .sqs-block-collectionlink:hover .collectionlink-thumbnail{
     filter: grayscale(1)!important
    }
    ```
