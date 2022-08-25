const { placeHolderEmbeds } = require('./utils')
class arrowPagination {
    constructor(options = {
        emojis: ['⬅', '➡'],
        embeds: placeHolderEmbeds,
        channel: {},
        timeout: 60000
    }) {
        this.embeds = options.embeds
        this.emojis = options.emojis
        this.channel = options.timeout
        this.timeout = options.timeout
    }
    /**
     * No need to pass anything in here!!
     */
    async paginate() {
        const { embeds, emojis, channel, timeout } = this;
        let index = 0;
        if (!channel) console.warn('Simpler Discord Pagination > Missing Channel!')
        const msg = await channel.send({ embeds: [embeds[index]] })
        emojis.forEach(emoji => msg.react(emoji))
        const filter = (reaction, user) => {
            emojis.forEach(emoji => {
                return reaction.emoji.name === emoji
            })
        }
        const collector = await msg.createReactionCollector({ filter, time: timeout })
        collector.on('collect', (reaction, user) => {
            if (index === 0) index = embeds.length
            if (index > embeds.length) index = 0
            if (reaction.emoji.name === emojis[0]) {
                reaction.users.remove(user)
                index = index - 1
            }
            if (reaction.emoji.name === emojis[1]) {
                reaction.users.remove(user)
                index = index + 1
            }
            msg.edit({ embeds: [embeds[index]] })
        })
    }

}

module.exports = arrowPagination