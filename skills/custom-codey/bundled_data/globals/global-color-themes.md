# Color Themes

Type: Global Elements
Compatible Versions: 7.1
Last Updated: April 23, 2026

You can specify a custom code change for a specific color theme in Version 7.1 as long as you start the code with the corresponding theme attribute.

For example, if I wanted to change **heading four** text on any content assigned the **Bright 1** color theme, my code would look like this:

```css
**[data-section-theme="bright"] h4 {text-transform: uppercase;}**
```

Neat right? Here are the code names for the ten different color themes currently available. These are changing to a different type of code known as an **attribute** selector in April 2024. You’ll find the original list below.

- Attribute List (in use as of April 2024)
    
    
    | Lightest 1 | [data-section-theme="white"] |
    | --- | --- |
    | Lightest 2 | [data-section-theme="white-bold"] |
    | Light 1 | [data-section-theme="light"] |
    | Light 2 | [data-section-theme="light-bold"] |
    | Bright 1 | [data-section-theme="bright-inverse"] |
    | Bright 2 | [data-section-theme="bright"] |
    | Dark 1 | [data-section-theme="dark"] |
    | Dark 2 | [data-section-theme="dark-bold"] |
    | Darkest 1 | [data-section-theme="black"] |
    | Darkest 2 | [data-section-theme="black-bold"] |
- Original Class Selector List
    
    
    | Lightest 1 | .white.page-section |
    | --- | --- |
    | Lightest 2 | .white-bold.page-section |
    | Light 1 | .light.page-section |
    | Light 2 | .light-bold.page-section |
    | Bright 1 | .bright-inverse.page-section |
    | Bright 2 | .bright.page-section |
    | Dark 1 | .dark.page-section |
    | Dark 2 | .dark-bold-bold.page-section |
    | Darkest 1 | .black.page-section |
    | Darkest 2 | .black-bold.page-section |
