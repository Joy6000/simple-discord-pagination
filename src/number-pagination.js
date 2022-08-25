const { placeHolderEmbeds } = require('./utils')
const { Message, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')

class numberedPagination {
    constructor(options = {
        client: {},
        channel: {},
        embeds: [],
        timeout: 60000
    }) {
        this.client = options.client
        this.channel = options.channel
        this.embeds = options.embeds
        this.timeout = options.timeout
    }

    /**
     * No need to pass anything in here!!
     * Up to 10 pages!
     * @returns Message
     */
    async paginate() {
        try {
            let {client, channel, embeds, timeout} = this
            if (!client) return console.warn('Simpler Discord Pagination > Missing Client!')
            if (!channel) return console.warn('Simpler Discord Pagination > Missing Channel!')
            if (!embeds) embeds = placeHolderEmbeds
            if (embeds.length > 10) embeds.length = 10;

            let allButtons = [];
            let index;

            for (index = 0; index < embeds.length; index++) {
                let idName = index + 1
                allButtons.push(
                    new ButtonBuilder()
                        .setCustomId(idName.toString())
                        .setLabel(`Page ${idName}`)
                        .setStyle(ButtonStyle.Primary)
                )
            }
            const row = new ActionRowBuilder().addComponents(allButtons)
            const msg = await channel.send({embeds: [embeds[0]], components: [row]})

            client.on('interactionCreate', (int) => {
                const numbers = [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '9',
                    '10'
                ]
                numbers.forEach(number => {
                    if (parseInt(int.customId) === number) return
                })
                const newIndex = parseInt(int.customId) - 1
                int.update(int.message.edit({embeds: [embeds[newIndex]], components: [row]}))
            })

        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = numberedPagination