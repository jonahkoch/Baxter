# Courses

Type: Collections
Compatible Versions: 7.1
Last Updated: April 23, 2025

### 📚Course Overview Page Selectors

In the course overview, you have the option to add page sections both above and below the list of course content, similar to other collection types like a blog list , or a list of events.

The course overview itself has two main areas of text: the title and the description. 

The title, when edited directly on the page, will also update the course name in the settings. The description is not related to the excerpt and can only be edited on this page. The excerpt from the settings is not displayed on the course overview.

| Course List Page | .course-list |
| --- | --- |
| Course Header Space | .course-list__header |
| Course Title | .course-list .course-list__course-name |
| Course description/subtitle | .course-list .course-list__course-description |
| Start Course Button Space | .course-list__course-action |
| Start Course Button
(p*rimary button style by default*) | .course-item__course-action-button |
| Progress bar: entire section | .course-list__progress-bar-container |
| Progress bar: percentage complete fill | .course-list .course-list__progress-bar-container .course-list__progress-bar |
| Progress bar: percentage complete text area | .course-list__progress-bar-text .course-list__progress-bar-percentage |
| Progress bar: percentage complete text | .course-list .course-list__progress-bar-container .course-list__progress-bar-percentage::before |
| Progress bar: progress text | .course-list .course-list__progress-bar-container .course-list__progress-bar-text |

### List Layout Selectors

| Chapter Section (including lessons) | .course-list__list-chapter-item |
| --- | --- |
| Chapter Section (Title, count & duration only) | .course-list .course-list__list-chapter-item-accordion-trigger |
| Chapter Title Text | .course-list__list-chapter-item-chapter-name |
| Chapter Meta Container | .course-list__list-chapter-item-chapter-meta |
| Chapter Meta Text | .course-list__list-chapter-item-chapter-meta |
| Total Lesson / Chapter Duration | .course-item__list-chapter-duration |
| Chapter Title Arrow 
(arrow icon is rotated to indicate open or closed) | .course-list__list-chapter-item-accordion-icon |
| Lesson Section (all lessons) | .course-list__sublist |
| Lesson Count | .course-list__list-chapter-item-chapter-meta |
| Lesson Duration | .course-item__list-chapter-duration |
| Lesson Item | .course-list .course-list__list-course-item |
| Lesson Title | .course-list__list-course-item-lesson-name |
| Lesson Excerpt | .course-list__list-course-item-lesson-excerpt |
| Lesson progress indicator | .course-list__list-course-item-status |

### Grid Layout Selectors

| Chapter Section (including lessons) | .course-list__grid-chapter-item |
| --- | --- |
| Chapter Section (Title, count & duration only) | .course-list__grid-chapter-item-header |
| Chapter Title Text | .course-list__grid-chapter-item-chapter-name |
| Chapter Meta Container | .course-list__grid-chapter-item-chapter-meta |
| Chapter Meta Text | .course-list__grid-chapter-item-chapter-meta |
| Total Lesson / Chapter Duration | .course-item__grid-chapter-duration |
| Chapter Title Arrow 
(arrow icon is rotated to indicate open or closed) | .course-list__grid-chapter-item-accordion-icon |
| Lesson Section (all lessons) | .course-list__sublist |
| Lesson Count | .course-list__grid-chapter-item-chapter-meta |
| Lesson Duration | .course-item__grid-chapter-duration |
| Lesson Item | .course-list .course-list__grid-course-item |
| Lesson Title | .course-list__grid-course-item-lesson-name |
| Lesson Excerpt | .course-list__grid-course-item-lesson-excerpt |
| Lesson progress indicator | .course-list__grid-course-item-status |

### 📔 Lesson Page Selectors

| Complete & Continue Button
(*tertiary button style by default*) | .course-item__next-lesson-button |
| --- | --- |
| Next Lesson Button 
(*shown after lesson is marked as completed; tertiary button style by default)* | .course-item__next-lesson-button[data-is-complete]  |
| Lesson Video | .course-item__video-container |
| Video: play button | .video-player .plyr--video .plyr__control--overlaid |
| Lesson Video: Current Time | .plyr__controls__item .plyr__time--current plyr__time |
| Lesson Video: Total Time | .plyr__controls__item .plyr__time--duration plyr__time |
| Lesson Info 
(*displayed below video*) | .course-item__intro |
| Chapter Text | .course-item__chapter-title |
| Lesson Title | .course-item__lesson-title |
| Lesson Footer Section | .course-item__footer |
| Next Lesson Button  (bottom of page)
(*shown after lesson is marked as completed; tertiary button style by default)* | .course-item__footer .course-item__next-lesson-button |

### 🧭 Course Navigation / Sidebar Selectors

| Sidebar (closed) | .course-item__side-nav-toggle-button-desktop [aria-expanded=”false”] |
| --- | --- |
| Sidebar (open) | .course-item__side-nav-toggle-button-desktop [aria-expanded=”false”] |
| Sidebar background (open) | .course-item__side-nav-content |
| Sidebar Progress bar | .course-item__side-nav-progress-bar-container |
| Sidebar Progress bar: percentage complete | .course-item__progress-bar-text .course-item__side-nav-progress-bar-percentage |
| Sidebar Progress bar: percentage complete bar fill | .course-item__side-nav-progress-bar |
| Sidebar Progress bar: progress text | .course-item__side-nav-progress-bar-label |
| Sidebar Chapter Section (including lessons) | .course-item__side-nav-chapter-container |
| Sidebar Chapter Section 
(title, count & duration only) | .course-item__side-nav-chapter-header |
| Sidebar Chapter Title | .course-item__side-nav-chapter-title |
| Sidebar Lesson Count | .course-item__side-nav-chapter-metadata |
| Sidebar Chapter Duration | .course-item__side-nav-chapter-duration |
| Sidebar Lesson Section | .course-item__side-nav-chapter-lessons |
| Sidebar Lesson Thumbnail | .course-item__side-nav-thumbnail |
| Sidebar Thumbnail Video Play Icon | .course-item__video-player-icon-container |
| Sidebar Lesson Title | .course-item__side-nav-link-title |
| Sidebar Lesson Duration | .course-item__side-nav-lesson-metadata |
| Sidebar Lesson progress indicator | .course-item__side-nav-checkbox-container |
| Sidebar: Current Lesson section | .course-item__side-nav-segment .course-item__side-nav-lesson active |

### 🎨 **Lesson Style Snippets**

- Hide the next lesson button on the final lesson by installing this code in a code block on the final lesson page.
    
    ```css
    .course-item__next-lesson-button[data-is-complete] {
    display:none!important
    }
    ```
    
- Replace the Complete & Continue / Next Lesson Button Text
    
    ```css
    /* complete & continue */
    .course-item__next-lesson-text--incomplete{
    font-size:0;
    }
    .course-item__next-lesson-text--incomplete:after{
    font-size:1rem;
     content:"NEXT SESSION"}
    
    /* next lesson */
    .course-item__next-lesson-text--complete{
    font-size:0;
    }
    .course-item__next-lesson-text--complete:after{
    font-size:1rem;
     content:"NEXT SESSION"
    }
    ```
    
- 9:16 video left; lesson title right (desktop only)
    
    ```css
    @media only screen and (min-width: 788px){ 
      .course-item__lesson-content{
        display:flex
      }
    .course-item__video-container{
      width:40%!important;
      margin-left:5%
    }
    .course-item__intro{
     display:flex;
     flex-direction:column;
     justify-content:center
    }
    }
    ```
    
- 9:16 video right; lesson title left (desktop only)
    
    ```css
    @media only screen and (min-width: 788px){ 
      .course-item__lesson-content{
        display:flex
      }
    .course-item__video-container{
       width:40%!important;
       margin-right:5%;
       order:2
    }
    .course-item__intro{
      display:flex;
      flex-direction:column;
      justify-content:center
    }
    }
    ```
    

### 🎨 **Sidebar Style Snippets**

- Hide the video icon that shows up over a thumbnail
    
    ```jsx
    .course-item__video-player-icon-container{
    display:none
    }
    ```
    
- Create rounded thumbnails
    
    ```css
    .course-item__side-nav-thumbnail{
    border-radius: 50%!important;
    }
    ```
    
- Hide the thumbnails
    
    ```css
    .course-item__side-nav-thumbnail{
    display:none!important;
    }
    ```
