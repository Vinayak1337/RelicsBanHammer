const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = (Bot, msg, args) => {
const owners = JSON.parse(fs.readFileSync('./data/database/owners.csv','utf8'));
if(!args[0]){
    msg.reply('You gotta provide an user id to add someone as owner!');
}else if(args[0]){
    const id = Bot.users.cache.get(args[0]);
    if(!id) return msg.reply(`Not found anyone with the id ${args[0]}`);
    else if (id){
        id = id.id;
        if(msg.author.id == id && id == '359223782747144192') return msg.reply(`I can't remove you from the owners list.`);
        else if(id == '359223782747144192') return msg.reply(`${Bot.users.cache.get(id).tag} is universal owner, you can't remove him!`);
        else if(msg.author.id == id) return msg.reply(`Why do you want to remove yourself?\nAsk another owner to remove you!`);
        if(!owners.ids.includes(id)) return msg.reply(`The user **${Bot.users.cache.get(id).tag}** isn't stored as owner.`);
        else if(owners.ids.includes(id)){
            let index = owners.ids.indexOf(id);
            owners.ids.splice(index,1);
            fs.writeFileSync('./data/database/owners.csv',JSON.stringify(owners), (Err) => {
                if(Err){
                    return msg.channel.send(`Error while saving the file\n\`\`\`js\n${Err.message}\n\`\`\``);
                }
            })
            return msg.reply(`Successfully removed **${Bot.users.cache.get(id).tag}** in owners list.`);
        }
    }
}
}
module.exports.help = {
    name: 'removeowner',
    description: 'To add bot owners',
    usage: 'removeowner <user>',
    aliases: ['ro']
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}