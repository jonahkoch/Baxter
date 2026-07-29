# Quote Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

You can display noteworthy content in a unique way using a **Squarespace quote block.**

A wall of text can be overwhelming to any reader, especially online.

Using a Squarespace quote block can help highlight important information in a creative way that’s visually appealing.

Quote blocks display two distinctive pieces of text content: a quote and a quote source.

**How to customize a Squarespace quote block with code**

When the options in a Squarespace design menu seem limiting, you can use simple CSS to make your website unique. This tutorial will teach you how to customize a quote block colors and fonts using code, step by super simple step:

[insidethesquare.co/squarespace-tutorials/quote](https://insidethesquare.co/squarespace-tutorials/quote)

## Selectors

| Quote block | .sqs-block-quote |
| --- | --- |
| Quote text | .sqs-block-quote blockquote |
| Quote source | .sqs-block-quote .source |
| Quote dash | .sqs-block-quote ****.source:first-letter |

## Snippets

| Change the background of the entire block | .sqs-block-quote{background: #**FFF**} |
| --- | --- |
| Change the font family of the quote block | .sqs-block-quote blockquote {font-family: **serif**} |
| Change the font family of the quote source | .sqs-block-quote .source {font-family: **serif**} |
| Add a border to the quote block | .sqs-block-quote {**border: 3px solid #000**} |
| Hide the dash before the quote source | .sqs-block-quote ****.source:**first-letter** {font-size:0} |
| Center quote source text | .sqs-block-quote .source {text-align:center!important} |

## Pre-made Quote Styles

---

![Quote 1.png](Quote%20Block/Quote_1.png)

```css
.sqs-block-quote .source {
 text-transform:uppercase; 
 letter-spacing: .2rem; 
 border-top: 1px solid #000; 
 margin-top: 1rem; 
 padding-top: 1rem
} 
.sqs-block-quote .source:first-letter {
 font-size:0
} 
blockquote span{
 display:none!important
}
```

---

![Quote 2.png](Quote%20Block/Quote_2.png)

```css
.sqs-block-quote {
 border-left: 5px solid #000
}
.sqs-block-quote .source {
 text-align:left!important; 
 margin-top: 2rem; 
 font-style: italic
} 
.sqs-block-quote .source:first-letter {
 font-size:0
}
```

---
