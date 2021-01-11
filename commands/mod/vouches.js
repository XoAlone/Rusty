const Discord = require('discord.js');
const { statusMessages, suggestionCache } = require('../../features/suggestions.js')

module.exports = {
    aliases: ['awpdiaw8dga8wgd8g8wgd8a'],
    description: 'Bruh.',
    callback: async (message, args) => {
        const { guild } = message

    const messageId = args.shift()
    const status = args.shift().toUpperCase()
    const reason = args.join(' ')

    message.delete()

    const newStatus = statusMessages[status]

    if (!newStatus) {
      message.reply(
        `Unknown status "${status}", please use ${Object.keys(statusMessages)}`
      )
      return
    }

    const channelId = suggestionCache()[guild.id]
    if (!channelId) {
      message.reply('An error occurred, please report this.')
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      message.reply('The vouch channel no longer exists.')
      return
    }

    const targetMessage = await channel.messages.fetch(messageId, false, true)
    if (!targetMessage) {
      message.reply('That message no longer exists.')
      return
    }

    const oldEmbed = targetMessage.embeds[0]

    const embed = new MessageEmbed()
      .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
      .setDescription(oldEmbed.description)
      .setColor(newStatus.color)
      .setFooter('Want to vouch? Simply type it in this channel.')

    targetMessage.edit(embed)
    },
};