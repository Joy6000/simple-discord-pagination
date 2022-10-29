const { Message, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')
const PaginationTypes = {
    FLAGS: {
        Embed: 0,
        Message: 1
    }
}

class numberedPagination {
    constructor(options = {
        client: {},
        channel: {},
        type: 0,
        embeds: [],
        messages: [],
        disabled: false,
        pageDisplay: false
    }) {
        this.client = options.client
        this.channel = options.channel
        this.embeds = options.embeds || null
        this.messages = options.messages || null
        this.pageDisplay = options.pageDisplay
        this.type = options.type || 0
        this.disabled = options.disabled
        this.allButtons = [];

    }


    async paginate() {

        let { client, channel, embeds, messages, type, pageDisplay, allButtons, disabled } = this
        if (!client) console.warn('Simpler Discord Pagination > Missing Client!')
        if (!channel) console.warn('Simpler Discord Pagination > Missing Channel!')

        let overlordType = type === 0 ? embeds : messages

        if(type > 1) {
            throw new TypeError(`Expected type 0 or 1, received ${type}`)
        }
        if (type === 0 && embeds && !messages && embeds.length > 25) {
            throw new RangeError(`Expected a maximum of 25 pages, got ${embeds.length}`)
        }
        if (type === 0 && !embeds && messages) {
            throw new TypeError(`Mismatched types: Expected array of embeds, got messages`)
        }
        if (type === 1 && messages && messages.length > 25) {
            throw new RangeError(`Expected a maximum of 25 pages, got ${messages.length}`)
        }
        if (type === 1 && !messages  && embeds) {
            throw new TypeError(`Mismatched types: Expected array of strings, got embeds`)
        }
        if(pageDisplay && embeds) {
            for (const embed of overlordType) {
                if (embed.footer) {
                    embed.footer.text += ` • Page ${embeds.indexOf(embed) + 1}`
                } else {
                    embed.footer = {
                        text: `Page ${embeds.indexOf(embed) + 1}`
                    }
                }
            }
        }



        let index;

        for (index = 0; index < overlordType.length; index++) {
            let idName = index + 1
            allButtons.push(
                new ButtonBuilder()
                    .setCustomId("utils-" + idName.toString())
                    .setLabel(`Page ${idName}`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)
            )
        }

        let rowArray = []
        for (const chunked of allButtons.chunk(5)) {
            rowArray.push(new ActionRowBuilder().addComponents(chunked))
        }

        let toSend;
        let toEdit;

        if(type === 0) {
            toSend = {
                embeds: [overlordType[0]],
                components: rowArray
            }
        } else {
            toSend = {
                content: overlordType[0],
                components: rowArray
            }
        }

        this.componentsSent = toSend.components
        this.msgSent = await channel.send(toSend)


        client.on('interactionCreate', (int) => {
            if (!int.isButton()) return;


            const regex = /utils-\b(0?[1-9]|1[0-9]|2[0-5])\b/gm


            if (!int.customId.match(regex)[0]) return;

            const newIndex = parseInt(int.customId.slice(6)) - 1

            if (type === 0) {
                toEdit = {
                    embeds: [overlordType[newIndex]],
                    components: rowArray
                }
            }
            else {
                toEdit = {
                    content: overlordType[newIndex],
                    components: rowArray
                }
            }

            int.update(int.message.edit(toEdit));
        })


        return this
    }


    setDisabled(bool) {

        const disabledEmbed = {
            title: "The pagination time has ran out! Run the command again or contact the developer if you believe something is wrong."
        }
        const reEnabledEmbed = {
            title: "The pagination has been re-enabled! Click any of the buttons to traverse to that page."
        }
        const { msgSent, componentsSent, embeds, messages } = this
        if (typeof bool !== "boolean") {
            throw new TypeError(`Expected typeof bool to be boolean, got ${typeof bool}`)
        }
        if (bool && embeds) {
            msgSent.edit({
                embeds: [disabledEmbed],
                components: []
            })
        }
        if (!bool && embeds) {
            msgSent.edit({
                embeds: [reEnabledEmbed],
                components: componentsSent
            })
        }

        if (bool && messages) {
            msgSent.edit({
                content: msgSent.content,
                components: null
            })
        }
        if (!bool && messages) {
            msgSent.edit({
                content: msgSent.content,
                components: componentsSent
            })
        }
    }

}
module.exports = numberedPagination
