# Image Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About (Image Block)

You can use a **Squarespace image block** to display an image on a page in your website.

This image can be a JPG, PNG, or even a GIF.

SVG’s are not supported at this time.

Image blocks are used to display individual images on standard pages.

**Image blocks have two display options: fill and fit.**

Use the **fill** option to make it fill the entire block area. This creates a clean, modern look.

use the **fit** option to make sure your entire image is visible. it will stretch to fit the edges of the content block and not crop any aspect of the image to maintain the original ration.

You can also select a **shape** to have Squarespace automatically crop the image for you.

**Important info to know about image blocks:**

Every image has a **focal** **point** that you can move. This focal point will control where the image is centered int eh content block on any screen size. If you choose to use the fill option for your image block, double check the mobile view of your site to make sure your image looks great.

For the best quality, try uploading images between 1500 and 2500 pixels wide.

**What you can customize about the image block using Squarespace**

The **design** tab of an image block editing menu has some creative options you can use to change the style of the content displayed.

- **Fit, Fill, or Shape:** This setting determines how your image interacts with the block's dimensions. "Fit" ensures the entire image is visible within the block, potentially leaving some space around it. "Fill" expands the image to fill the entire block, potentially cropping the edges if necessary. "Shape" lets you choose a specific shape (like a circle or square) for your image to be displayed within.
- **Corner Radius (Fill Only):** If you've chosen "Fill" for the image, this setting allows you to adjust the roundness of the corners. A higher corner radius creates a softer, more curved look, while a lower corner radius keeps the corners sharp.
- **Image Effect:** Here you can add a special effect to your image, like grayscale, sepia tone, or a black and white filter. This can be a great way to add a unique touch or match the overall style of your website.
- **Overlay:** This option lets you add a colored or patterned transparent layer on top of your image. Overlays can be used to create subtle effects, darken or lighten the image, or simply add a decorative touch.
- **Lightbox Feature:** Enabling the lightbox feature creates a pop-up window when visitors click on the image. This allows them to view a larger version of the image without leaving the current page. It's a great option for showcasing high-quality photos or detailed images.

## About (Image Block Classic Editor)

You can use a classic **Squarespace image block** to display an image on a page in your website.

Classic editor image blocks are found on blog posts, individual events, and additional product details. These image blocks have unique display settings that allow you to create a custom design using additional text, backgrounds, and even buttons!

You can upload a JPG, PNG, or a GIF file format to a classic image block.  SVG files are not supported.

Below you’ll find an example of the 6 layout options we have for Squarespace classic image blocks.

**What you can customize about the classic image block using your Squarespace design menu**

- **Layout:** This lets you choose how your image appears within the block. "Inline" displays the image alongside text, with options for caption placement. "Poster" creates a banner-like effect with text overlaid on the image.
- **Aspect Ratio (Optional):** For some image block layouts, you can set a specific aspect ratio to constrain the image's proportions. This helps ensure your images display consistently within the block's design.
- **Caption:** Add a caption below or on top of your image to provide context or additional information for visitors. You can also choose how the caption text is displayed.
- **Link to File:** This option lets you create a clickable link on the image itself, directing visitors to the original image file or another relevant webpage.
- **Resize Image (Inline and Poster Layouts):** By dragging the cropping handle, you can adjust the height of your image to fit the block's design while maintaining the aspect ratio (if set) and avoiding distortion.

## Fluid Engine Image Selectors

| Entire image block | .sqs-block-image |
| --- | --- |
| Fluid engine page sections have one main selector for images | .fluid-image-container |
| If you have an image set to design fit, you can use the selector | .fluid-image-container .content-fit |
| If you have an image set to design fill, you can use the selector | .fluid-image-container .content-fill |

## Lightbox Enabled Image

These sectors are for a standard image block with the lightbox enabled and don’t apply to gallery section lightboxes or other overlay features.

| Entire lightbox - open | .sqs-lightbox-slideshow |
| --- | --- |
| Lightbox close button | .sqs-lightbox-close |
| Close button icon | .sqs-lightbox-close:before |
| Lightbox image | .sqs-lightbox-slideshow img |

<aside>
❎ Pro tip: The close icon is a character. Change its color with the color property, and use the content property to change the character

</aside>

## Classic Image Block Selectors

| Inline Image | .design-layout-inline img |
| --- | --- |
| Inline Image Caption Background | .design-layout-inline .image-caption |
| Inline Image Caption Text | .design-layout-inline .image-caption * |
| Collage Image | .design-layout-collage img |
| Collage Title | .design-layout-collage .image-title * |
| Collage Subtitle | .design-layout-collage .image-subtitle * |
| Collage Button | .design-layout-collage .image-button |
| Collage Background | .design-layout-collage .image-card |
| Collage Image Overlay | .design-layout-collage .image-overlay |
| Card Image | .design-layout-card img |
| Card Title | .design-layout-card .image-title * |
| Card Subtitle | .design-layout-card .image-subtitle * |
| Card Button | .design-layout-card .image-button |
| Card Image Overlay | .design-layout-card .image-overlay |
| Poster Image | .design-layout-poster img |
| Poster Image Title | .design-layout-poster .image-title * |
| Poster Image Subtitle | .design-layout-poster .image-subtitle * |
| Poster Image Button | .design-layout-poster .image-button |
| Poster Image Overlay | .design-layout-poster .image-overlay |
| Overlap Image | .design-layout-overlap img |
| Overlap Title | .design-layout-overlap .image-title * |
| Overlap Subtitle | .design-layout-overlap .image-subtitle * |
| Overlap Button | .design-layout-overlap .image-button |
| Overlap Image Overlay | .design-layout-overlap .image-overlay |
| Stack Image | .design-layout-stack img |
| Stack Title | .design-layout-stack .image-title * |
| Stack Subtitle | .design-layout-stack .image-subtitle * |
| Stack Button | .design-layout-stack .image-button |
| Stack Image Overlay | .design-layout-stack .image-overlay |

## Pro Tips for Image Blocks

**Overlay Opacity**
Image overlays have a set **opacity** to make them slightly transparent. To change the color of an overlay, change the background color and adjust the opacity until it’s the level of transparency you want to see. 

Here is an example code for card images:

```css
.design-layout-card .image-overlay {background-color:green; opacity:.8!important}
```

**Customize Button Text**
To change the font or text style of a button link, add the letter a at the end of the code. 

This example here will change the text of a poster image button to yellow:

```css
.design-layout-poster .image-button a {color: yellow!important}
```

## Image Filters

These filters can be applied to any image type on your Squarespace site.

| **Filter Name** | **How it Works** | **Example** |
| --- | --- | --- |
| Grayscale | 0% is no filter and 100% is full black and white. | {filter: grayscale(100%)} |
| Blur | 0 is no blur and 100 is pretty darn fuzzy. | {filter: blur(5px)} |
| Brightness | 0% is dark, 100% is normal, and anything above 100% will increase the brightness. | {filter:brightness(150%)} |
| Opacity (Transparency) | Technically not a filter, but a good code to know for images! 0 is totally transparent, and 1 is solid. | {opacity: .5} |
| Contrast | 0% is low contrast, 100% is normal, and anything over 100% will increase the contrast. | {filter: contrast(150%)} |
| Invert | 0% is normal, 100% will invert the colors in your image. | {filter: invert(100%)} |
| Rotating Hue | Adjust the hue using degrees on the color wheel; 0deg is normal and 180deg is rotated to the opposite colors on the color wheel. | {filter: hue-rotate(180deg)} |
| Drop Shadow | This code is different from a box-shadow because it will conform to round edges and transparent png images. The values in this code read as follows: horizontal, vertical, blur, and color. | {filter: drop-shadow(2px 2px 5px #555)} |

## Snippets

- How to add a filter to an image block on a hover
    
    You can use any filter codes from the previous page to create a hover effect for image blocks. This example will change the look of a poster image to grayscale on a hover.
    
    ```css
    .design-layout-poster:hover img { filter: grayscale(100%) }
    ```
    
- How to create a frosted glass effect for poster images
    
    This code will change the color and blur of a poster image behind the text. Be sure to edit the code to suit your own site style, trying different margins, colors, height and width values, and blur values. For more information on this code, check out [this tutorial video.](https://insidethesquare.co/squarespace-tutorials/frosted-glass-poster)
    
    ```css
    .design-layout-poster .image-card-wrapper {
     background: inherit; 
     background-color: rgba(255, 255, 255, .3); 
     backdrop-filter: blur(5px); 
     height: 80%; width: 80%; 
     margin: auto!important; 
    }
    ```
    
- How to reveal poster image text on a hover
    
    This code will hide the text shown over a poster image until someone hovers over it with their cursor. Please note that hover effects won’t work on mobile because mobile devices don’t have cursors.
    
    ```css
    @media only screen and (min-width:640px){ 
     .design-layout-poster .image-card-wrapper {
     opacity:0!important; 
     transition: 1s 
    }
     .design-layout-poster:hover .image-card-wrapper {
     opacity:1!important; 
     transition: 1s
    }
    }
    ```
