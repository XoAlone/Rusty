const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    minArgs: 1,
    syntaxError: 'Incorrect usage. Usage: kick <@user> || kick <id>',
    aliases: ['punt'],
    description: 'Kicks the specified user.',
    callback: async (message, args) => {
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('I have unsufficent permissions to do this!');
        };

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('you do not have the permission to do that!');
        };

        const kickUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.cache.get(args[0])
        );

        if (kickUser === message.author.id) {
            return message.reply('you cannot kick yourself, silly!');
        };

        if (kickUser === message.client.user.id) {
          return message.reply('you cannot kick me, silly!');
        };

        if (message.guild.me.roles.highest.comparePositionTo(kickUser.roles.highest) < 0) {
            return message.channel.send(`My role must be higher than **${kickUser}\'s** highest role to kick them!`);
        };

        if (kickUser.hasPermission('KICK_MEMBERS')) {
            return message.reply('you cannot kick a member with the KICK_MEMBERS permission!');
        };

        let reason = args.slice(1).join(" ");
        if (!reason) {
          reason = "No reason provided";
        };

        if (kickUser.kickable) {
            await kickUser.kick().then((member) => {
                const kEmbed = new Discord.MessageEmbed()
                    .setTitle('Kicked')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`Successfully kicked **${member.user.tag}**!`)
                    .setFooter('© Rusty 2020')
                message.channel.send(kEmbed);
            });
        } else if (!kickUser.kickable) {
            return message.reply('this member cannot be kicked!');
        };
    },
};