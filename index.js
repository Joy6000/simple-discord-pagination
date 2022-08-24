class pagination {
    constructor(embeds = [], channel = {}, emojis = ['⬅', '➡'], timeout = 60000, buttons = false) {
        this.embeds = embeds
        this.channel = channel
        this.emojis = emojis
        this.timeout = timeout
        this.buttons = buttons
    }
    async newPaginate() {
        try {
            const {embeds, channel, emojis, timeout, buttons} = this
            if (buttons === false) {
                const msg = await channel.send({embeds: [embeds[0]]})
                emojis.forEach(emoji => msg.react(emoji))
                let currentPage = 0;
                const filter = (reaction, user) => {
                    return reaction.emoji.name === emojis[0] && !user.bot || reaction.emoji.name === emojis[1] && !user.bot
                }
                const collector = await msg.createReactionCollector({filter, time: timeout})
                collector.on('collect', (reaction, user) => {
                    reaction.users.remove(user)
                    switch (true) {
                        case reaction.emoji.name === emojis[1]:
                            currentPage = currentPage + 1
                            break;
                        case reaction.emoji.name === emojis[0]:
                            currentPage = currentPage - 1
                            break;

                    }
                    if (currentPage === -1) currentPage = embeds.length
                    if (currentPage === embeds.length) currentPage = 0
                    console.log(currentPage)
                    msg.edit({embeds: [embeds[currentPage]]})
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

}
module.exports.pagination = pagination