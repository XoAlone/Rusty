module.exports = {
    minArgs: 1,
    syntaxError: 'Incorrect usage. Usage: eval <code>',
    aliases: ['evaluate'],
    description: 'Evaluates your JavaScript code.',
    callback: (message, args) => {

        if (message.author.id === message.guild.owner.id) {
            const clean = (text) => {
                if (typeof text === 'string')
                    return text
                        .replace(/`/g, '`' + String.fromCharCode(8203))
                        .replace(/@/g, '@' + String.fromCharCode(8203));
                else return text;
            };

            try {
                const code = args.join(' ');
                let evaled = eval(code);

                if (typeof evaled !== 'string')
                    evaled = require('util').inspect(evaled);

                if (evaled.length > 2000) evaled = evaled.substring(0, 1980) + '...';
                if (evaled.includes(process.env.TOKEN))
                    evaled = evaled.replace(
                        process.env.TOKEN,
                        'Lmao retard stop tryna get my token.'
                    );
                if (evaled.includes(process.env.MONGO_URI))
                    evaled = evaled.replace(
                        process.env.MONGO_URI,
                        'Lmao retard stop tryna get my Mongo URI.'
                    );

                message.channel.send(clean(evaled), {
                    code: 'xl'
                });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            };
        } else {
            return message.reply('you must be the owner to run this command!');
        };
    },
};