const { Message, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')
class buttonPagination {
    constructor(options = {
        client: {},
        embeds: [],
        channel: {},
        timeout: 60000,
        pageDisplay: false
    }) {
        this.client = options.client
        this.channel = options.channel
        this.timeout = options.timeout
        this.embeds = options.embeds
        this.pageDisplay = options.pageDisplay // Functionality Will Be Added 3.1.0
    }

    /**
     * No need to pass anything in here!!
     * @returns Message
     */
    async paginate() {
        let {client, channel, embeds, timeout} = this
        if (!client) return console.warn('Simpler Discord Pagination > Missing Client!')
        if (!channel) return console.warn('Simpler Discord Pagination > Missing Channel!')
        let index = 0;
        const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
        const {Primary} = ButtonStyle
        const buttons = [
            new ButtonBuilder()
                .setCustomId('back')
                .setLabel('Back')
                .setStyle(Primary),
            new ButtonBuilder()
                .setCustomId('forward')
                .setLabel('Forward')
                .setStyle(Primary)
        ]

        const row = new ActionRowBuilder().addComponents(buttons)
        const msg = await channel.send({embeds: [embeds[0]], components: [row]})

        client.on('interactionCreate', (int) => {
            if (!int.isButton() && !int.message.author.id !== client.id) return
            if (int.customId === 'back') {
                if (index === 0) index = embeds.length
                if (index > 0) {
                    index = index - 1
                }
            }
            if (int.customId === 'forward') {
                if (index < embeds.length) {
                    index = index + 1
                }
                if (index === embeds.length) index = 0

            }
            int.update({embeds: [embeds[index]], components: [row]})
            return {client, channel, embeds, timeout, msg}

        })
    }
}

module.exports = buttonPagination