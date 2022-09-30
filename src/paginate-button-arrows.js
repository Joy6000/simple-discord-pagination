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
        this.pageDisplay = options.pageDisplay
    }

    /**
     * No need to pass anything in here!!
     * @returns Message
     */
    async paginate() {
        let {client, channel, embeds, timeout, pageDisplay} = this
        if (!client) return console.warn('Simpler Discord Pagination > Missing Client!')
        if (!channel) return console.warn('Simpler Discord Pagination > Missing Channel!')
        if(!pageDisplay) pageDisplay = false;

        if(pageDisplay) {
            for (const embed of embeds) {
                if (embed.footer) {
                        embed.footer.text += ` • Page ${embeds.indexOf(embed) + 1}`
                } else {
                    embed.footer = {
                        text: `Page ${embeds.indexOf(embed) + 1}`
                    }
                }
            }
        }

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
        row.components[0].setDisabled(true)

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

            if(index === embeds.length - 1) {
                row.components[1].setDisabled(true)
            }
            if(index < embeds.length - 1) {
                row.components[1].setDisabled(false)
            }
            if(index === 0) {
                row.components[0].setDisabled(true)
            }
            if (index > 0) {
                row.components[0].setDisabled(false)
            }
            int.update({embeds: [embeds[index]], components: [row]})
            return {client, channel, embeds, timeout, msg}

        })
    }
}

module.exports = buttonPagination