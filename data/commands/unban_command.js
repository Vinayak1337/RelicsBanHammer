const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    (async () => {

        const runningBan = Bot.runningCommand.get(`ban`);
        const runningUnban = Bot.runningCommand.get(`unban`);
        if(runningBan || runningUnban) return msg.channel.send(`A${runningBan ? ' ban' : 'n unban' } is already in progress, please wait until it overs!`); 
        else Bot.runningCommand.set(`unban`,true); 

        let id, name, user;
        if(args[0]){ user = Bot.users.cache.get(args[0]) || msg.mentions.users.first() || await Bot.users.fetch(args[0]);
            if(!user){ Bot.runningCommand.set(`ban`,false);
                       return msg.reply(`User not found with ${args.join(' ')}, make sure its an ID or a mention!`); }
            else{ id = user.id;
                  name = Bot.users.cache.get(id).tag; }
        }else{ Bot.runningCommand.set(`ban`,false);
               return msg.reply(`Ready to unban in ${Bot.guilds.cache.size} servers, just provide the user id!`); }

       const msg2 = await msg.reply(`Started unbanning in ${Bot.guilds.cache.size} servers, please wait! <a:0_Loading1:758418113401716766>`);
       let count = 0;
       const guilds = Bot.guilds.cache.map(guild => guild);
       for(let x=0; x<guilds.length;x++){ task(x); }

       function task(x){
           setTimeout(function(){
           (async() => {

          await guilds[x].members.unban(id,`${args[1]?`${msg.author.tag}: ${args.slice(1).join(' ')}`:`Unbanned by ${msg.author.tag}`}`).then(unbanned => {
               if(unbanned){ count++; }
           }).catch(err => {
            if(!err.message == 'Unknown Ban'){
             msg.channel.send(`Error while unbanning in **${guilds[x].name}** server \n\`\`\`js\n${err.message}\n\`\`\``);
             }
           });
           if(x === (guilds.length-1)){ Bot.users.cache.get(id).send(`You are now unbanned from ${count} relics servers.\nReason: ${args[1]?`**${args.slice(1).join(' ')}**`:'**None**'}`).catch(err => {
            msg.channel.send(`Error while sending msg:\n\`\`\`js\n${err.message}\n\`\`\``); });
Bot.runningCommand.set(`unban`,false);
if(count > 0){ return msg2.edit(`Successfully unbanned **${name}** in **${count}** ${count > 1? `servers`:`server`}!`).catch(err => { msg.channel.send(`Error while editing msg:\n\`\`\`js\n${err.message}\n\`\`\``); }); }
else{   return msg2.edit(`He was never banned in any server\n¯\\_(ツ)_/¯`).catch(err => { msg.channel.send(`Error while editing msg:\n\`\`\`js\n${err.message}\n\`\`\``); }); };
}
        })();
    },200*x);
       };
    })();
}
module.exports.help = {
    name: 'unban',
    description: 'To ban someone ¯\\_(ツ)_/¯',
    usage: 'unban <User>',
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}
