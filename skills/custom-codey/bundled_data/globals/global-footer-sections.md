# Footer Sections

Type: Global Elements
Compatible Versions: 7.1
Last Updated: April 23, 2026

Footer sections are made up of page sections so the standard page section and content block selector classes will work. To target content that is inside the footer section container, you can use **#footer-sections**

For example, this code will center all text inside the footer area on mobile:

```css
@media only screen and(max-width: 640px){
#footer-sections * {
text-align: center!important
}
```

Snippet: Auto adjust year snippet

```html
<p style="text-align: center;">All Rights Reserved © 
<script>document.write(new Date().getFullYear())</script> 
by YOUR BUSINESS NAME</p>
```
