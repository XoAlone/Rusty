const Discord = require('discord.js');

module.exports = {
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'please don\'t include any arguments!',
    aliases: ['p'],
    description: 'Displays Rusty\'s ping.',
    callback: (message) => {
        const pEmbed = new Discord.MessageEmbed()
            .setTitle('Rusty\'s Ping')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`\`${message.client.ws.ping}ms.\``)
            .setFooter('© Rusty 2020')
        message.channel.send(pEmbed);
    },
};