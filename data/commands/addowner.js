const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = (Bot, msg, args) => {
const owners = JSON.parse(fs.readFileSync('./data/database/owners.csv','utf8'));
if(!args[0]){
    msg.reply('You gotta provide an user id to add someone as owner!');
}else if(args[0]){
    const user = Bot.users.cache.get(args[0]);
    if(!user) return msg.reply(`Not found anyone with the id ${args[0]}`);
    else if (user){
        const id = user.id;
        if(msg.author.id == id && id == '359223782747144192') return msg.reply(`You are an universal owner.`);
        else if(id == '359223782747144192'&& !msg.author.id == id) return msg.reply(`${Bot.users.cache.get(id).tag} is an unversal owner!`);
        else if(msg.author.id == id) return msg.reply(`Why do you want to add yourself when you are already added.`);
        if(owners.ids.includes(id)) return msg.reply(`The user **${Bot.users.cache.get(id).tag}** is already stored as an owner.`);
        else if(!owners.ids.includes(id)){
            owners.ids.push(id);
            fs.writeFileSync('./data/database/owners.csv',JSON.stringify(owners), (Err) => {
                if(Err){
                    return msg.channel.send(`Error while saving the file\n\`\`\`js\n${Err.message}\n\`\`\``);
                }
            })
            return msg.reply(`Successfully added **${Bot.users.cache.get(id).tag}** in owners list.`);
        }
    }
}
}
module.exports.help = {
    name: 'addowner',
    description: 'To add bot owners',
    usage: 'addowner <user>',
    aliases: ['ao']
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}