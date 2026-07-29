# Tag Cloud Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

Creatively show a list of your categories or tags with a **Squarespace tag cloud blocks**.

A tag cloud is a creative twist on a basic list. This collection of text based links shows a list of tags or categories for a selected collection. The size of each category/tag word reflects how often it's used.  The bigger the word, the more popular the category or tag!

You can also choose how you want the tags to be displayed:

**Alphabetical:** Just like in a dictionary, all the tags appear in alphabetical order.

**By Weight:** This option uses the size thing again – tags used more often appear larger and "weigh" more in the cloud.

**By Activity:** This shows the most recently used tags with a bigger font, keeping your cloud up-to-date.

It's a fun way to add a visual element to your categories and help visitors discover content they might be interested in.

**How to customize the content in Squarespace tag clouds with CSS**

CSS stands for Cascading Style Sheet and it’s a special type of code that you can use to customize Squarespace. To add any of these codes to your website, navigate to **website** and select **website tools** then **custom css**. Paste the code in the CSS window and press save. Reload your page to see the changes.

To learn more about CSS for Squarespace,  visit [tutorials.squarespace.com/learn](https://tutorials.squarespace.com/learn)

**Increase the space between words by changing 5px to a larger value**

```css
.tagcloud-block ul li {
margin-right: 5px
```

**Change the color of a word on the tag cloud on a hover. This code will change it to red; update that color for your own site style!**

```css
.tagcloud-block a:hover {
color:red
}
```

## Selectors

| Tag Cloud Block | .sqs-tagcloud |
| --- | --- |
| Individual Tag | .tagcloud-block ul li |

## Snippets

- Add space between words in a tag cloud
    
    ```css
    .tagcloud-block ul li {
    margin-right: 1rem
    }
    ```
    
- Change the color of words in a tag cloud on hover
    
    ```css
    .tagcloud-block a:hover {
    color:red
    }
    ```
