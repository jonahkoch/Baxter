# Donation Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

A **Squarespace donation block** make it easy to accept contributions for your cause or event directly from your website.

With just a few clicks, you can add a donation button to your Squarespace website and start collecting funds. Donation blocks are also perfect for creating a unique cash gift registry for weddings or special occasions!

**Important things to know:**

Donation blocks are a premium feature available on specific Squarespace plans.

You'll need to connect a payment processor to your site to accept donations.

There are **transaction fees** associated with donations.

Donations don't follow the same tax rules as regular store purchases.

Donators will be asked for their email and phone number during checkout.

**What you can customize about the donation block using Squarespace**

You can add a background and border (stroke) to an individual donation block, and adjust the alignment of the content, using the **design** tab.

Your Squarespace donation block style is based on the **form** style you have created using your **site** **style** settings.

At this time, there is no way to adjust the donation block without adjusting your site wide contact form settings without custom code.

You can also customize the donation block with your own code! This tutorial will teach you how: [tutorials.squarespace.com/code/donation](https://tutorials.squarespace.com/code/donation)

## Selectors

| donation block (container) | .sqs-donation-block-container |
| --- | --- |
| donation ammounts & descriptions | .sqs-donation-block-container .radio label |
| donation amount only | .sqs-donation-block-container .radio-label:first-line |
| donation dropdown | .sqs-donation-block-container .dropdownSelect  |
| donation button | .sqs-donation-block-container .button |

## Snippets

- Change size of donation value
    
    ```css
    .sqs-block[data-definition-name="website.components.donation"] .radio-label:first-line{
    font-size:2rem
    }
    ```
    
- Left align donation value with description text
    
    ```css
    .sqs-block[data-definition-name="website.components.donation"] .radio label{
    text-align:left!important;
    }
    ```
