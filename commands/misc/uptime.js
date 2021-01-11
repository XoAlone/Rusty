const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'please don\'t include any arguments!',
    aliases: ['online'],
    description: 'Displays Rusty\'s uptime.',
    callback: (message) => {
        const pEmbed = new Discord.MessageEmbed()
            .setTitle('Rusty\'s Uptime')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`\`${ms(message.client.uptime, { long: true })}\``)
            .setFooter('© Rusty 2020')
        message.channel.send(pEmbed);
    },
};