module.exports = (Bot, error) => {
    if(error){
        console.log(error);
        return Bot.channels.cache.get('765660009782050836').send(Bot.errEm.setDescription(`Error: \`\`\`js\n${error.name}: ${error.message}\n${error.code}\n\`\`\``));
    }
}
