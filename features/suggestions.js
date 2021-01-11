const { MessageEmbed } = require('discord.js')
const vouchSchema = require('../schemas/vouches-schema.js')

const statusMessages = {
  WAITING: {
    text: '',
    color: 0xffea00,
  },
  ACCEPTED: {
    text: '✅ Thank you for the vouch, this is a good vouch.',
    color: 0x34eb5b,
  },
  DENIED: {
    text:
      '❌ Thank you for the feedback, but this is not a vouch.',
    color: 0xc20808,
  },
}

let vouchCache = {} // { guildId: channelId }

const fetchSuggestionChannels = async (guildId) => {
  let query = {}

  if (guildId) {
    query._id = guildId
  }

  const results = await vouchSchema.find(query)

  for (const result of results) {
    const { _id, channelId } = result
    vouchCache[_id] = channelId
  }
}

module.exports = (client) => {
  fetchSuggestionChannels()

  client.on('message', (message) => {
    const { guild, channel, content, member } = message

    const cachedChannelId = vouchCache[guild.id]
    if (cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
      message.delete()

      const status = statusMessages.WAITING

      const embed = new MessageEmbed()
        .setColor(status.color)
        .setAuthor(member.displayName, member.user.displayAvatarURL())
        .setDescription(content)
        .setFooter('Want to vouch? Simply type it in this channel.')

      channel.send(embed).then((message) => {
        message.react('👍').then(() => {
          message.react('👎')
        })
      })
    }
  })
}

module.exports.fetchSuggestionChannels = fetchSuggestionChannels

module.exports.statusMessages = statusMessages

module.exports.vouchCache = () => {
  return vouchCache
}