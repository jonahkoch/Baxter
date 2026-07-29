# Fluid Engine Page Sections

Type: Page Sections
Compatible Versions: 7.1
Last Updated: April 23, 2025

In Squarespace Version 7.1, you can have three types of page sections; fluid engine sections, gallery sections, and list sections. 

The content of fluid engine page sections are content blocks that have their own selectors. 

The page section itself is made up of three layers: the section, the section background, and the content wrapper. 

These selectors and snippets can help you customize all aspects of a standard section for both classic and fluid sections.

## Selectors

| Page Section | .page-section |
| --- | --- |
| Inset Page Section | .page-section.background-width--inset |
| Section Background | .section-background |
| Content Wrapper | .content-wrapper |

## Snippets

## Add a Border to the Bottom of All Page Sections

```css
.page-section {border-bottom: 1px solid #000}
```

## Create a Scroll Overlay for All Page Sections

```css
#page .page-section {
 position: sticky!important; 
 top: 0px!important
} 
html {
 scroll-behavior: smooth
}
```

## Split Page Section - Classic Editor

This code will create a split page layout for a page section in Squarespace, showing the section background image on half of the screen, with the content on the other half.

I designed this code to reset on mobile, putting the content back over the image, to help you keep your site easy to use on small devices. Be sure to adust the margin percentage so it looks perfect on your own site.

### Image on the left

```css
@media only screen and (min-width: 640px){
 [data section id] .section-background {
 width: 50%
}
[data section id] .content-wrapper {
 width: 50%;
 margin-left: 50%!important;
}
}
```

### Image on the Right

```css
@media only screen and (min-width: 640px){
 [data section id] .section-background {
 width: 50%;
 margin-left: 50%!important;
}
[data section id] .content-wrapper {
 width: 50%;
 margin-left: 0%!important;
}
}
```
