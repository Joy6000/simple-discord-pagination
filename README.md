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
        title = 'One'
    }
    const embed2 = {
        title = 'Twi'
    }

    new pagination(embeds: [embed1, embed2], channel).newPagination() // channel is a textchannel object
```
### JavaScript
```js
    const { pagination } = require('simpler-discord-pagination')
    const embed1 = {
        title = 'One'
    }
    const embed2 = {
        title = 'Two'
    }

    new pagination(embeds: [embed1, embed2], channel).newPagination() // channel is a textchannel object
```
# Why use simpler-discord-pagination?
simpler-discord-pagination simplified the traditional discord-pagination. We did this by utilizing a class, which is essentially a fancy function.
# FAQ
## No FAQ Yet! Contact me on Discord at stop.ts#0894 if you have any questions