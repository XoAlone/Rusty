const Discord = require('discord.js');
const dateFormat = require('dateformat');

module.exports = {
    aliases: ['uinfo'],
    description: 'Gets the specified user info.',
    callback: async (message, args) => {
        let user = message.mentions.users.first() || message.author;

        const member = message.guild.member(user);

        let createdate = dateFormat(user.createdAt, 'yyyy.mm.dd');
        let joindate = dateFormat(member.joinedAt, 'yyyy.mm.dd');
        let status = user.presence.status;
        let avatar = user.avatarURL({
            size: 2048
        });

        let embed = new Discord.MessageEmbed()
            .setTitle('User Info')
            .setAuthor(`${user.tag}`, avatar)
            .setThumbnail(avatar)
            .addField('**[ Username ]**', user.username)
            .addField('**[ User Tag ]**', user.tag)
            .addField('**[ User ID ]**', user.id)
            .addField('**[ Join Date ]**', joindate)
            .addField('**[ Account Create Date ]**', createdate)
            .addField('**[ Status ]**', `**${status}**`)
            .setFooter('© Rusty 2020');
        message.channel.send(embed);
    },
};