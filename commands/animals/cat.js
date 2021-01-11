const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    maxArgs: 0,
    syntaxError: 'Incorect usage. Usage: cat',
    aliases: [],
    description: 'Generates a random cat picture.',
    callback: async (message, args) => {
        const data = await fetch('https://nekos.life/api/v2/img/meow').then((res) =>
            res.json()
        );

        const embed = new Discord.MessageEmbed()
            .setTitle('Cat Picture')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setImage(`${data.url}`)
            .setFooter('© Rusty 2020');
        message.channel.send(embed);
    },
};