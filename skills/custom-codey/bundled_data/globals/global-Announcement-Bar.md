# Announcement Bar

Type: Global Elements
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

- **Here is a tutorial with more info on how to set up an announcement bar in Squarespace 7.1**
    
    [https://youtu.be/jW2Sfn5Yhko](https://youtu.be/jW2Sfn5Yhko)
    

To turn on this premium feature, navigate to  Marketing > Announcement Bar

An announcement bar can be used to display custom text at the top of your website. It’s usually used for announcements, sales, and other important updates. This announcement bar can have **bold** and *italicized* text and an active link inside the text.

## Selectors

| Announcement Bar | .sqs-announcement-bar |
| --- | --- |
| Announcement Bar Close Icon | .sqs-announcement-bar-close |
| Announcement Bar Text | .sqs-announcement-bar-text p |
| Announcement Bar Link | .sqs-announcement-bar-text a |

## Style Snippets

- Turn an announcement bar link into a button
    
    Create a link inside your announcement bar text, and use the following code to change the background border and color of only the active link text. Adjust the border style, colors, and size values below to make it uniquely yours.
    
    ```css
    .sqs-announcement-bar-text a {
     text-decoration: none!important;
     margin: 5px!important;
     padding: 4px!important;
     background-color: #000;
     color: #FFF!important;
     border: 1px solid red!important; 
    }
    
    .sqs-announcement-bar-text a:hover {
     background-color: #fff;
     color: #000!important;
     border: 1px solid yellow! important; 
    }
    ```
    
- Hide the announcement bar close icon
    
    
    ```css
    .sqs-announcement-bar-close{
    display: none!important
    }
    ```
