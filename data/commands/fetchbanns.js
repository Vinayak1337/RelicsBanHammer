const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    (async()=> {
        const banned = await Bot.guilds.cache.get('328479586297839618').fetchBans().map(b => b.user);
        const guilds = Bot.guilds.cache.map(g => g);
        let count = 0;
        let count2 = 0;
        for(let x=0; x<banned.length; x++){
            task(x);
        }
        const msg2 = await msg.channel.send(`Started banning ${banned.length} users in ${guilds.length} <a:0_Loading1:758418113401716766>`);
    })();
    function task(x){
        setTimeout(function(){
            for(let i=0; i<guilds.length;i++){
                newTask(i);
            }
    },10*x);
    }
    function newTask(i){
        setTimeout(function(){
            (async() => {
                await guilds[i].members.ban(banned[x].id,{reason: 'Refreshing bans from main server!'}).then(banned => {
                    count2++;
                }).catch(err => {
                    Bot.channels.cache.get('765660009782050836').send(`Error while banning **${banned.tag}** in **${guilds[i].name}: \n\`\`\`js\n${err.message}\n\`\`\``);
                });
                if(x == (banned-1) && i == (guilds - 1)){
                    msg2.edit(`Successfuly fetched ${count} users ban in ${guilds.length} guilds, will be finished within a minute!`);
                }
            })();
        },200*i);
    }
    
}
module.exports.help = {
    name: 'fetchbans',
    description: 'To ban all the banned users chaining to all the servers!',
    usage: 'fetchbans',
    module: '',
    aliases: []
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}