 
module.exports = async (client, message) =>{
    const settings = await client.getGuild(message.guild);
    const save = await client.getSave(message.guild);

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.author.bot) return; 
    if (message.content.indexOf(settings.prefix) !== 0) return;
    if (client.commands.has(command)){
        client.commands.get(command)(client, message, args, settings, save, command);
    }else{
        message.channel.send("Command doens't exist !");
    }

    const channel = client.channels.cache.find(r => r.name === settings.logChannel);
    channel.send(message.author.username + " used the command : " + command);
}
