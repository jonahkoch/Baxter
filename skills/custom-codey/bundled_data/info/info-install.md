Last Updated: April 23, 2025
# Installing CSS in Squarespace

There are four different ways to install CSS on your Squarespace website, and some of them are better for specific projects than others. 

## Option One: Site-wide installation

When you add custom CSS here, it will be added to the end of the CSS file that Squarespace makes based on your design menu settings. 

It’s perfect for site-wide changes like adding a font or making a button hover effect. To add code here, navigate to **Pages (under Website),** scroll down to **Custom Code** and then click on **Custom CSS.**

## Option Two: Individual page installation

If you want to make a style change to an individual page on your site, then the best place to do that is inside the page header code injection for that page. This will make sure that your code only loads on that specific page and it loads in the header of your site, which means the browser will read your changes before the rest of the content loads, so it knows what to do. 

This is a great place to add custom codes for things like creating a landing page where you want to hide the header and footer of your site. There is one super important thing to know about using page header code injection - you can have more than CSS there! 

Unlike the first option that uses your CSS file, you can have different types of code in the page header, so we have to tell the browser that we are using a style code. You can do this by labeling it with HTML. Place your CSS code between two style brackets, like this example here:

```css
<style> .css-selector {property: value} </style>
```

![single+page+css+2.gif](Installing%20CSS%20in%20Squarespace/singlepagecss2.gif)

## Option Three: Code block installation

Our third option is a code block. I don’t recommend using this for individual page changes unless you have to because a code block will load with everything else on your site, so it might take a second or two before you see the style change, which can make your site look a little messy at first. 

But if you are on a personal subscription plan and need to customize an individual page, or you want to customize an individual collection item like a blog post, this is the only option. Just like the page header code injection, code blocks can have multiple types of code, so you’ll need to use style brackets like this: 

```css
<style> .css-selector {property: value} </style>
```

![code+block.gif](Installing%20CSS%20in%20Squarespace/codeblock.gif)

## Option Four: Header code injection

I RARELY use this option when creating custom CSS, but I have to add it to the list because it’s an option 😅 You can install CSS in the site wide header using the code injection found under your site settings menu. 

Click on **Settings** then on **Advanced** and here you can paste custom CSS into the header of your entire site. Just like page header code injection and a code block, you need to let the browser know it’s a style code by placing it between two style brackets like this:

```css
<style> .css-selector {property: value} </style>
```

## Which way is the best way to install CSS in Squarespace?

Out of all four options, I prefer site-wide CSS for changes that will affect every page, page header code injection for individual pages, and code blocks for changes that I want to make to an individual collection item like a blog post.

The most important thing to know is that you should only use CSS to change what you can’t edit with the site style settings in your design menu.
