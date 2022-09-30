class arrowPagination {
    constructor(options = {
        emojis: ['⬅', '➡'],
        embeds: [],
        channel: {},
        timeout: 60000,
        pageDisplay: false
    }) {
        this.embeds = options.embeds
        this.emojis = options.emojis
        this.channel = options.channel
        this.timeout = options.timeout
        this.pageDisplay = options.pageDisplay // Functionality Will Be Added 3.1.0
    }
    /**
     * No need to pass anything in here!!
     */
    async paginate() {
        this.emojis = ['⬅', '➡']
        const { embeds, emojis, channel, timeout } = this;
        let index = 0;
        if (!channel) console.warn('Simpler Discord Pagination > Missing Channel!')
        const msg = await channel.send({ embeds: [embeds[index]] })
        await msg.react(emojis[0])
        await msg.react(emojis[1])
        const filter = (reaction, user) => {
            return reaction.emoji.name === emojis[0] && !user.bot || reaction.emoji.name === emojis[1] && !user.bot
        }
        const collector = await msg.createReactionCollector({ filter, time: timeout })
        collector.on('collect', (reaction, user) => {

            if (reaction.emoji.name === emojis[0]) {
                reaction.users.remove(user)
                index = index - 1
            }
            if (reaction.emoji.name === emojis[1]) {
                reaction.users.remove(user)
                index = index + 1
            }
            if (index === -1) index = embeds.length
            if (index === embeds.length) index = 0
            msg.edit({ embeds: [embeds[index]] })
        })
        return { embeds, emojis, channel, timeout, msg }
    }

}

module.exports = arrowPagination