const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    (async () => {

    const runningBan = Bot.runningCommand.get(`ban`);
    const runningUnban = Bot.runningCommand.get(`unban`);
    if(runningBan){
        return msg.channel.send(`A ban is already in progress, please wait until it overs!`);
    }else if(runningUnban){
        return msg.channel.send(`An unban is already in progress, please wait until it overs!`);
    }else{
        Bot.runningCommand.set(`ban`,true);
    }
    let id, name, user;
    if(args[0]){
        user = Bot.users.cache.get(args[0]) || msg.mentions.users.first() || await Bot.users.fetch(args[0]);
        if(!user){
            Bot.runningCommand.set(`ban`,false);
            return msg.reply(`User not found with ${args.join(' ')}, make sure its an ID or a mention!`);
        }else if(user && Bot.owners.includes(user.id)){
            Bot.runningCommand.set(`ban`,false);
            return msg.reply(`Can't ban any owner.`);
        }else{
            id = user.id;
            name = Bot.users.cache.get(id).tag;
        }
    }else{
        Bot.runningCommand.set(`ban`,false);
        return msg.reply(`Ready to ban in ${Bot.guilds.cache.size} servers, just provide the user id!`);
    }
   const msg2 = await msg.reply(`Started banning in ${Bot.guilds.cache.size} servers, please wait! <a:0_Loading1:758418113401716766>`).catch(err => msg.channel.send('error :'+err.message));
   let count = 0;
   const guilds = Bot.guilds.cache.map(guild => guild);
   Bot.users.cache.get(id).send(`Your are now banned from ${Bot.guilds.cache.size} relics servers.\nReason: ${args[1]?`**${args.slice(1).join(' ')}**`:'**None**'}`).catch(err => {
    msg.channel.send(`Error while sending msg:\n\`\`\`js\n${err.message}\n\`\`\``);
});
   for(let x=0; x<guilds.length;x++){
       task(x);
   }
   function task(x){
       setTimeout(function(){
       (async() => {
      await guilds[x].members.ban(id,{
        reason: `${args[1]?`${msg.author.tag}: ${args.slice(1).join(' ')}`:`Banned by ${msg.author.tag}`}`
       }).then(banned => {
           if(banned){
               count++;
           }
       }).catch(err => { msg.channel.send(`Error while banning in **${guilds[x].name}** server \n\`\`\`js\n${err.message}\n\`\`\``); });
       if(x === (guilds.length-1)){
        Bot.runningCommand.set(`ban`,false);
            return msg2.edit(`Successfully banned **${name}** in **${count}** ${count > 1? `servers`:`server`}!`).catch(err => {
                msg.channel.send(`Error while editing msg:\n\`\`\`js\n${err.message}\n\`\`\``);
            })
       }
    })();
},200*x);
   };
})();
}
module.exports.help = {
    name: 'ban',
    description: 'To ban someone ¯\\_(ツ)_/¯',
    usage: 'ban <User>',
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}