const Discord = require('discord.js');
const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24

module.exports = {
    maxArgs: 0,
    syntaxError: 'Incorect usage. Usage: christmas',
    aliases: [],
    description: 'Checks how many days until Christmas!',
    callback: async (message, args) => {
        let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const YEAR = today.getFullYear();

    let nextChristmas = new Date(YEAR, 11, 25);
    let timeLeft = nextChristmas.getTime() - today.getTime();

    if (timeLeft < 0) {
        nextChristmas = new Date(YEAR + 1, 11, 25);
        timeLeft = nextChristmas.getTime() - today.getTime();
    };

    const cEmbed = new Discord.MessageEmbed()
    .setTitle('Days Until Christmas')
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setDescription(timeLeft / MILISECONDS_PER_DAY + ' days until Christmas!')
    .setFooter('© Rusty 2020');
    message.channel.send(cEmbed);
    },
};