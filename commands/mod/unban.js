const Discord = require('discord.js');

module.exports = {
    minArgs: 1,
    syntaxError: 'Incorect usage. Usage: unban <id>',
    aliases: ['unyeet'],
    description: 'Unbans the specified user.',
    callback: async (message, args) => {
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('I have unsufficent permissions to do this!');
        };

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('you do not have the permission to do that!');
        };

        const member = args[0];


        await message.guild.members.unban(member).then((member) => {
            const bEmbed = new Discord.MessageEmbed()
                .setTitle('Unbanned')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`Successfully unbanned **${member.username}**!`)
                .setFooter('© Rusty 2020')
            message.channel.send(bEmbed);
        }).catch(err => {
            message.reply(`Whoops, something went wrong! Here's the error: ${err.message}.`);
        });
    },
};