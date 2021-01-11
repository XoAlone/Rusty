const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    minArgs: 1,
    syntaxError: 'Incorrect usage. Usage: docs <query>',
    aliases: ['documentations'],
    description: 'Displays Discord.js docs.',
    callback: (message, args) => {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`

        axios.get(uri).then((embed) => {
          let { data } = embed;
          data.color = 65280

          if (data && !data.error) {
            message.channel.send({embed: data});
          } else {
            message.reply(`Whoops, I could not find that documentation.`);
          };
        }).catch(err => {
          console.log(err);
          message.reply(`Whoops, something went wrong! Here's the error: ${err}.`);
        });
    },
};