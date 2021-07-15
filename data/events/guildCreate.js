const fs = require('fs');
const Discord = require('discord.js');

module.exports = (Bot, guild) => {
Bot.channels.cache.get('765660061413408799').send(new Discord.MessageEmbed().setDescription(`Added in guild: ${guild.name}\nMembers: ${guild.members.cache.size}\nOwner: ${guild.owner.tag}`).setThumbnail(guild.iconURL({dynamic:true}).setColor('BLUE')));
(async()=> {
    let banned = await Bot.guilds.cache.get('328479586297839618').fetchBans().map(b => b.user);
    for(let x=0; x<banned.length;x++){
        task(x);
    }
})();
function task(x){
    setTimeout(function(){
    (async()=> {
        await guild.members.ban(banned[x].id,{reason:'Refreshed bans from main server!'}).catch(err => {
            Bot.channels.cache.get('760606144845709312').send(`Error while banning ${banned.tag} in ${guild.name}\n\`\`\`js\n${err.message}\n\`\`\``);
        });
    })();
},50*x);
}
}