module.exports = (client,message,args) =>{
    args = args.join(' ');
    client.user.setActivity(args, {type : 'LISTENING'});
        //ActivitySave(String(args));
}

