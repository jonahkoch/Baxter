# Accordion Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

Commonly used for FAQ’s, an accordion block displays a list of titles, each with an icon to indicate that there is more information available. When the title is clicked on, the description text will be displayed underneath. 

**What you can customize about the accordion block using the design options inside Squarespace** 

- You can change the **text**; both title and description
- You can make the **title** any font style from your site style menu; heading or paragraph
- You can make the **description** any paragraph font style
- You can **rearrange** the content by dragging and dropping them in the content editor (double-click on the accordion block to edit)
- You can change the **icon** to be a plus sign or an arrow
- You can change the thickness of the **divider** **lines**, or turn them off completely
- You can change the color of the **divider** **lines** using the color options in your **site style** menu
- You can add a **border** (stroke) to the accordion block
- You can **curve** **the** **corners** of the accordion block
- You can add a solid color **background** to the accordion block

## Selectors

| Entire Accordion | .sqs-block-accordion |
| --- | --- |
| Accordion Title Container | .sqs-block-accordion .accordion-item__click-target |
| Accordion Title Text | .sqs-block-accordion .accordion-item__title |
| Accordion Description Container | .accordion-item__dropdown |
| Accordion Description Text | .accordion-item__description |
| Accordion Divider Line | .sqs-block-accordion .accordion-divider |
| Open Accordion Tab | .accordion-item__dropdown--open |
| Accordion Icon Container | .accordion-icon-container |
| Accordion Icon - Arrow | .sqs-block-accordion .arrow |
| Accordion Icon - Plus | .plus |
| Accordion Icon - Plus Horizontal Line | .plus__horizontal-line |
| Accordion Icon - Plus Vertical Line | .plus__vertical-line |

<aside>
💡 **PRO TIP** 
The accordion arrow icon is made up of borders! You can change the size, width, and color inside Squarespace, and use custom code to change the border-style.

</aside>

<aside>
💡 **PRO TIP**
The plus sign line colors can be changed by adjusting the background color.

</aside>

## Snippets

- Use a custom color for the accordion item background
    
    ```css
    .sqs-block-accordion .accordion-items-container {
     background: yellow
    }
    ```
    
- Replace the accordion block divider line with an image
    
    ```css
    .sqs-block-accordion .accordion-divider{
     background-image:url(image-url-here);
     background-size:cover
    }
    ```
    
- Create alternating accordion item background colors
    
    ```css
    .accordion-item:nth-child(odd){
     background: #e5f5f6
    }
    .accordion-item:nth-child(even){
     background: lightgray
    }
    ```
    
- Use your own image for the accordion block icon
    
    ```css
    .accordion-icon-container div {
      visibility: hidden;
    }
    [aria-expanded="false"] 
    .accordion-icon-container {
      background-image: url(close-icon-url);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
    [aria-expanded="true"] 
    .accordion-icon-container {
      background-image: url(open-icon-url);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .accordion-icon-container{
    transition:all 1s
    }
    
    ```
    
- Add a button to an accordion block
    
    [Click here](https://insidethesquare.co/squarespace-tutorials/accordion-button) to watch a step by step tutorial on how to use this code
    
    ```css
    .sqs-block-accordion a {
     border: 1px solid #000;
     background: pink;
     color: #333;
     padding: .5rem
    }
    
    .sqs-block-accordion a:hover {
     border: 1px solid #000;
     background: #eee;
    }
    ```
    
- Large number column accordion design
    
    
    ![Accordion block with large numbers](Accordion%20Block/Green_Minimalist_Yoga_Tips_For_Beginners_Blog_Post_Instagram_Post_(2).png)
    
    To change the colors in this code, adjust the hex color codes to any websafe color name or color code. 
    
    This code will add numbers up to 10, but you can easily add more if you need them! 
    
    Copy and paste the last line of the code, changing the value **10** to **11** and repeating that process until you have all the numbers you need.
    
    ```css
    /* size & color */
    .sqs-block-accordion .accordion-item__click-target{
      background: #e5f5f6; /* the background color of the accordion item titles */
      padding: 1rem!important;
      padding-left:2rem!important;
      margin-bottom:.5rem
    }
    .sqs-block-accordion .accordion-divider{
      display:none
    }
    
    .accordion-item__dropdown--open {
     margin-top:-.5rem;
     padding:1rem;
     padding-bottom:0;
     margin-bottom:1rem;
     background:#fff /* the background color of the accordion description */
    }
    
    /* open item */
    .sqs-block-accordion .accordion-item__click-target[aria-expanded="true"]{
     background:#FFF /* the background color of the accordion item title when clicked on */
    }
    
    /*don't edit this section */
    .sqs-block-accordion .accordion-item__click-target:before{
     font-size: 3rem;
     transform:translatex(-1rem)
    }
    /* numbers: add more as needed, follwing instructions above */
    .accordion-item:nth-child(1) .accordion-item__click-target:before{content:"01"}
    .accordion-item:nth-child(2) .accordion-item__click-target:before{content:"02"}
    .accordion-item:nth-child(3) .accordion-item__click-target:before{content:"03"}
    .accordion-item:nth-child(4) .accordion-item__click-target:before{content:"04"}
    .accordion-item:nth-child(5) .accordion-item__click-target:before{content:"05"}
    .accordion-item:nth-child(6) .accordion-item__click-target:before{content:"06"}
    .accordion-item:nth-child(7) .accordion-item__click-target:before{content:"07"}
    .accordion-item:nth-child(8) .accordion-item__click-target:before{content:"08"}
    .accordion-item:nth-child(9) .accordion-item__click-target:before{content:"09"}
    .accordion-item:nth-child(10) .accordion-item__click-target:before{content:"10"}
    ```
    
- Circled icon accordion design
    
    
    ![Green Minimalist Yoga Tips For Beginners Blog Post Instagram Post (1).png](Accordion%20Block/Green_Minimalist_Yoga_Tips_For_Beginners_Blog_Post_Instagram_Post_(1).png)
    
    To change the colors in this code, adjust the hex color codes to any websafe color name or color code. 
    
    The first color labeled **--icon** is the color of the icon indicator for the accordion items
    
    The second color labeled **--icon-background** is the color of the circle background behind the icon.
    
    The third color labeled **--background** is the background of the title and the border around the description when it’s expanded.
    
    ```css
    /* colors - change these*/
    :root{
    --icon: #333;
    --icon-background: #FFF;
    --background: #F6EDCE;
    }
    /* clickable items */
    .sqs-block-accordion .accordion-item__click-target{
      background: var(--background); 
      padding: 1rem!important;
      margin-bottom:.5rem
    }
    .sqs-block-accordion .accordion-divider{
    display:none
    }
    .accordion-item__dropdown--open {
     margin-top:-.5rem;
     padding:1rem;
     padding-bottom:0;
     margin-bottom:1rem;
     border: 5px solid var(--background)
    }
    
    /* icon */
    .accordion-icon-container {
     background:var(--icon-background);
     border-radius:50%;
     border:10px solid var(--icon-background)
    
    }
    .accordion-icon-container * {
     color:var(--icon)
    }
    ```
    
- Rounded accordion design
    
    
    ![Green Minimalist Yoga Tips For Beginners Blog Post Instagram Post.png](Accordion%20Block/Green_Minimalist_Yoga_Tips_For_Beginners_Blog_Post_Instagram_Post.png)
    
    To change the colors in this code, adjust the hex color codes to any websafe color name or color code. The first color labeled **--border** is the border of the accordion items, a dark grey that blends with the shadow. The second color labeled **--background** is the color of the background for an open accordion item.
    
    ```css
    /* colors - change these*/
    :root{
    --border: #efefef;
    --background:#efefef;
    }
    
    /* shape & shadow */
    .sqs-block-accordion .accordion-item__click-target{ border:1px solid var(--border); 
    border-radius: 3rem;padding: 1rem!important; margin-bottom: .5rem!important;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.05);
    }
    .sqs-block-accordion .accordion-divider{display:none}
    .accordion-item__dropdown--open {
    margin:1.5rem}
    
    /* open accordion */
    .sqs-block-accordion .accordion-item__click-target[aria-expanded="true"] {
    background:var(--background)
    }
    ```
    
- Add an image to an accordion block description
    
    Use the following code to add an accordion block description. The image will be placed before the description text. This image will need a specified height. Background size values of cover or contain recommended. Create nth-child selectors for any accordion items in display order; ex: first item = :nth-child(1) 
    
    ```css
    .accordion-item:nth-child(1) .accordion-item__dropdown:before{
    display:inline-block;
    width:100%;
    height:200px;
    content: "";
    background:url(url-here);
    background-size:cover;
    }
    ```
    
- Add a second line to the accordion item title
    
    ```css
     .accordion-item__title:after{
      white-space:pre;
      font-size:10px;
      font-weight:bold;
      letter-spacing:.2rem
    }
    .sqs-block-accordion .accordion-item:nth-child(1) .accordion-item__title:after{
      content:"\A FIRST ITEM";
    }
    .sqs-block-accordion .accordion-item:nth-child(2) .accordion-item__title:after{
      content:"\A SECOND ITEM";
    }
    .sqs-block-accordion .accordion-item:nth-child(3) .accordion-item__title:after{
      content:"\A THIRD ITEM";
    }
    
    ```