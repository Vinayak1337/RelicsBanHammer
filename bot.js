const settings = require('./data/keys/settings');
const Discord = require('discord.js');
const Bot = client = new Discord.Client({
    shards:"auto",
    fetchAllMembers: true,
    retryLimit: 3,
    
});

Bot.commands = new Discord.Collection();
Bot.aliases = new Discord.Collection();
Bot.runningCommand = new Map();
Bot.settings = settings;
Bot.invite = 'https://discord.com/api/oauth2/authorize?client_id=714763717874679871&permissions=8&scope=bot';

Bot.botReady = false;

const commands = require('./data/structures/command');
commands.run(Bot);

const events = require("./data/structures/event");
events.run(Bot);


Bot.login(settings.token).then(g => {
    Bot.user.setPresence({status: 'online', activity:{name: `Loading Commands & Events, please wait!`, type: 'PLAYING'}});
});