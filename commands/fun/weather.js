const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
    minArgs: 1,
    syntaxError: 'Incorect usage. Usage: weather <location>',
    aliases: [],
    description: 'Gets the weather of the specified location.',
    callback: async (message, args) => {
        weather.find({
            search: args.join(' '),
            degreeType: 'C'
        }, function(err, result) {
            if (err) message.channel.send(err);

            if (result.length === 0) return message.channel.send('**Please enter a valid location.**');

            var current = result[0].current;

            var location = result[0].location;


            const wEmbed = new Discord.MessageEmbed()
                .setTitle(`Weather For ${current.observationpoint}`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`**${current.skytext}**`)
                .setThumbnail(current.imageUrl)
                .addField('[ Timezone ]', `UTC${location.timezone}`, true)
                .addField('[ Temperature ]', `${current.temperature} Degrees`, true)
                .addField('[ Feels Like ]', `${current.feelslike} Degrees`, true)
                .addField('[ Winds ]', current.winddisplay, true)
                .addField('[ Humidity ] ', `${current.humidity}%`, true)
                .setFooter('© Rusty 2020');
            message.channel.send(wEmbed);
        });
    },
};