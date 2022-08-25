class pagination {
    constructor(options = {
        embeds: [],
        channel: {},
        emojis: [],
        timeout: 60000,
        client: {}
    }) {
        this.embeds = options.embeds
        this.channel = options.channel
        this.emojis = options.emojis
        this.timeout = options.timeout
        this.buttons = options.buttons
        this.client = options.client
    }
    async newPaginate() {
        try {
            const {embeds, channel, emojis, timeout, buttons, client} = this
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
            } else if (buttons) {
                let currentPage = 0;
                const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
                const buttons = [
                    new ButtonBuilder()
                        .setCustomId('back')
                        .setLabel('Back')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('forward')
                        .setLabel('Forward')
                        .setStyle(ButtonStyle.Primary)

                ]

                const row = new ActionRowBuilder().addComponents(buttons)
                const msg = await channel.send({ embeds: [embeds[0]], components: [row] })

                client.on('interactionCreate', (int) => {
                    if (!int.isButton() && !int.message.author.id !== client.id) return
                    if (int.customId === 'back') {
                        if (currentPage === 0) currentPage = embeds.length
                        if (currentPage > 0) {
                            currentPage = currentPage - 1
                        }
                    }
                    if (int.customId === 'forward') {
                        if (currentPage < embeds.length) {
                            currentPage = currentPage + 1
                        }
                        if (currentPage === embeds.length) currentPage = 0

                    }
                    int.reply(int.message.edit({embeds: [embeds[currentPage]], components: [row]}))

                })
            }
        } catch (err) {
            console.log(err)
        }
    }

}
module.exports.pagination = pagination