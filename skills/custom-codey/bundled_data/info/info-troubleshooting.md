Last Updated: April 23, 2025
# Troubleshooting Tips

**I keep getting a Syntax Error when I try to use one of your codes.**

> This means that there is a character in your code that the browser doesn’t understand. It might be a misspelling or the wrong symbol.
> 
> 
> You will see this when you start typing code and it stays there until you close your final bracket.
> 
> Double check that your code to make sure you don't have any extra spaced, dashes, or dots, and that you are using {curly brackets} where you need to, and not (parentheses) or [square brackets] and make sure you use semi colons ; colons : and commas, in the right places.
> 
> Semi colons separate code properties, commas separate colors and multiple properties in one line, and colons separate the property name from the property features.
> 
> For additional info, check out this guide to CSS symbols:
> 
> [CSS Symbol Glossary](https://www.notion.so/CSS-Symbol-Glossary-12eb9ed1d81645fd9f915d6ebff7fe82?pvs=21)
> 

**I am copying code from one of your tutorials and I’m getting an error.**

> PDF readers can sometimes skip or add dashes, dots, and spaces because it thinks it’s irrelevant formatting and not actual computer code. Make sure that the code you copied from a PDF matches the code you pasted, paying close attention to dashes like this - and semicolons like this ;
> 

**I used the *exact* same code from your content, and nothing happened!**

> Make sure the code you are using is the right one for your theme and version. Squarespace 7 sites are built in different themes and don't use the same code names for the same features. Squarespace 7.1 sites also have some unique code names. If you don't know what version you are using, check out this article for help.
> 

**I’m using the correct code for the correct version, and it’s still not working.**

> Is your code important enough? Sounds like a silly question but it does matter! When you add custom CSS, you’re giving a browser a second set of instructions to follow, and it might say "no thanks - I'm going with the first one I see here, not your custom code"
> 
> 
> You can overwrite that by adding the text **!important** before the ; in your code.
> 
> Text, buttons, and font changes usually need the **!important** added to the code, but sometimes other elements do too.
> 
> If you’re following a tutorial exactly like the video, but your site doesn't change the way mine does, try making it **!important**.
> 
> Here is an example of a code that would change a button color & font size that needs the !important added to it:
> 
> .sqs-block-button-element { 
> background-color: blue!important;
>  font-size: 30px!important
> }
>
