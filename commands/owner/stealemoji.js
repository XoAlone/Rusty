const Discord = require('discord.js');

module.exports = {
    minArgs: 1,
    maxArgs: 1,
    syntaxError: 'Incorrect usage. Usage: stealemoji <:emoji:>',
    aliases: [],
    description: 'Steals another server emoji.',
    callback: async (message, args) => {
        if (message.author.id === message.guild.owner.id) {
            try {
                const emoteId = args[0].match(/:([0-9]*)>/i)[1];
                const emoteName = args[0].match(/:(.*):/)[1];
                const emoteLink = `https://cdn.discordapp.com/emojis/${emoteId}`;
                const emote = await message.guild.emojis.create(emoteLink, emoteName);

                message.reply(`I have stolen ${emote} and added it to our emoji list!`);
            } catch (error) {
                message.reply(`Whoops, something went wrong! Here's the error: ${error.message}.`);
            };
        } else {
          return message.reply('you must be the owner to run this command!');
        };
    },
};