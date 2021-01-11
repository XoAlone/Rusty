const keepAlive = require('./utils/keepAlive');
const Discord = require('discord.js');
const WOKCommands = require('wokcommands');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log('\x1b[32m%s\x1b[0m', `Logged in as ${client.user.tag}!`);
    client.user.setActivity('with XoAlone\'s 🍆pp🍆.');

    new WOKCommands(client, 'commands', 'features')
        .setMongoPath(process.env.MONGO_URI);
});

keepAlive();

client.login(process.env.TOKEN);