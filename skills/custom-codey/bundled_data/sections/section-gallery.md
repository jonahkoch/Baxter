# Gallery Sections

Type: Page Sections
Compatible Versions: 7.1
Last Updated: April 23, 2025

Gallery sections feature collection of images that can be displayed in six different ways. These images can have descriptions and link to any URL. 

These selectors will help you target the content based on section type.

## Selectors

## Grid: Simple

| Gallery Selector | .gallery-grid-item |
| --- | --- |
| Image | .gallery-grid-item img |
| Caption | .gallery-grid-item .gallery-caption-content |
| Lightbox Overlay | .gallery-lightbox-background |
| Arrow - Left | .caret-left-icon--small |
| Arrow - Right | .caret-right-icon--small |
| Lightbox Close | .gallery-lightbox-close-btn-icon |

## Grid: Strips

| Gallery Selector | .gallery-strips-item  |
| --- | --- |
| Image | .gallery-strips-item img |
| Caption | .gallery-strips-item .gallery-caption *  |

## Grid: Masonry

| Gallery Selector | .gallery-masonry-item |
| --- | --- |
| Image | .gallery-masonry-item img |
| Caption | .gallery-masonry-item .gallery-caption *  |

## Slideshow: Full

| Gallery Selector | .gallery-fullscreen-slideshow-item |
| --- | --- |
| Image | .gallery-fullscreen-slideshow-item img |
| Caption - container | .gallery-fullscreen-slideshow-item .gallery-caption *  |
| Caption - wrapper | .gallery-fullscreen-slideshow-item .gallery-caption-wrapper |
| Caption - content | .gallery-fullscreen-slideshow-item .gallery-caption-content |
| Arrow - Left | .gallery-fullscreen-control-btn .caret-left-icon--small |
| Arrow - Right | .gallery-slideshow-control-btn .caret-right-icon--small |

## Slideshow: Reel

| Gallery Selector | .gallery-reel-item  |
| --- | --- |
| Image | .gallery-reel-item img |
| Caption | .gallery-reel-item .gallery-caption *  |
| Arrow - Left | .gallery-reel-control-btn .caret-left-icon--small |
| Arrow - Right | .gallery-reel-control-btn .caret-right-icon--small |

## Slideshow: Simple

| Gallery Selector | .gallery-slideshow-item |
| --- | --- |
| Center Image | .gallery-slideshow-item img |
| Reel Thumbnails | .gallery-slideshow-item .gallery-caption *  |
| Caption | .gallery-slideshow-control-btn svg  |
| Arrow - Left | .gallery-slideshow-control-btn .caret-left-icon--small |
| Arrow - Right | .gallery-slideshow-control-btn .caret-right-icon--small |

## Snippets

- Add a Background Color to a Gallery Caption/Description
    
    ```css
    .gallery-caption {background:#fff}
    ```
    
- Center Gallery Caption/Description Text
    
    ```css
    .gallery-caption p {text-align:center}
    ```
    
- Gallery Hover Effect: Image Zoom On Hover
    
    ```css
    (image selector):hover{
     height:100%!important; 
     width:100%!important; 
     transform:Scale(1.2)!important; 
     overflow:hidden!important;
    } 
    (gallery-selector){
     overflow:hidden!important
    }
    ```
    
- Gallery Hover Effect: Image Zoom Out On Hover
    
    ```css
    (image selector)img{
     height:100%!important;
     width:100%!important; 
     transform:Scale(1.2); 
     overflow:hidden!important;
    } 
    (image selector):hover{
     transform:scale(1)
    } 
    (gallery-selector){
     overflow:hidden!important
    }
    ```
    
- Gallery Hover Effect: Smooth Zoom Transition
    
    ```css
    (image selector):hover{
     height:100%!important; 
     width:100%!important; 
     transform:Scale(1.2); 
     Overflow:hidden!important; 
     transition-duration:1s
    } 
    (gallery-selector){
     overflow:hidden!important
    }
    ```
    
- No Cropping of Gallery Image
    
    ```css
    (gallery selector) img {
    object-fit:contain!important
    }
    ```
    
- Remove padding between the image and the caption
    
    ```css
    .gallery-caption{padding-top:0px}
    ```
    
- Slideshow reel: move arrows closer to images
    
    ```css
    .gallery-reel-controls{
    margin-top:-130px!important
    }
    ```
    
- Slideshow reel: show caption over grey image on hover
    
    ```css
    .gallery-reel[data-show-captions="true"] .gallery-caption-reel{
      top:40%;
      opacity:0!important;
    }
    .gallery-reel-item:hover .gallery-caption-reel{
      opacity:1!important;
    }
    .gallery-reel-item:hover img{filter:grayscale(1);opacity:.3;
    transition:all 2s}
    .gallery-reel-item *{
      transition:all 2s
    }
    ```
    
- Full width slideshow with thumbnails
    
    *For this code to work, make sure you have set the design to **Slideshow: Simple***  
    
    ```jsx
    .gallery-slideshow[data-controls-location="side"] .gallery-slideshow-list, .gallery-slideshow, .gallery-slideshow-wrapper{
      left:0!important;
      right:0!important;
      padding:0!important;
      margin:0!important;
      width:100vw;
    }
    .gallery-slideshow-item img{
      object-fit:cover!important
    }
    /* optional: shows thumbnails on mobile */
    .gallery-slideshow-thumbnails{
      display:block!important
    }
    ```
    
- 1:1 ratio slideshow simple gallery
    
    ```css
    .gallery-slideshow-item img{
    object-fit:cover!important;
    height:80vh!important;
    width:80vh!important;
    margin:auto!important
    }
    ```
    
- Caption overlay for full width slideshow autoplay
    
    ```css
    .gallery-caption-fullscreen-slideshow{
      background:#fff!important; /* optional */
      height:auto!important;
      margin-top:-40vh;
    }
    .gallery-caption-fullscreen-slideshow p{
      font-size:2rem!important
    }
    ```
