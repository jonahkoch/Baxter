# Line Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

You can use a **Squarespace line block** to add a solid line to a page section.

Line blocks can help you create a visual separation in your website content with stylish horizontal lines.

---

Pop them in between text blocks or anywhere you want to visually organize your site.

With custom code, we can change the color, size, and even replace the line with an image! Check out the selectors and snippets below for more info,

## Selectors

| Change the color | .sqs-block-horizontalrule hr {background-color:red} |
| --- | --- |
| Change the size | .sqs-block-horizontalrule hr {height: 20px} |

## Snippets

- How use an image for your horizontal line
    
    <aside>
    💡 **HOW TO UPLOAD**
    
    1. Upload the image to your Squarespace website (Design > Custom CSS > Manage Custom Files)
    2. Paste the code below in your Custom CSS (Design > Custom CSS)
    3. Replace the text image-url-here with your own image url from the custom files section, making sure to leave the individual quotation marks around the url itself.
    4. Adjust the height so the line looks the way you want it to!
    
    For more information about this code, check out [this tutorial video.](https://insidethesquare.co/squarespace-tutorials/horizontal-line-image)
    
    </aside>
    
    ```css
    hr {background-color: transparent!important;
     background-image: url('your-url-goes-here');
     background-size:contain!important;
     background-position:center;
     background-repeat:no-repeat!important;
     height:30px!important
    }
    ```
    
    <aside>
    💡 **PRO TIP
    Need to make it bigger?** 
    Change the number 10 in height:10px!important to something larger
    **Want it to repeat horizontally?** 
    Try background-repeat: repeat-x
    
    **Want it to repeat vertically?** 
    Try background-repeat: repeat-y AND increase the height.
    
    </aside>
