const Discord = require('discord.js');

module.exports = {
    maxArgs: 0,
    syntaxError: 'Incorect usage. Usage: iq',
    aliases: ['smart'],
    description: 'Gets your IQ.',
    callback: async (message) => {
        const iq = Math.floor(Math.random() * 100) + 1;

        const iEmbed = new Discord.MessageEmbed()
            .setTitle("IQ Test")
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`Your IQ is: \`${iq}\`!`)
            .setFooter('© Rusty 2020');

        const ioEmbed = new Discord.MessageEmbed()
            .setTitle("IQ Test")
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`Your IQ is: \`1,000,000,000,000\`!`)
            .setFooter('© Rusty 2020');

        if (message.author.id !== message.guild.owner.id) {
        message.channel.send(iEmbed);
        } else {
          message.channel.send(ioEmbed);
        };
    },
};