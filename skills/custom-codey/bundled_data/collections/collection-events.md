# Events

Type: Collections
Compatible Versions: 7, 7.1
Last Updated: April 23, 2025

Event collection pages in Squarespace allow you to create specific events tied to a date, time, and location. 

Like blog posts, these can be scheduled in advanced and made public on a specific date.

## Selectors

## Individual Event Page

| Back to all events list link | .eventitem-backlink |
| --- | --- |
| Event Title | .eventitem-title |
| All Event Metadata | .eventitem-meta |
| Event Date | .event-date |
| Event Location | .eventlist-meta-address |
| Event Location - Title Only | .eventitem-meta-address-line--title |
| Event Share - iCal | .eventitem-meta-export-ical |
| Event Share - Google | .eventitem-meta-export-google |
| Event Tags | [data-content-field="tags"] a |
| Event Categories | [data-content-field="categories"] a |
| Next Event Pagination | .item-pagination-title |
| Next Event Date | .events-item-pagination-date |
| Next Event Pagination Symbol | .item-pagination[data-collection-type^="events"] .item-pagination-icon svg |
| Event Map Link | .eventitem-meta-address-maplink |

<aside>
💡 **PRO TIP** 
The event page pagination symbol is an SVG icon and not a character. 
To change its color, use the property stroke.  For example: 

**.item-pagination[data-collection-type^="events"] .item-pagination-icon svg {background:green; stroke:purple}**

</aside>

### Version 7.1 Only

| Event Time  | .event-time-localized |
| --- | --- |
| Event Time - Start | .event-time-localized-start |
| Event Time - End | .event-time-localized-end |

### Version 7 Only

| Event Time  | .event-time-12hr |
| --- | --- |
| Event Time - Start | .event-time-12hr-start |
| Event Time - End | .event-time-12hr-end |

## Events List Page

| Individual Event | .eventlist-event |
| --- | --- |
| Event Thumbnail | .eventlist-column-thumbnail |
| Event Title | .eventlist-title .eventlist-title-link |
| Event Date | .eventlist-meta-date |
| Event Date - Month | .eventlist-datetag-startdate--month |
| Event Date - Day | .eventlist-datetag-startdate--day |
| Event Location | .eventlist-meta-address |
| Event Map Link | .eventlist-meta-address-maplink |
| Event Excerpt | .eventlist-excerpt |
| View Event Button | .eventlist-button |
| Event Share - iCal | .eventlist-meta-export-ical |
| Event Share - Google | .eventlist-meta-export-google |

### Version 7.1 Only

| Event Time  | .event-time-localized |
| --- | --- |
| Event Time - Start | .event-time-localized-start |
| Event Time - End | .event-time-localized-end |

### Version 7 Only

| Event Time  | .event-time-12hr |
| --- | --- |
| Event Time - Start | .event-time-12hr-start |
| Event Time - End | .event-time-12hr-end |

## Snippets

### Customize Event Title Text on Event List Page

```css
.eventitem-title, .eventlist-title {
 color:purple!important;
 font-size:50px!important;
 font-family:serif!important
}
```

### Keep Event Info at the Top of the Individual Event Page

```css
.eventitem-title {
 position:sticky!important;
 top: 5vh!important
}

.eventitem-meta{
 position:sticky!important;
 top: 15vh!important
}

.event-meta-addtocalendar-container.eventitem-meta{
 position: sticky!important;
 top: 25vh!important
}
```

### Change view event button text

```css
.eventlist-button {
  font-size:0!important
}
.eventlist-button:after{
  content:"LEARN MORE →";
  font-size:16px!important
}
```

### Change view event button style, including custom hover effect

```css
.eventlist-button{
font-size:16px!important;
padding: 5px 15px!important;
border-radius: 50px!important;
margin-top: 15px;
background: #e5f5f6!important;
color: #333!important;
border: 1px solid #333!important;
transition: all 1s!important
}
.eventlist-button:hover{
background:#333!important;
color: #e5f5f6!important;
opacity: 1!important
}
```

### Event list: thumbnail on right

```css
.eventlist-column-thumbnail{
  order:2;
}
.eventlist-column-info{
  padding-right:20px
}
```
