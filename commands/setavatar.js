const saveDate = require('../functions/saveDate');
const noArgs = require('../functions/noArgs');
module.exports = async(client, message, args, settings, save, command) =>{
    if(!message.member.hasPermission("ADMINISTRATOR")) return undefinded;
    if(!args.length){
        noArgs(1, command, message,);
        return undefined;
    }
    console.log(args[0])
    if(saveDate()-save.profilLastTime > save.delayProfil){
        await client.updateSave(message.guild , {profilLastTime: saveDate()});
        client.user.setAvatar(String(args[0]));
    }else{
        message.reply("You need to wait at least 300 sec");
    }
}

