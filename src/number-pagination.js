const { Message, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')

class numberedPagination {
    constructor(options = {
        client: {},
        channel: {},
        embeds: [],
        timeout: 60000,
        pageDisplay: false
    }) {
        this.client = options.client
        this.channel = options.channel
        this.embeds = options.embeds
        this.timeout = options.timeout
        this.pageDisplay = options.pageDisplay // Functionality Will Be Added 3.1.0
    }

    /**
     * No need to pass anything in here!!
     * Up to 10 pages!
     * @returns Message
     */
    async paginate() {
        try {
            let {client, channel, embeds} = this
            if (!client) return console.warn('Simpler Discord Pagination > Missing Client!')
            if (!channel) return console.warn('Simpler Discord Pagination > Missing Channel!')
            if (embeds.length > 10) embeds.length = 10;

            let allButtons = [];
            let index;

            for (index = 0; index < embeds.length; index++) {
                let idName = index + 1
                allButtons.push(
                    new ButtonBuilder()
                        .setCustomId("utils-" + idName.toString())
                        .setLabel(`Page ${idName}`)
                        .setStyle(ButtonStyle.Primary)
                )
            }

            let rowArray = []
            for (const chunked of allButtons.chunk(5)) {
                rowArray.push(new ActionRowBuilder().addComponents(chunked))
            }


            channel.send({
                embeds: [embeds[0]],
                components: rowArray
            })


            client.on('interactionCreate', (int) => {
                if (!int.isButton()) return;


                const regex = /utils-\b(0?[1-9]|1[0-9]|2[0-5])\b/gm


                if (!int.customId.match(regex)[0]) return;

                const newIndex = parseInt(int.customId.slice(6)) - 1
                int.update(int.message.edit({embeds: [embeds[newIndex]], components: rowArray}));
            })

        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = numberedPagination