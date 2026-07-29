# Embed Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

You can use a **Squarespace embed block** to embed external media into your website using code.

Embed blocks are super easy to use for most videos and social media posts directly to a page in your Squarespace website.

All you need to do is paste the link and let Squarespace will do the rest!

You can also paste custom embed codes directly from a third party program, like Vimeo or Google drive. These codes will have their own settings that can alter the way content is displayed.

**What you can customize about the embed block using Squarespace**

You can use a **featured** **image** that will display over the embedded content until the site visitor interacts with it. You can also add **description** text that will be displayed underneath the embedded content.

The content customization is limited for an embed block as most code snippets contain style formatting.

## Selectors

| Embed Block | .embed-block |
| --- | --- |
| Embed Description Area | .embed-block .video-caption-wrapper |
| Embed Description Text | .embed-block * |

## Snippets

- Add a border & box shadow to the embed block
    
    ```css
    .embed-block {
     border: 3px solid #000;
     box-shadow: 5px 5px 15px rgba(0,0,0,0.3)!important
    }
    ```
    
- Curve the corners of the embed block
    
    ```css
    .embed-block {
     border-radius: 35px!important
    }
    ```
    
- Center the embed block description text
    
    ```css
    .embed-block * {
    text-align: center;
    margin:auto
    }
    ```
