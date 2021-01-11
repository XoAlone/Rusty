const Discord = require('discord.js');

module.exports = {
    maxArgs: 0,
    syntaxError: 'Incorrect usage. Usage: shutdown',
    aliases: ['sd'],
    description: 'Shutdowns the bot.',
    callback: (message) => {
        if (message.author.id != message.guild.owner.id) {
          return message.reply('you must be the owner to run this command!');
        };

        message.reply('are you **sure** you want to shut me off? (yes/no).')
            .then(() => {
                message.channel.awaitMessages(response => response.content === 'yes' || response.content === 'y' || response.content === 'no' || response.content === 'n', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        if (collected.first().content.toLowerCase() === 'yes' || collected.first().content.toLowerCase() === 'y') {
                            try {
                                message.channel.send(`Good night!~\n(${message.client.user.username} shutting down...)`);
                                console.log(`${message.client.user.username} shutting down...`);
                                setTimeout(function() {
                                    process.exit();
                                }, 1000);
                            } catch (e) {
                                return message.channel.send(`Whoops, something went wrong! Here's the error: ${e.message}.`);
                            }
                        }
                        if (collected.first().content.toLowerCase() === 'no' || collected.first().content.toLowerCase() === 'n') {
                            return message.channel.send('That\'s what I thought, don\'t shut me down. <:rage:>');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        message.channel.send(`Whoops, something went wrong! Here's the error: ${err.message}.`)
                    });
            });
    },
};