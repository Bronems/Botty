module.exports = async (client, message,args, settings, save ) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return undefinded;

    const getSetting = args[0];
    const newSetting = args.slice(1).join(" ");

    switch (getSetting){
        case "prefix" : {
            if(newSetting) {
                await client.updateGuild(message.guild , {prefix: newSetting});
                return message.channel.send('Prefix changed');
            }
            message.channel.send('Prefix : ' + settings.prefix);
            break;
        }
        case "logchannel" :{
            if(newSetting) {
                if(client.channels.cache.find(r => r.name === newSetting)){
                    await client.updateGuild(message.guild , {logChannel: newSetting});
                    return message.channel.send("New Log channel" + newSetting);   
                }     
            }
        }
    }
}

