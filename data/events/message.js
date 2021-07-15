const { owners } = require('../keys/settings');
const fs = require('fs');

module.exports = (Bot, msg) => {
    if(!Bot.botReady == true) return;
    if(msg.author == Bot.user) return;
    

    //Returning from DM
    if(msg.channel.type == 'dm') return Bot.channels.cache.get('765660080120135732').send(msg.content+' :DMed\n By '+msg.author.tag+' '+msg.author.id);

    //________________________________________________________________________________________
    let owns = JSON.parse(fs.readFileSync('./data/database/owners.csv','utf8')).ids;
    owns.forEach(id => {
        if(!owners.includes(id)){
            owners.push(id);
        }
    });
    Bot.owners = owners;
    let prefix = '=';
    Bot.prefix = prefix

    //___________________________________________________________________________________________
    //Returning here if not prefix
    if(!msg.content.startsWith(prefix) && !msg.content.startsWith('<@!673968506902937632>') && !msg.content.startsWith('<@673968506902937632>')) return;
    //Returning if Bot
    if(msg.author.bot) return;

    let msgArray = msg.content.split(' ');

    if(msg.content.startsWith('<@!673968506902937632>')){
        if(msgArray[1]){
        command = msgArray[1].toLowerCase();
        args = msgArray.slice(2);
        }else{
            command = 'none'
            args = msgArray.slice(1);
        }
        

    }
    else{

        command = msgArray[0].slice(prefix.length).toLowerCase();
        args = msgArray.slice(1);
    }
    args.forEach((a,i) => {
        a = a.trim();
        if(!a){args.splice(i,1)}});
        args = args.map(a => a.trim());

    const cmd = Bot.commands.get(command) || Bot.aliases.get(command);
    Bot.command = command;

    if(!cmd) return;
    if(!msg.guild.me.permissions.has(['SEND_MESSAGES'])) return msg.author.send(Bot.errEm.setDescription(`user ${msg.author}, i don't have permission to send message in ${msg.channel}`));

    if(cmd.requirements.ownerOnly && !owners.includes(msg.author.id)) return;
    if(cmd.requirements.adminOnly && !msg.member.permissions.has(['ADMINISTRATOR'])) return msg.channel.send(Bot.errEm.setDescription('This command requires admin permission'));

    if(cmd.requirements.userPerms && !msg.member.permissions.has(cmd.requirements.userPerms)){
        return msg.channel.send(Bot.errEm.setDescription(`You must have the following permissions: ${missingPerms(msg.member, cmd.requirements.userPerms)}`));
    }

    if(cmd.requirements.BotPerms && !msg.guild.me.permissions.has(cmd.requirements.BotPerms)){
        return msg.channel.send(Bot.errEm.setDescription(`I am missing the following permissions: ${missingPerms(msg.guild.me, cmd.requirements.BotPerms)}`));
    }

    cmd.run(Bot, msg, args, command);
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
    `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1[0])}`:
    missingPerms[0];
}