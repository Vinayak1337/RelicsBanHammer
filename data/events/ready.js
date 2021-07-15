const Discord = require('discord.js');
const fs = require('fs');

module.exports = (Bot) => {
console.log(`Logged in as ${Bot.user.tag}`);
Bot.botReady = true;
Bot.user.setPresence({status: 'online', activity:{name: `bans in ${Bot.guilds.cache.size} servers over ${Bot.users.cache.size} users.`, type: 'WATCHING'}});
Bot.channels.cache.get('340892971681710080').send("I'm on");
}