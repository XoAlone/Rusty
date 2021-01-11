const vouchSchema = require('../../schemas/vouches-schema.js');
const {
    fetchSuggestionChannels
} = require('../../features/suggestions.js')

module.exports = {
    maxArgs: 1,
    syntaxError: 'Incorect usage. Usage: setvouch <#channel> || setvouch',
    aliases: ['sv'],
    description: 'Sets the vouch channel.',
    callback: async (message, args) => {
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('I have unsufficent permissions to do this!');
        };

        if (!message.member.hasPermission('MANAGE_MESSAGES' & 'MANAGE_CHANNELS')) {
            return message.reply('you do not have the permission to do that!');
        };

        const channel = message.mentions.channels.first() || message.channel;

        const {
            guild: {
                id: guildId
            },
        } = message
        const {
            id: channelId
        } = channel

        await vouchSchema.findOneAndUpdate({
            _id: guildId,
        }, {
            _id: guildId,
            channelId,
        }, {
            upsert: true,
        });

        message.reply(`The vouches channel has been set to ${channel}!`);

        fetchSuggestionChannels(guildId);
    },
};