# Video Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

Share your creative content with your website visitors using **Squarespace video blocks**!

When it comes to adding videos to your website, Squarespace video content blocks are your go-to tool.  This content block can be used to showcase your amazing video content directly on any page.

It's super simple to use - just upload your video file or paste a link from Youtube or Vimeo, and voila! Your video will be ready to entertain and inform your visitors.

You can add a title and description to give visitors a quick idea of what the video is about.

<aside>
💡 **These codes are for the video content block, not the video collection pages.**

</aside>

## Selectors

| All Video Player Blocks | .sqs-video-wrapper |
| --- | --- |
| Video without Custom Thumbnail | .sqs-video-wrapper iframe |
| Video with Custom Thumbnail | .sqs-video-wrapper .sqs-video-overlay |
| Video with Custom Thumbnail: Play Button | .sqs-video-wrapper .sqs-video-overlay .sqs-video-icon |
| Gradient overlay behind controls for uploaded video | .video-player .plyr .plyr__controls:before{ |

## Snippets

- Replace the play button on video players with your custom image
    
    ```css
    .sqs-video-wrapper .sqs-video-overlay .sqs-video-icon {
     background-image: url(your-image-url-here)!important;
     background-size: contain;
    }
    ```
    
- Add a drop shadow to your video player
    
    ```css
    .sqs-video-wrapper {
     box-shadow: 5px 15px 5px rgba(0,0,0,0.2)
    }
    ```
    
- Change Video Block Ratio for a vertical video
    
    [Check out the step by step tutorial video here.](https://insidethesquare.co/squarespace-tutorials/video-block-size)
    
    ```css
    .video-block .video-player{
    padding-bottom:120%
    }
    ```
    
- Change block ratio to vertical video - 9:16
    
    ```css
    .video-block .video-player{
    padding-bottom:120%
    }
    ```
