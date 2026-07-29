# Scrolling Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

You can create an animated text marquee that will scroll across the screen using the **Squarespace scrolling block.**

Scrolling blocks are like tiny marquees that let your message scroll across the page.

Similar to a news ticker, you can use them to grab attention for important announcements, cool slogans, or anything else you want visitors to see right away.

Scrolling blocks can only feature text, not images, but you can add unicode characters or even throw in some emojis for extra pizzazz!

## Selectors

| Scrolling Marquee Block | .sqs-block-marquee |
| --- | --- |
| Scrolling Marquee Background | .sqs-background-enabled  |
| Scrolling Marquee Text | .Marquee * |

## Snippets

To create a **full-width scrolling marquee** using the **classic editor**, you’ll need to place your scrolling Marquee in its own page section so we can remove the padding and margin that would prevent it from reaching the side of the screen.

You can **add a page section** above and below it with the same color theme if you want to feature more content that LOOKS like it’s in the same section, without actually being changed by this code!

To change the **specific page section** that the marquee block is in, you’ll need to update the code below, replacing the Squarespace data section ID at the beginning of the code with your own unique ID from your Squarespace site.

```css
[data-section-id="1234567890"] .content-wrapper{
 padding-left: 0!important;
 padding-right: 0!important;
 margin: 0!important
}

.Marquee {
 width:100vw!important
}

#page{
 overflow-x: hidden
}
```
