const Discord = require('discord.js');
const { formatDate, toCapitalize } = require('../../utils/functions.js');
const regions = require('../../utils/regions.json');

module.exports = {
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'please don\'t include any arguments!',
    aliases: ['sinfo'],
    description: 'Gets the current server info.',
    callback: (message) => {
        const {
            guild
        } = message;
        const {
            name,
            memberCount,
            premiumSubscriptionCount,
            premiumTier,
            verified,
            partnered,
        } = guild;
        const roles = guild.roles.cache.size;
        const channels = guild.channels.cache.size;
        const emojis = guild.emojis.cache.size;
        const createdAt = formatDate(guild.createdAt);
        const boosts = premiumSubscriptionCount;
        const boostLevel = premiumTier;
        const owner = (guild.owner && guild.owner.user.tag) || 'error';
        const isVerified = verified ?
            'TRUE' :
            'FALSE';
        const isPartnered = partnered ?
            'TRUE' :
            'FALSE';
        const inviteBanner = guild.bannerURL({
            size: 2048,
            format: 'png',
            dynamic: true,
        });

        const regionKey = guild.region;
        const regionData = regions.filter((region) =>
            region.keys.includes(regionKey)
        )[0];
        const region = `${regionData.flag ? regionData.flag : ''} ${toCapitalize(
      regionKey
    )}`;

        const verLevel = guild.verificationLevel;
        const mfaLevel = guild.mfaLevel;

        const embed = new Discord.MessageEmbed()
            .setTitle(name)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setThumbnail(guild.iconURL({
                dynamic: true,
                size: 1024
            }))
            .addField('**[ Server Owner ]**', owner, true)
            .addField('**[ Roles Count ]**', roles, true)
            .addField('**[ Channel Count ]**', channels, true)
            .addField('**[ Emoji Count ]**', emojis, true)
            .addField('**[ Member Count ]**', memberCount, true)
            .addField('**[ Created At ]**', createdAt, true)
            .addField('**[ Region ]**', region, true)
            .addField('**[ Verification level ]**', verLevel, true)
            .addField('**[ Boosts ]**', boosts, true)
            .addField('**[ Boost Level ]**', boostLevel, true)
            .addField('**[ Verified ]**', isVerified, true)
            .addField('**[ Partnered ]**', isPartnered, true)
            .setImage(inviteBanner)
            .setFooter('© Rusty 2020');
        message.channel.send(embed);
    },
};