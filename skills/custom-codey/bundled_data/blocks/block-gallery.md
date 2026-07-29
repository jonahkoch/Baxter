# Gallery Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

<aside>
💡 **Gallery blocks are not the same as gallery sections.**

</aside>

Gallery blocks are added as a content block to a page section, blog post, event listing, or additional product details. There are four main gallery block styles that you can target with CSS. To change the design style of your gallery, double click on the galley block and select the design tab.

<aside>
💡 **PRO TIP**
Slideshow gallery thumbnails and the carousel slideshow both respond to the same selector. To isolate one at a time, use its block id.

</aside>

## Selectors

| Entire Block | .gallery-block |
| --- | --- |
| Slideshow | .sqs-gallery-block-slideshow |
| Slideshow - Main Image | .sqs-gallery-design-stacked-slide img |
| Slideshow - Thumbnails | .sqs-gallery-design-strip-slide |
| Slideshow - Text area | .sqs-gallery-block-slideshow.sqs-gallery-block-show-meta .sqs-active-slide .meta |
| Slideshow - Title | .sqs-gallery-block-slideshow .meta .meta-title |
| Slideshow - Description | .sqs-gallery-block-slideshow .meta .meta-description |
| Slideshow - Arrows | .sqs-gallery-controls |
| Slideshow - Left Arrow | .sqs-gallery-controls .previous |
| Slideshow - Right Arrow | .sqs-gallery-controls .next |
| Carousel Gallery | .sqs-gallery-design-strip |
| Carousel - Images | .sqs-gallery-design-strip-slide |
| Carousel - Arrows | .sqs-gallery-controls |
| Carousel - Left Arrow | .sqs-gallery-controls .previous |
| Carousel - Right Arrow | .sqs-gallery-controls .next |
| Grid Gallery | .sqs-gallery-block-grid |
| Grid Images | .sqs-gallery-block-grid .slide img |
| Stack Gallery | .sqs-gallery-block-stacked  |
| Stack Image | .sqs-gallery-block-stacked .image-wrapper img |
| Stack Image Title | .sqs-gallery-block-stacked .meta-title |
| Stack Image Description | .sqs-gallery-block-stacked .meta-description |
