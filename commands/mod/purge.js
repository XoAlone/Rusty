const Discord = require('discord.js');

module.exports = {
    minArgs: 1,
    maxArgs: 1,
    syntaxError: 'Incorrect usage. Usage: purge <number>',
    aliases: ['prune', 'delete', 'clear'],
    description: 'Purges the specified amount of messages in the channel.',
    callback: async (message, args) => {
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('I have unsufficent permissions to do this!');
        };

        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('That doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('You need to input a number between 1 and 100.');
        }

        message.channel.bulkDelete(amount, true).then(deletedMessages => {
            var botMessages = deletedMessages.filter(m => m.author.bot);
            var userPins = deletedMessages.filter(m => m.pinned);
            var userMessages = deletedMessages.filter(m => !m.author.bot);

            const embed = new Discord.MessageEmbed()
                .setTitle('Success')
                .addField('Bot Messages Purged', botMessages.size, false)
                .addField('User Pins Purged', userPins.size, false)
                .addField(' Messages Purged', userMessages.size, false)
                .addField('Total Messages Purged', deletedMessages.size, false)
                .setFooter('© Rusty 2020')

            message.channel.send(embed).then(message => {
                message.delete({
                    timeout: 4000
                })
            });
        }).catch(err => {
            console.error(err);
            message.channel.send(`Whoops, something went wrong! Here's the error: ${err.message}.`);
        });
    },
};