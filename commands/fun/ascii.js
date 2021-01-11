const figlet = require('figlet');

module.exports = {
    minArgs: 1,
    syntaxError: 'Incorect usage. Usage: ascii <string>',
    aliases: [],
    description: 'Turns your text into ASCII.',
    callback: async (message, args) => {
        const text = args.join(' ');

        figlet.text(text, (e, txt) => {
            if (e) return;
            message.channel.send(`\`\`\` ${txt.trimRight()} \`\`\``);
        });
    },
};