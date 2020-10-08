module.exports = (client,message,args) =>{
    if(!message.member.hasPermission("ADMINISTRATOR")) return undefinded;

    args = args.join(' ');
    client.user.setActivity(args, {type : 'LISTENING'});
}

