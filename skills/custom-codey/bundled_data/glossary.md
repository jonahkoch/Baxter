# Custom Codey Glossary

Last Updated: 23 April 2026

This file teaches Custom Codey how to interpret what Squarespacers actually say. Users rarely use the exact terms that match selectors — they describe what they see. This glossary bridges that gap.

Codey uses this file BEFORE generating code, to decide whether to answer immediately, answer-with-an-assumption, or stop and ask a clarifying question.

---

## Tier 1: Synonyms (resolve silently)

Codey should silently interpret the phrase on the left as the concept on the right. No clarification needed — users call the same thing different names, and Codey just knows.

Format: `user phrase` → `canonical concept` (optional note)

### Header & Navigation
- `header button` → header_cta
- `header cta` → header_cta
- `main menu button` → header_cta
- `header call to action` → header_cta
- `top right button` → header_cta
- `nav button` → header_cta
- `top nav` → header_navigation
- `main menu` → header_navigation (but see Tier 3 — could also mean mobile_menu)
- `main navigation` → header_navigation
- `nav links` → header_navigation_links

### Logo
- `logo` → site_title (could be image or text)
- `site logo` → site_title
- `brand` → site_title

### Mobile Menu
- `hamburger menu` → mobile_menu
- `hamburger icon` → mobile_menu_icon
- `burger menu` → mobile_menu
- `burger` → mobile_menu_icon
- `menu icon` → mobile_menu_icon (on mobile)

### Blog
- `blog page` → blog_collection_page
- `blog` → [add context — is it the landing page or a single post?]
- `blog post` → individual_blog_post
- `article` → individual_blog_post

---

## Tier 2: Soft Assumptions (answer confidently, note the assumption)

When users say these phrases, Codey should pick the most likely meaning, answer right away, and briefly mention the assumption so the user can correct it if needed.

Format:
---

Phrase: `image` / `images` / `photo` / `picture`
Default: image_block
Also possible: summary_block_thumbnail, blog_post_thumbnail, gallery_section, product_image, banner_image
Codey's opening line: "Working on your image block — if it's actually a gallery, blog thumbnail, or product image, let me know and we'll swap approaches."

---

Phrase: `button`
Default: button_block
Also possible: header_cta, form_submit_button, newsletter_button, add_to_cart_button
Codey's opening line: "Styling your button block — if you meant the header CTA, a form submit button, or a cart button, shout and we'll adjust."

---

Phrase: `video`
Default: video_block
Also possible: video_background_section, video_collection_page
Codey's opening line: "Working on your video block — if it's a video background in a section or a video from your video collection, let me know."

---

Phrase: `menu`
Default: header_navigation (on desktop)
Also possible: mobile_menu, menu_block (restaurant menu feature), dropdown_folder
Codey's opening line: "Styling your main site navigation — if you meant the mobile hamburger menu or a restaurant-style menu block, let me know."

---

Phrase: `background`
Default: page_section_background
Also possible: full_site_background, block_background, image_overlay
Codey's opening line: "Updating your page section background — if you meant the site-wide background or a specific block's background, we'll pivot."

---

## Tier 3: Forced Clarifications (stop and ask before answering)

These are the dangerous ones. A wrong guess produces code that looks right but doesn't work, which erodes trust. Codey MUST pause and ask before generating any code.

---
Phrase trigger: `events` / `event block` / `events page`
Why this is dangerous: "Reservations Block" (formerly called Events Block) is a Tock booking widget on a content page. "Events" collection is a separate collection page type for event listings. Completely different selectors.
Question Codey should ask: "Quick check before I write the code — are you working on the Reservations block (the 'Book Now' button that connects to Tock), or your Events collection (the page that lists all your events)?"
Options to offer:
- Reservations Block (Tock booking button)
- Events collection page (event listings)
- Individual event page

---

Phrase trigger: `mobile menu` + detected v7 signals (words like "Brine", "Bedford", "Pacific", "York", "theme", "version 7", "7.0")
Why this is dangerous: v7 mobile menus use completely different selectors per theme. Guessing wrong = code does nothing.
Question Codey should ask: "Your mobile menu selectors depend on your theme. Which theme are you using — Brine, Bedford, Pacific, York, or a different one?"
Options to offer:
- Brine
- Bedford
- Pacific
- York
- Not sure / different theme

---

Phrase trigger: `section background` / `section background color` / `section background not showing`
Why this is dangerous: Fluid Engine sections have three layers (section, section-background, content-wrapper) and the section-border can cover the background. Classic Editor sections work differently. If Codey writes Fluid code for a Classic section, the code silently does nothing.
Question Codey should ask: "Is this a Fluid Engine section or a Classic Editor section? (Fluid is the newer grid-based editor with drag handles; Classic is the older layout with rows and columns.)"
Options to offer:
- Fluid Engine (newer grid editor)
- Classic Editor (rows and columns)
- Not sure

---

Phrase trigger: `cookie alert` + user mentions existing code not working, OR user is working with pre-July 2024 code
Why this is dangerous: Cookie Alert selectors changed between July 10–11, 2024. Old code still references old selectors that no longer work.
Question Codey should ask: "Quick heads up — Squarespace changed the cookie alert selectors in July 2024. Is this a fresh setup, or are you updating code you wrote before then?"
Options to offer:
- New setup (use current selectors)
- Updating pre-July 2024 code



# Squarespace Term Glossary: definitions of common terms

---

## ↪️ 301 Redirect

This is a permanent redirect; it notes that a page has completely moved to a new URL.

**Related Terms:** 302, URL, redirect

## ↪️ 302 Redirect

This is called a temporary redirect; it notes that a page is currently living at a new URL but will be back.

**Related Terms:** 301, URL, redirect

## ⚠️ 404 Page

A page that appears when a visitor tries to access a page on your site that doesn't exist, provides a friendly and helpful error message. There is an automatic one available in Squarespace, but you can also assign a custom one.


## #️⃣ 5, 7.0 & 7.1

When speaking about Squarespace, 7., and 7.1 are referring to the version of the program the website is built on. Version 7 consisted of separate themes that had unique structural features. Version 7.1 is the most current version of Squarespace.

**Related Terms:** template, theme, version


## 🛒 Abandoned Cart

When a visitor adds items to their cart but leaves without completing the purchase

**Related Terms:** ecommerce, cart, shopping cart

## 🪗 Accordion Block

Accordion blocks display a list of titles with additional descriptions that can be revealed on a click. There are options to change the line thickness, font style and more inside Squarespace design menus.

**Related Terms:** Content Block


## 📝 Alt Text

Alt text, short for alternative text, plays a vital role in web accessibility. It's a brief description attached to each image on a website. This description helps users understand the image's content in several situations. For instance, if the image fails to load due to internet issues, the alt text provides context. Additionally, screen readers, which are tools used by visually impaired individuals, rely on alt text to convert images into audible descriptions.  In essence, well-written alt text ensures everyone has a clear understanding of the visual content on a webpage.

**Related Terms:** SEO



## 📈 Analytics

The systematic computational analysis of data or statistics. This term is used to describe any and all data tracked about your website traffic, including but not limited to where visitors came from, what pages they visited, how long they stayed on those pages, and when they left.


## ⚓ Anchor text / Anchor Link

Anchor text refers to a word or set of terms that, when clicked on, will take you to a different location on the page or website.

**Related Terms:** Content link, URl slug


## 📣 Announcement Bar

A customizable bar at the top of your website used to highlight important messages or promotions.


## 🗂️ Archive Block

Archive blocks can help organize your collection page content, like blogs and products. You can create a clickable list of categories, tags, dates, or even blog post author.

**Related terms:** Content block, summary, collection list, collection item


## 🎵 Audio Block

Audio blocks let you add an MP3 or M4A file from your computer.

**Related Terms:** Content block


## 👋 Author Profiles

Showcasing individual author profiles on your blog posts, providing information about the writers and their expertise.

**Related Terms:** blog, blog post

## 📐 Auto layout

In Squarespace, an auto layout refers to a layout that organizes your content automatically, restructuring it for various screen sizes. Commonly used to refer to a list section, gallery section, or collection list.



## 🤖 Auto Pages

Auto-pages are pages on your website created automatically by Squarespace. These pages have limited options for controlling the content and display. These pages include search results pages, shopping cart, tag pages, and category pages.

**Related terms:** page types, search block, search result page, category, system page

## 🥁 BandsInTown

The Bandsintown block is an integration with the Bandsintown.com website. The content of this block is controlled by that website.


## 🛏️ Bedford

A popular Squarespace 7.0 template family known for its flexibility and customization options, including a partial mobile menu and hero banner feature.

**Related Terms:** templates, themes, Brine


## ✍️ Blog

A section of your website where you can publish articles and posts / An online journal with dated entries, usually made of mostly text with some supporting images or videos. Most blogs allow for other readers’ comments.

**Related Terms:** blog post, collection list, author profile



## 🫙 Brine

A popular Squarespace 7.0 template family known for its flexibility and customization options, including index pages.

**Related terms:** 7.0, bedford, template, theme


## 🖥 Browser

The program you use to access the internet, like Safari, Chrome, or Firefox.

## 🔘 Button Blocks

Button blocks are an important part of any Squarespace website. You can use them to link to another page on your site, anywhere on the world wide web, or even have the open a PDF on a new browser tab. There are standard button blocks that can be primary, secondary, or tertiary. There are also unique button selectors for newsletter forms, add-to-cart buttons, or even member signups.

**Related Terms:** CTA, call to action, header elements


## 🗓 Calendar

Calendar blocks can display blog posts, products, images, and events that are scheduled or have already happened.

**Related Terms:** Content block, event calendar


## 📞 Call To Action (CTA)

This is a term used commonly in advertising for what you want the people responding to your ad to do. Often referred to by its acronym, CTA, the possibilities are endless, and the most common range from “click here” to “share” or “buy now”

**Related Terms:** button blocks, header elements

## 🛒 Cart

The term cart can refer to multiple things in a Squarespace website.

In your website header, you can have a cart element, which is an icon that takes you directly to your shopping cart page.

Your shopping cart page is an auto layout created by Squarespace based on user activity. If you have a store collection page enabled on our site with active inventory, digital or physical, people an add that content to their cart.

**Related Terms:** ecommerce, inventory, cart, digital product, collection list, collection item, header element

## 🏷 Categories

Commonly used by blogs, posts can be tagged with categories, making it easier for visitors to explore topics they're interested in.

**Related Terms:** blog, summary

## 📊 Chart Block

Chart blocks create an easy way to visualize data points directly on your Squarespace site.


## 🛒 Checkout

The process by which customers complete a purchase on your eCommerce site.

**Related Terms:** e-commerce, store, product


## 🏛 Classic editor

Classic editor refers to the original type of page section in Squarespace 7.1, as well as blog post content and additional product details. Classic editor sections can have blocks of content, but they stick to a 12-column grid. They can only be resized horizontally or vertically with the help of spacer blocks. For mobile devices, you can not edit the layout of a classic section separately.

**Related Terms:** 7.0, blog, page section, theme, fluid engine


## 👩🏼‍💻 Code Block

You can add HTML, Javascript, and CSS to an individual page on your Squarespace site using a code block. That will load the code only on the specific page you place this content block on; this code will not load on any other page. You can also toggle on the option to display the source code if you want to feature the code in plain text mode on your site.

**Related Terms:** content block, CSS

## 📚 Collection

A Squarespace collection is a set of page types that use nested URLs. For example, a blog is a collection of blog posts, a store is a collection of products, and a portfolio is a collection of projects. Every collection has unique design settings to display the items within the collection.

**Related Terms:** nested url, blog, store.


## 📙 Collection Item

A page within a collection that has a unique URL slug. For example, a blog post within a blog, a product within a store, or a project within a portfolio.

**Related Terms:** blog, store, and collection list

## 📕 📗📘 Collection List

A page that features a list of collection items. For example, a blog is a collection list of blog posts, a store is a collection list of products, and a portfolio is a collection list of projects.

**Related Terms:** blog, store, collection item

## 🚧 Config

A common nickname for the Squarespace editing interface where you see your website preview on the right and the menu for editing on the left. Config is the URL slug for accessing the program that you will see in the address bar after your root domain.

**Related Terms:** domain, url slug

## ✉️ Contact Form

Any visitor can fill out the form and submit it to send a message to the site owner. Alternatively, it can trigger an automated email sequence.


## 🧱 Content Blocks

Content Blocks are draggable elements that showcase content on your website. They empower you to personalize your pages with a diverse range of content, including text, images, buttons, and forms.

**Related Terms:** classic editor, fluid engine, chart, text, audio, contact form, button blocks

## 🔗 Content Link

Content link blocks to add a clickable preview of a page on your site. This is a great way to display content in multiple places, like services or products that are related to a blog post. Version 7.1 content link blocks won't always display a page preview or description, but they will display a page title.

**Related Terms:** anchor link, URL, URL slug

## 🍪 Cookie Alert

Certain regions require website owners to inform visitors of cookies that are being used on a website, and Squarespace does just that! I strongly recommend adding a cookie alert to your website, and seeking legal advice on what text to include and how to set up the confirm & deny options.


## 📄 Cover Page

A single-page layout used for creating visually impactful landing pages or promotional content. These were a standard feature for Squarespace 7.0 and are not available in version 7.1. You can create one in version 7.1 by removing the main navigation using CSS.

**Related Terms:** landing page, 7.0, 7.1


## 👩🏼‍💻 CSS

CSS stands for cascading style sheet; a code language that tells a computer browser how to display the style of a site. Squarespace writes your CSS for you based on the choices you make in your design menu. You can add custom CSS to Squarespace to personalize the design and appearance of your Squarespace website beyond the built-in options.


## 👯‍♀️ Customer Accounts

Allowing customers to create accounts on your eCommerce site, making it convenient for them to track orders and save their preferences

**Related Terms:** online store, e-commerce, member area

## 🌐 Domain

A domain is a unique name that identifies a website. It refers to the domain or authority this title has over all  the pages under it. The domain name is what is between the ‘www’ and the ‘.com’ or other variations like .edu, .org, .biz, .me, .co.uk any many more.

## 💸 Donation

Donation blocks are a premium feature. You can have specified amounts, a title and description, and even a form to collect more information. The donation button will take the visitor to a checkout page.Adding prominent buttons that allow visitors to make quick and secure donations to support your cause or organization.

**Related Terms:** content block, premium feature

## ⬇️ Download

The act of moving a file from the internet onto your hard drive so you can access it without the internet. or vice-versa.

## ➕ Drag and Drop

Drag and drop refers to the process of adding and rearranging content blocks on your Squarespace site by simply clicking and moving them around, or dragging and dropping them where you want to see them displayed.

**Related Terms:** WYSIWYG

## 📁 Digital Product

Inside Squarespace, a digital product is content that requires a login to access, like a member area, course, or paid blog. Digital products like ebooks and PDF downloads are considered online products.

**Related Terms:** e-commerce, product, online store


## 💰 eCommerce

E-commerce is the term used for conducting business transactions electronically.

**Related Terms:** checkout, digital products


## 🪆 Embed

The ability to insert external content like videos, social media posts directly into your web pages. / When you embed content on a Squarespace site, the content that is displayed is usually from another source so elements inside of it can’t respond to CSS you add to your Squarespace site.

## 🎟 Event Block

The event content block is an integration with Tok.

**Related Terms:** integration, collection page, content block

## 🗓 Event Calendar

A collection list designed to be an interactive calendar that helps you showcase upcoming events, workshops, or performances on your site.

**Related Terms:** collection list


## 📄 Event Page

A page within an event list that has additional information about an event. Event pages have time, date, location, and add-to-calendar links. You can add content blocks to the event page using a form of the classic editor.

**Related Terms:** event calendar, collection item, classic editor


## ⭐️ Favicon

A small icon that is displayed in the browser tab next to the page title. The recommended size is 200px by 200px, and the recommended file type is PNG. Sometimes referred to as a browser icon.


## 👟 Footer

The bottom section of a web page that often contains additional links and information. In Squarespace 7.1 you can add multiple sections to your footer.


## 🌊 Fluid Engine

Fluid Engine is a type of page section  released in July 2020. Fluid Engine page sections allow for content layers, side page alignment, and give us the ability to adjust mobile layouts separately.

**Related Terms:** 7.1, classic editor

## 🖼 Gallery Block

**Gallery blocks are not the same as gallery sections.**

Gallery blocks are added as a content block to a page section, blog post, event listing, or additional product details. There are four main gallery block styles that you can target with CSS. To change the design style of your gallery, double click on the galley block and select the design tab.

**Related Terms:** content block, gallery section

## 🎞 Gallery Section

Gallery sections display a collection of images. These images can have descriptions/captions and they can each have their own link.

**Related Terms:** page section, auto layout


## ⎅ Grid

A system that helps align and organize content within a page. Squarespace 7 and classic editor areas are built on a 12 column grid system. Fluid engine sections are built on a 24 column grid system.

**Related Terms:** classic editor, fluid engine

## 👤 Header

The top section of your website that typically includes your logo, navigation menu, and other elements.

**Related Terms:** header elements


## 🧢 Header Elements

The top section of your website that contains your site title/logo as well as your main navigation links can also feature header elements. These elements include social media links, a button, a cart icon, and other features. These elements will also be visible on your mobile menu.

**Related Terms:** CTA, social media links, mobile menu


## 🦸‍♀️ Hero banner

A hero banner, also known as a hero image or hero header, is a large and prominent banner or image displayed at the top of a website's homepage or landing page. It is usually the first visual element that visitors see when they arrive on a website.

**Related Terms:** page section, video background

## 🏠 Home Page

The main page of your website that visitors see when they go to your domain address.

**Related Terms:** domain, URL, URL slug

## 🖼 Image Block

Fluid engine image blocks have separate design settings and feature an image with an optional link. Classic editor sections feature image blocks with 6 available layouts, paying the image with headline, subtitle, and button options.

**Related Terms:** gallery block, gallery section, content block, classic editor

## 🔃 Image Compression

Optimizing image file sizes to ensure fast loading times and an efficient browsing experience for your website visitors.

## 🗂 Index Page

A versatile page type that allows you to stack multiple pages vertically, index pages are only available on legacy sites built on version 7.

**Related Terms:** Brine, theme


## ⛓ Integration

Connecting your Squarespace site to external services or platforms, such as social media or email marketing tools. Integration blocks are difficult to customize in Squarespace; many of them respond to a separate style file and can not be edited with custom CSS installed on your Squarespace site.

## 🛍 Inventory

In the e-commerce world, a digital inventory system tracks how many of each item you have available,  whether they're brand new or getting low in stock. Squarespace ecommerce can help you keep your digital inventory up-to-date.

**Related Terms:** ecommerce, store, cart, abandoned cart

## 🛬 Landing Page

This is a page on your website that is used for specific traffic or advertisements. It is considered a best practice to have a landing page for special promotional offers or incentives. It is also used for all ads about this piece of content.

**Related Terms:** opt-in, URL slug, URL redirect


## ⎯ Line

The horizontal line in Squarespace is a simple border option. You can use CSS to change the color and size of your horizontal line.

**Related Terms:** content block

## 🔗 Link

A link is a piece of text that will send you to a URL. A link can be anchor text, a redirect, or a shortened URL.

**Related Terms:** anchor text, redirect, URL, URL slug

## ⏛ List section

A list section is a type of auto layout section that organizes list item content based on your design settings and automatically restructures the content based on screen size.

**Related Terms:** page section, auto layout


## 🗺 Map

The map block is an integration with Google maps. You can change the style of the map using the built-in options, or use custom CSS.

**Related Terms:** content block, site map

## 🧱 Markdown Block

Markdown blocks can be used to add text and images to your Squarespace site using a different code language.

**Related Terms:** content block

## 👯‍♀️ Member Area

Password-protected sections of your website with exclusive content. In Squarespace, this acts as a folder with specific pages that only members can access when logged in.

**Related Terms:** member sign up, digital product


## 🙋‍♀️ Member Sign Up

When you create a Members Area within your Squarespace site, you can encourage people to sign up using the member sign-up block.

**Related Terms:** member area, digital product


## 🍽 Menu Block

A premium feature for business and commerce plans, the menu content block allows you to place a pre-styled menu into your Squarespace site. This menu can have pages, sections, and items. You can set it to display the content as a centered list of sections and items, or multi-column which will separate menu items from each section into two columns automatically. The page titles will be displayed at the top of the screen and will act as links to display the page content without having to reload your entire site.

**Related Terms:** content block


## 🔢 Metadata

Information about a webpage that helps search engines understand its content. Most Squarespace pages and collection items can have unique meta data including titles and descriptions.

**Related Terms:** SEO, page, collection item


## 📱 Mobile Information Bar

The mobile information bar is a premium feature available on business and commerce plans. It's structured like a banner at the bottom of your site on mobile devices that shows up when the page loads. It shows your business info and provides quick access to contact details like address, phone number, and hours.

**Related terms:** premium feature

## 🤳 Mobile Optimization

Ensuring your website looks and functions great on smartphones and tablets making it easy for people to access your content from smaller devices.

**Related Terms:** grid, responsive

## 🧭 Navigation

How people move around on your website. The most common forms of navigation are done from a main menu, and a combination of main and submenus. Site maps also help with user navigation.

**Related Terms:** header, menu, site map, content link, anchor link

## 🪆 Nested URL

A URL slug for a collection item. Ex: domain.com/blog/post

**Related Terms:** collection list, collection item, blog

## 💌 Newsletter Sign-Up Block

A feature that allows visitors to subscribe to your email newsletter for updates, promotions, and exclusive content. They currently integrate with Squarespace Email Campaigns, Mailchimp, Google Drive and Zapier.


## 🙋‍♀️ Opt-in

Opt-in is shorthand slang for selecting an option to receive information. To opt in means you agree to receive a specific form of communication, such as email newsletter or promotional offer.

**Related Terms:** CTA - Call To Action, landing page, newsletter sign-up block

## 📄 Page Section

A page section is a space in a Squarespace website that you can add content to. In Squarespace 7.1, these sections can be added to standard pages, above & below collection lists, and to footers (classic & fluid only). There are four types of pages sections: fluid, auto: list, auto: gallery, and classic.

**Related Terms:** classic editor, ****fluid engine


## 📑 Page

Individual sections of your website, such as the homepage, about page, or contact page.

**Related Terms:** collection list, collection page, auto layout, index page


## ↔️ Pagination

Automatically generated links that help visitors navigate to the previous and next item in a collection, like blog posts and projects inside a portfolio.

**Related Terms:** blog, portfolio, collection item


## 🌠 Parallax

A design technique where the background moves at a different speed than the foreground, creating an illusion of depth.

## 🤫 Password Protection

Restricting access to certain pages or content on your website by requiring visitors to enter a password. This can be set on an individual page level or for the entire site.



## 🤑 Premium feature

Squarespace features that are only available for websites using a business or commerce-level Squarespace subscription.



## 🧱 Product Blocks

Product blocks allow you to showcase an item for sale in your Squarespace store.

**Related Terms:** content block, ecommerce, digital product


## 👯‍♀️ Product Variants

Different versions or options that are available for a particular product, such as different clothing sizes and different colors.

**Related Terms:** ecommerce, inventory, product block


## 🎟 Promotional Pop-Ups

Attention-grabbing windows that pop up on your website to showcase special deals, new products, or upcoming events.



## 👀 Quick View

When you add a product block to a standard page in Squarespace, you can enable quick view which will create a button over the product image on a hover, allowing the visitor to open a Lightbox with the quick view of the product details.

**Related Terms:** Product Block.


## 💬 Quote Blocks

Quote blocks display a special type of text content, separating the quote text and the quote source. In many versions of Squarespace, automatic symbols are added to a quote block like quotation marks around the content and a dash before the source.

**Related Terms:** content block


## 🔀 Redirect

When referring to websites, a redirect refers to a URL that redirects you to another one. This is common practice for getting people to pages that have long titles by using a quick name or simple URL slug

**Related Terms:** 301, 302, URL slug

## 🛍 Related Products

Showcasing additional products or items that are related to the one a customer is currently viewing, encouraging them to explore more options

**Related Terms:** ecommerce, inventory, product block, product variant

## 👩🏼‍💻 Responsive Design

Designing websites to adapt and display properly on different devices and screen sizes. Squarespace is a responsive website development platform, but you can adjust the mobile layout for fluid engine sections separately from the standard responsive sizes.

**Related Terms:** drag and drop, grid, WYSIWYG

## 📑 Rich Site Summary (RSS)

An automated process that shares newly published content from a website or blog with subscribers. RSS feeds are generally delivered by email when you opt-in.

## 📜 Scrolling Marquee

A scrolling marquee block can have multiple text items that scroll across the screen. You can change the direction, speed, content, and even the background color and text types using built-in features.


## 🔎 Search Bar / Search Block

A tool that allows visitors to search for specific content or products on your website, making it easier for them to find what they're looking for.

You can add a search content block for your entire site, or specify a specific collection.



## 🕵️‍♀️ Search Engine Optimization (SEO)

The concept or process of making changes to a webpage to improve its organic search rank. These changes can include site structure and content. Often referred to as SEO.

**Related Terms:** metadata, alt tag


# 📃 Search results page

Squarespace automatically creates a search results page on every website with the URL slug /search. This page will be shown when a visitor uses a search content block. The content displayed on this page will be based on the content block settings.

**Related Terms:** search block, URL slug, auto layout


## 🗄 Server

A physical data storage system that houses your website's data and makes it accessible online. Squarespace relies on multiple servers in different parts of the United States to keep your data secure.

## 👑 Site Hierarchy

The order in which your pages are organized. Squarespace has a shallow site hierarchy, meaning that we can manually create nested URLs up to 3 layers deep.

**Related Terms:** domain, site map, home page, URL slug

## 🗺 Sitemap

A file that lists all the pages on your website to help search engines index your content. Squarespace automatically creates a sitemap for you that you can access by ending .xml to the end of your domain.

**Related Terms:** domain, site hierarchy, URL slug

## 🎨 Site Styles

An older term used to refer to the design men in Squarespace, still found in version 7.0

**Related Terms:** 7.0, themes

## 🔗 Social Links / Social Media Icons

Easily identifiable icons are linked to your social media profiles, making it effortless for visitors to connect with you on various platforms. You can enable social media links in the header of a Squarespace 7.1 website and you can add them as a content block.

**Related Terms:** header, header elements, content link


## ◼️ Squarespace

Squarespace is a web based program platform  that allows individuals and businesses to create and maintain websites and online stores. It provides users with a variety of templates and tools to create websites. Squarespace offers features such as website hosting, domain registration, e-commerce functionality, email services, membership management, analytics, and customer support, all in one platform. It's known for its user-friendly interface and sleek designs, making it a popular choice for those looking to build professional-looking websites without extensive technical knowledge.

**Related terms:** everything in this glossary 😅


## 💌 Squarespace Campaigns

Squarespace Campaigns is a feature within the Squarespace platform that enables users to create, manage, and track email marketing campaigns. It allows individuals and businesses to design email newsletters, announcements, promotions, and other marketing materials directly within the Squarespace interface that integrate with other features like newsletter blocks, form blocks, and ecommerce.

**Related Terms:** contact form, CTA, ecommerce, landing page, newsletter block, opt-in, Squarespace


## 🔌 Squarespace Extensions

Third-party plugins and integrations that expand the functionality and capabilities of your Squarespace site, allowing you to add extra features and tools with ease.


## 🔐 SSL (Secure Sockets Layer)

SSL, which stands for Secure Sockets Layer, is a critical tool for protecting online communication. Imagine a safe passage built with advanced encryption technology.

This secure tunnel scrambles the data traveling between your computer and a website, making it unreadable to anyone trying to intercept it.  SSL is especially important for sensitive information like credit card details or login credentials.

By using websites with SSL, you can be confident your data is protected as you shop and browse online.

## 💳 Stripe

A popular payment processor Stripe, making it easy to accept credit card payments on your site.

**Related Terms:** ecommerce, inventory, product

## 🧱 Summary Blocks

Summary blocks display content from collection pages, like blog posts, and products. You can filter the collection to only display content that is marked as featured or organized by a specific tag or category. You can choose to display different pieces of content in a variety of layouts by selecting different display options inside the Squarespace editor.


## 🛒 Shopping Cart

The term shopping cart can refer to multiple things in a Squarespace website. In your website header, you can have a shopping cart element, which is an icon that takes you directly to your shopping cart page.

Your shopping cart page is an auto layout created by Squarespace based on user activity. If you have a store collection page enabled on our site with active inventory, digital or physical, people can add that content to their cart.

**Related Terms:** ecommerce, inventory, cart, digital product, collection list, collection item, header element

## ☁️ Tag Cloud

Tag clouds display categories or tags from collection pages, including blogs and products. You can sort them alphabetically, by weight, or by activity. You can display a minimum of 5 tags or up to 100.

## 🖼 Template

A pre-designed layout that serves as the foundation for your website design. Squarespace 7.1 website templates all belong to the 7.1 theme and all have the same features and functionality.  Squarespace 7 website templates belong to a specific theme family. Templates within a theme family have the same features and functionality, some of which are unique for that theme.

**Related Terms:** 7.0, 7.1, Bedford, Brine, theme


## 💬 Testimonials

Displaying positive customer reviews and feedback on your site to build trust and credibility with potential clients or customers.

## 🔡 Text

In the Site Styles menu built into Squarespace, you can change the font family and color of a text block. You can also change the color of an individual text element inside the editor.

**Related Terms:** content block, quote block


🗂 Theme

Squarespace 7.0 website templates belong to a specific theme family. Templates within a theme family have the same features and functionality, some of which is unique for that theme. Squarespace 7.1 website templates all belong to the 7.1 themes and all have the same features and functionality.

**Related Terms:** 7.0, 7.1, Bedford, Brine, template


## 👍 Thumbnail

A thumbnail is a small image or small section of an image used as a preview; commonly used for blogs and events.

## 🔗 URL

A URL (Uniform Resource Locator) is the unique digital address of a website.

**Related Terms:** URL slug, URL redirect, domain.

## 🔀 URL Redirect

When referring to websites, a redirect refers to a URL that redirects you to another one. This is common practice for getting people to pages that have long titles by using a quick name.

**Related Terms:** 301, 302, URL slug

## 🐌 URL Slug

Text placed after a forward slash that determines the location of a webpage. (Ex: domain.com/urlslug)

**Related Terms:** domain, URL, URL redirect

## 📺 Video Backgrounds

Adding videos as backgrounds to certain sections of your website to make them visually dynamic and engaging. Video backgrounds don’t work on mobile devices, but you can always upload a GIF as a mobile fallback image.

**Related Terms:** page section, fluid engine

## 🎞Video Collection

A brand new feature for Squarespace that was released in January 2022, you can host collections of videos on your Squarespace site!

**Related Terms:** digital product, member area


## 👀 WYSIWYG

An acronym for What You See Is What You Get and it refers to the drag and drop process of building a website using a visual editor like Squarespace.

**Related Terms:** responsive
