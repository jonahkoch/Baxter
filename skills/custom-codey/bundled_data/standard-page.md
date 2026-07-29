# Standard Pages

Type: Collections
Compatible Versions: 7.1
Last Updated: April 23, 2025

You can target the entire page container using the selector **#page**  or using the unique collection id for an individual page, which often looks like this: **#collection-1234567890987654321** 

<aside>
⚠️

I use the free chrome extension - [Squarespace ID Finder](https://insidethesquare.co/chromeext) - from Will Myers to quickly grab collection IDs.

</aside>

You can use this to make changes to all page content, like this code example that would change all heading 1 text on an individual page to a new font family:

```css
**#collection-1234567890987654321 {
font-family: 'Poppins'
}**
```

Another example is wanting to add a gradient background to the entire page, without effecting the header and footer of the page. You could add this code to your page header code injection for that page. 

```html
<style>
#page .page-section,
#page .section-border,
#page .section-background{
background: transparent!important;
background-color: transparent!important;
}
#page {
background: linear-gradient(135deg, #a1d9dd, #c8d772)
}
<style>
```

<aside>
⚠️

Pro tip: when using page header code injection for your custom CSS, instead of your site-wide CSS file, you need to label the code as a style code like this example above.

</aside>

Standard pages are made up of page sections. Use the page section selectors in your codes to change the style of page section content
