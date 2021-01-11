module.exports = (client) => {
    client.on(`message`, message => {
        if (message.author.bot) {
            return;
        };

        if (message.channel.type === 'dm') {
            return message.channel.send('Please do not send me a DM. This is an automated message.');
        };

        const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]

        try {
            if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
                if (message.author.id !== message.guild.owner.id) {
                    message.delete();
                    message.reply('please refrain from sending an invite link to other servers!');
                } else {
                    return;
                };
            };
        } catch (e) {
            console.log(e);
        };
    });
};