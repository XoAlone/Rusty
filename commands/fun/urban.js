const Discord = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
    minArgs: 1,
    syntaxError: 'Incorect usage. Usage: urban <searchterm>',
    aliases: ['dict'],
    description: 'Searches Urban Dictionary for the specified keyword.',
    callback: async (message, args) => {
        const query = querystring.stringify({
            term: args[0]
        });

        const {
            list
        } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        if (!list.length) return message.channel.send(`No results found for **${args.join(' ')}**.`);

        const [answer] = list;

        const embed = new Discord.MessageEmbed()
            .setTitle(answer.word)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setURL(answer.permalink)
            .addFields({
                name: '[ Definition(s) ]',
                value: answer.definition
            }, {
                name: '[ Example(s) ]',
                value: answer.example
            }, {
                name: '[ Rating ]',
                value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`
            }, )
            .setFooter('© Rusty 2020');
        message.channel.send(embed);
    },
};