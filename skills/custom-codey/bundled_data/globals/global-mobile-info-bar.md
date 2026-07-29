# Mobile Info Bar

Type: Global Elements
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

To turn on this premium feature, navigate to *Settings > Mobile Information Bar*

A premium feature for business and commerce plans, mobile info bars display information about your business above the content on your site specifically on mobile devices.

## Selectors

| Mobile Info Bar Background | .sqs-mobile-info-bar-triggers |
| --- | --- |
| All Mobile Info Bar Icons | .sqs-mobile-info-bar-trigger-icon |
| All Mobile Info Bar Text Labels | .sqs-mobile-info-bar-trigger-label |
| Email Icon | .sqs-mobile-info-bar-trigger[data-type="contactEmail"] 
.sqs-mobile-info-bar-trigger-icon |
| Email Text | .sqs-mobile-info-bar-trigger[data-type="contactEmail"] 
.sqs-mobile-info-bar-trigger-label |
| Phone Icon | .sqs-mobile-info-bar-trigger[data-type="contactPhoneNumber"] 
.sqs-mobile-info-bar-trigger-icon |
| Phone Text | .sqs-mobile-info-bar-trigger[data-type="contactPhoneNumber"] .sqs-mobile-info-bar-trigger-label |
| Map Icon | .sqs-mobile-info-bar-trigger[data-type="location"] 
.sqs-mobile-info-bar-trigger-icon |
| Map Text | .sqs-mobile-info-bar-trigger[data-type="location"] 
.sqs-mobile-info-bar-trigger-label |
| Open Map: Business Name | .sqs-mobile-info-bar-overlay-content 
.sqs-mobile-info-baraddress [data-type="addressTitle"] |
| Open Map: Business Address | .sqs-mobile-info-bar-overlay-content 
.sqs-mobile-info-baraddress |
| Open Map: Map Close Icon | .sqs-mobile-info-bar-overlay-close |
| Hours Icon | .sqs-mobile-info-bar-trigger[data-type="businessHours"] 
.sqs-mobile-info-bar-trigger-icon |
| Hours Text | .sqs-mobile-info-bar-trigger[data-type="businessHours"] 
.sqs-mobile-info-bar-trigger-label |
| Hours Menu: Background | .sqs-mobile-info-bar-overlay |
| Hours Menu: Day Label | .sqs-business-hours-day-label |
| Hours Menu: Closed Text | .sqs-business-hours-day .closed |
| Hours Menu: Hours Text | .sqs-business-hours-day |
| Hours Menu: “We are currently” | .sqs-business-hours-store |
| Hours Menu: “Open/Closed”  | .sqs-business-hours-store span |

## Style Snippets

- Create a Floating Mobile Info Bar
    
    ```css
    .sqs-mobile-info-bar {
     width: 90%;
     margin:auto; 
     margin-bottom: 5%;
    }
    ```
    
- Use A Custom Image For An Icon In Your Mobile Info Bar
    
    ```css
    .sqs-mobile-info-bar-trigger [data-type="specify-type-from-selector-list] .sqs-mobileinfo-bar-trigger-icon {
     background-image: url(png-url-here); 
     background-size:contain;
    }
    ```
    
    <aside>
    💡 The icon on your mobile info bar is actually an image, not a character, so the color can not be changed using CSS. 
    
    You can replace the image with the following code, adjusting height and width accordingly. 
    
    Be sure to update the data type using the information from the list of selectors above!
    
    </aside>
