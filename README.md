# Discord Pagination!
## Getting Started
```js
npm install simpler-discord-pagination
```
## Inside your command
### TypeScript
```ts
    import { pagination } from 'simpler-discord-pagination'
    const embed1 = {
        title: 'One'
    }
    const embed2 = {
        title: 'Two'
    }

    new pagination({
        embeds: [embded1, embed2],
        channel: {}, // Channel Object Goes Here,
        emojis: [],// There is no need to use this. Only if you want to change them. The emojis are built into the package.
        timeout: 60000,// Must be an Integer. No need for this either. It's built in too. Change it if you want.
        buttons: Boolean, //True or False goes here. Automatic to false.
        client: Discord-Client // please pass in your discord.js client to make use of buttons.
    }).newPagination() 
```
### JavaScript
```js
    const { pagination } = require('simpler-discord-pagination')
    const embed1 = {
        title: 'One'
    }
    const embed2 = {
        title: 'Two'
    }

    new pagination({
        embeds: [embded1, embed2],
        channel: {}, // Channel Object Goes Here.
        emojis: [],// There is no need to use this. Only if you want to change them. The emojis are built into the package.
        timeout: 60000,// Must be an Integer. No need for this either. It's built in too. Change it if you want.
        buttons: Boolean, //True or False goes here. Automatic to false. 
        client: Discord-Client // please pass in your discord.js client to make use of buttons.
    }).newPagination() 
```
# Why use simpler-discord-pagination?
simpler-discord-pagination simplified the traditional discord-pagination. We did this by utilizing a class, which is essentially a fancy function.
# FAQ
## No FAQ Yet! Contact me on Discord at stop.ts#0894 if you have any questions