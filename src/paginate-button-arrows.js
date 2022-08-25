const { Message, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')
const {placeHolderEmbeds} = require("./utils");
class buttonPagination {
    constructor(options = {
        client: {},
        embeds: [],
        channel: {},
        timeout: 60000
    }) {
        this.client = options.client
        this.channel = options.channel
        this.timeout = options.timeout
        this.embeds = options.embeds
    }

    /**
     * No need to pass anything in here!!
     * @returns Message
     */
    async paginate() {
        let { client, channel, embeds, timeout } = this
        if (!client) return console.warn('Simpler Discord Pagination > Missing Client!')
        if (!channel) return console.warn('Simpler Discord Pagination > Missing Channel!')
        if (!embeds) embeds = placeHolderEmbeds
        let index = 0;
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
            int.update(int.message.edit({embeds: [embeds[index]], components: [row]}))

        })
    }
}

module.exports = buttonPagination