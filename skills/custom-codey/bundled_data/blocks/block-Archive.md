# Archive Block

Type: Content Block
Compatible Versions: 7, 7.1
Last Updated: April 23, 2026

## About

A **Squarespace archive block** can be used to display a list of content in an existing collection.

**Archive blocks** are a fantastic way to neatly list and link to your blog posts, events, or products. Here's what you can do with them:

- **Create organized lists:** Easily group your content by tags, categories, authors, or dates.
- **Add extra navigation:** Put archive blocks in footers, on the side of a blog post or page, or in any spot you like for quick access to additional content on your site.
- **Stay up-to-date:** Your archive block automatically updates when you add, change, or remove content.

**Important to know:**

- Archive blocks are specifically for blog posts, products, and events. You wont be able to link to a portfolio, project, or video collection.
- Archive blocks only show text and wont display images, including thumbnails. If you want to share a list of collection content that includes images, you should consider a summary block instead of an archive block. To learn more about this feature, check out [the beginner’s guide to Squarespace summary blocks.](https://insidethesquare.co/tutorials/summary-block)

**What you can customize about the archive block using Squarespace**

- You can choose between three layouts (examples below): dropdown, list, and index.
- The text style will match your paragraph 2 style and can not be changed using the site editor.
- The index layout can be adjusted to multiple columns.
- You can display an automatic count of the items in a group when you are using the index layout.

## Selectors

| Any Archive Block Style | .sqs-block-archive |
| --- | --- |
| Archive Dropdown | .archive-block-setting-layout-dropdown |
| Archive Dropdown Arrow | .archive-dropdown-toggle-icon:before |
| Archive List | .archive-block-setting-layout-list |
| Archive List Group Count | .archive-block-setting-layout-list .archive-group-count |
| Archive Item Date | .archive-item-date-after |
| Index Layout | .archive-block-setting-layout-index |
| Index Layout Group Title | .archive-block-setting-layout-index .archive-group-name-link |
| Index Layout Item Title | .sqs-block-archive .archive-block-setting-layout-index .archive-item-link |

## Snippets

- Change the font style of archive block group names
    
    ```css
    .archive-group-name-link {
     font-size: 20px;
     font-weight: bolder
    }
    ```
    
- Change the background color and border of the archive block
    
    ```css
    .archive-group-list {
     background: rgba(100,0,100,0.1);
     padding: 15px!important;
     border: 5px solid purple;
     border-radius: 25px
    }
    ```
    
- Add a custom bullet point to archive items
    
    ```css
    .archive-item-link:before {
     content:”→ “
    }
    .archive-group-name-link:before {
     content:”→ “
    }
    ```