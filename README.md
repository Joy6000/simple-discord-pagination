# Table of Contents
- [Main](#discord-pagination)
  - [Getting Started](#getting-started)
  - [Clean Updating](#clean-updates)
  - [Inside Your Command](#inside-your-command)
- [Why Use This Package?](#why-use-simpler-discord-pagination)
  - [RLP](#RLP)
  - [BIP](#BIP)
  - [NBIP](#NBIP)
- [FAQ](#FAQ)
- [TODO](#TODO)

# Discord Pagination!
## Getting Started
```
npm i simpler-discord-paginate
```
## Clean Updates
```
npm r simpler-discord-paginate
npm i simpler-discord-paginate
```
## Inside your command
```js
    const paginator = require('simpler-discord-paginate')

    // must have a Discord.js client
    let embeds = [
        {
            title: 'First'
        },
        {
            title: 'Second'
        },
        {
            title: 'Third'
        }
    ]
    // Legacy Reaction Pagination
    new paginator.arrowPagination({
        embeds: embeds,
        channel: {}, // A discord channel object. Such as Interaction.channel or Message.channel
        emojis: [], //uneeded! Emojis are provided for you but if you wish to change them you can. Maximum two.
        timeout: Int, // Also uneeded! You may change this though the default is 60 seconds.
        pageDisplay: true // Will add the page number to the footer. Don't worry, your custom set footer is preserved. Leave blank if you do not want this.
    }).paginate() // that's it!!


    // Button Interaction Pagination
    // No more complicated as the last! For you, anyways.

    new paginator.buttonPagination({
        embeds: embeds,
        channel: {}, // Discord channel object like the legacy one.
        client: {}, // Your discord Client instance!!! 
        timeout: Int, //Uneeded like the last time. No need to call this at all other than to change the amount of time before buttons cease collecting.
        pageDisplay: true // Will add the page number to the footer. Don't worry, your custom set footer is preserved. Leave blank if you do not want this.

    }).paginate() // done !!

    // Numbered Button Interaction Pagination
    // Actually the lest complicated one on my end. 
    // Still not complicated at all for you!!!

    new paginator.numberedPagination({
        client: {}, // Discord.js client instance!
        channel: {}, // Channel object! This is where the message is sent btw.
        embeds: embeds,
        timeout: Int, // uneeded
        pageDisplay: true // Will add the page number to the footer. Don't worry, your custom set footer is preserved. Leave blank if you do not want this.

    }).paginate() // this is literally everything required from you!! I handle the rest.
```
# Why use simpler-discord-pagination?
The simpler-discord-pagination package is an extremely powerful npm package used for discord.js. Our goal is to make pagination easier and simple. 
Currently, we support **3** different types of paginations. A **R**egular **L**egacy **P**agination (RLP), a **B**utton **I**nteraction **P**agination (BIP),
and a **N**umbered **B**utton **I**nteraction **P**agination (NBIP)
### RLP
RLP will use reaction arrows to navigate the pages
### BIP
BIP uses buttons to navigate the pages
### NBIP 
Uses up to 25 buttons to navigate the pages. Can be used to easily and quickly go from Page 3 > Page 7.
# FAQ
## No FAQ Yet! Contact me on Discord at stop.ts#0894 if you have any questions
# TODO 
 - Add timeout functionality (3.2.0)
 - Make paginations not exclusive to embeds. (4.0.0)