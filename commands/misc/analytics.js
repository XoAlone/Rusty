const Discord = require('discord.js');
const os = require('os');

module.exports = {
    minArgs: 0,
    maxArgs: 0,
    syntaxError: 'please don\'t include any arguments!',
    aliases: ['stats'],
    description: 'Displays Rusty\'s stats.',
    callback: (message) => {
        let totalGuildSize = message.client.guilds.cache.size;

        const list = message.client.guilds.cache;
        let totalMemberCount = 0;
        list.forEach((guild) => {
            totalMemberCount += guild.memberCount;
        });

        let embed = new Discord.MessageEmbed()
            .setTitle('Rusty\'s Stats')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .addField(" [ Discord.JS ]", `**Version:** ${Discord.version}`, true)
            .addField(
                "[ RAM ]",
                `**Used:** ${((os.totalmem() - os.freemem()) / 1073741824).toFixed(
						3
					)} GB\n**Free:** ${(os.freemem() / 1073741824).toFixed(
						3
					)} GB\n**Total:** ${(os.totalmem() / 1073741824).toFixed(3)} GB`,
                true
            )
            .addField(
                "[ Host ]",
                `**Hostname:** ${os.hostname()}\n**Platform:** ${os.platform()}\n**Release:** ${os.release()}\n**Uptime:** ${(
						os.uptime() /
						60 /
						60
					).toFixed(0)} hours`,
                true
            )
            .setFooter('© Rusty 2020');

        return message.channel.send(embed);
    },
};