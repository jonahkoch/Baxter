# Audio Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

<aside>
💡 **These are the current (July 2022) specifications:**
     Format: .mp3 or .m4a
     Bit Depth: 16bit 
     Bitrate: 128 kbps max (96 kbps recommended for spoken word)
     Channels: Mono or Stereo
     File Size: An uploaded file must be 160 MB or smaller. *To use a larger file, link to an external host.*
For the latest info, check out [this official Squarespace support article](https://support.squarespace.com/hc/en-us/articles/206543197-Audio-blocks).

</aside>

## About

A **Squarespace audio block** can be used to play an audio file directly from a page on your website.

An audio block can feature a file uploaded directly to Squarespace, or linked from an external source. The audio file will play directly on the page without an additional program.

You can upload an MP3 or M4A audio file that is 160MB or less.

Audio blocks come in two design formats displayed below. The first is the **minimal** audio block, the **second** is the classic.

**What you can customize about the audio block using Squarespace**

You can change the **style** of the block to minimal dark, minimal light, or classic. These colors can not be adjusted using the site style menu.

You can add an audio track **title**, and list the **author/artist** for the audio track.

You can give people the option to **download** the file.

You can connect an individual audio block to your **RSS** **feed**.

## Selectors

| Audio Player Block | .sqs-widgets-audio-player |
| --- | --- |
| Audio Player Background | .sqs-widgets-audio-player .track |
| Play Button | .sqs-widgets-audio-player .play .play-button |
| Pause Button | .sqs-widgets-audio-player .action .pause |
| Track Title | .sqs-widgets-audio-player .title-wrapper .title |
| Author/Artist | .sqs-widgets-audio-player .artistName |
| Time | .sqs-widgets-audio-player .time |
| Time: Played | .sqs-widgets-audio-player .time .progress |
| Time: Total | .sqs-widgets-audio-player .time .total |
| Download link (if enabled) | .sqs-widgets-audio-player a |
| Soundcloud Block | .soundcloud-block |

<aside>
💡 **PRO TIP**
The play button is actually a left border code. You can change its color and size using a border code like this example code here: 

**.sqs-widgets-audio-player .play .play-button {border-left: 25px solid red}**

</aside>

<aside>
💡 **PRO TIP**
The pause button is a border just like the play button. Use a code like this example to change its color: 

**.sqs-widgets-audio-player .action .pause {border-color:orange}**

</aside>

<aside>
💡 **PRO TIP**
You can use the code name for a Soundcloud block to add a border, shadow, or image filter, but the content inside the block is not editable with CSS.

</aside>

## Snippets

- Change the background color of the player itself
    
    ```css
    .sqs-widgets-audio-player {background:orange!important}
    ```
    
- Change the color behind the play/pause button
    
    ```css
    .sqs-widgets-audio-player .action {background:orange!important}
    ```
    
- Change the color of the play/pause button
    
    ```css
    .sqs-widgets-audio-player .action .play-button {
     border-left-color: purple!important
    } 
    .sqs-widgets-audio-player .action .pause{
     border-color: purple!important
    }
    ```
    
- Change the color of the title
    
    ```css
    .sqs-widgets-audio-player .title-wrapper .title{color: purple!important}
    ```
    
- Change the title font size
    
    ```css
    .sqs-widgets-audio-player .title-wrapper .title {font-size: 2rem!important}
    ```
    
- Change the artist font size
    
    ```css
    .sqs-widgets-audio-player .artistName {font-size: 2rem!important}
    ```
    
- Change the artist to uppercase
    
    ```css
    .sqs-widgets-audio-player .artistName {text-transform:uppercase!important}
    ```
    
- Change the color of the time
    
    ```css
    .sqs-widgets-audio-player .time {color: purple!important}
    ```
    

## Pre-made Design Plugins

- Minimal Style Design
    
    ```css
    .sqs-widgets-audio-player {
    background:transparent!important
    } 
    .sqs-widgets-audio-player .title-wrapper .title, .sqs-widgets-audio-player
    .artistName, .sqs-widgets-audio-player .time{
     color:#50bdb8!important
    } 
    .sqs-widgets-audio-player .action .play-button {
     border-left-color:#50bdb8!important
    } 
    .sqs-widgets-audio-player .action .pause{
     border-color:#50bdb8!important
    } 
    .sqs-widgets-audio-player .artistName {
     text-transform:uppercase; 
     letter-spacing: .1rem; 
     font-size: .75rem
    }
    ```
    
- Rounded Gradient
    
    
    Audio Player Example: 
    
    ![gradient audio block.png](Audio%20Block/gradient_audio_block.png)
    
    ```css
    .sqs-widgets-audio-player {
     box-shadow: 2px 5px 15px rgba(0,0,0,0.2); 
     background:linear-gradient(to right, lightblue,pink)!important; 
     border-radius: 35px!important
    } 
    .sqs-widgets-audio-player .title-wrapper .title, .sqs-widgets-audio-player 
    .artistName, .sqs-widgets-audio-player .time, .sqs-widgets-audio-player a{
     color: #fff!important
    } 
    .sqs-widgets-audio-player .action .play-button {
     border-left-color: #fff!important
    } 
    .sqs-widgets-audio-player .action .pause{
     border-color: #fff!important
    }
    .sqs-widgets-audio-player .action:hover{
    background-color:transparent!important
    }
    ```