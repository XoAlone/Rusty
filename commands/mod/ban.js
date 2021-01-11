const Discord = require('discord.js');

module.exports = {
    minArgs: 1,
    syntaxError: 'Incorrect usage. Usage: ban <@user> {reason} || ban <id> {reason}',
    aliases: ['yeet'],
    description: 'Bans the specified user.',
    callback: async (message, args) => {
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('I have unsufficent permissions to do this!');
        };

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('you do not have the permission to do that!');
        };

        const banUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.cache.get(args[0])
        );

        if (banUser === message.author.id) {
            return message.reply('you cannot ban yourself, silly!');
        };

        if (banUser === message.client.user.id) {
          return message.reply('you cannot ban me, silly!');
        };

        if (message.guild.me.roles.highest.comparePositionTo(banUser.roles.highest) < 0) {
            return message.channel.send(`My role must be higher than **${banUser}\'s** highest role to ban them!`);
        };

        if (banUser.hasPermission('BAN_MEMBERS')) {
            return message.reply('you cannot ban a member with the BAN_MEMBERS permission!');
        };

        let reason = args.slice(1).join(" ");
        if (!reason) {
          reason = "No reason provided"
        };

        await banUser.send(`You have been banned from **${message.guild.name}.** **Reason:** ${reason}.`);

        if (banUser.bannable) {
            await banUser.ban( {reason : reason} ).then((member) => {
                const bEmbed = new Discord.MessageEmbed()
                    .setTitle('Banned')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`Successfully banned **${member.user.tag}**!`)
                    .setFooter('© Rusty 2020')
                message.channel.send(bEmbed);
            });
        } else if (!banUser.bannable) {
            return message.reply('this member cannot be banned!');
        };
    },
};