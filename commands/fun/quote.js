const Discord = require('discord.js');
const centra = require('@aero/centra');

module.exports = {
    maxArgs: 0,
    syntaxError: 'Incorect usage. Usage: quote',
    aliases: [],
    description: 'Gets an AI generated quote.',
    callback: async (message) => {
        const res = await centra(`https://inspirobot.me/api?generate=true`).text();
        const qEmbed = new Discord.MessageEmbed()
            .setTitle(`Get inspired...`)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setImage(res)
            .setFooter('© Rusty 2020');
        message.channel.send(qEmbed);
    },
};