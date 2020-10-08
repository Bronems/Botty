module.exports = (client,message,args) =>{
    if(!message.member.hasPermission("ADMINISTRATOR")) return undefinded;

    client.user.setUsername(String(args));
}

