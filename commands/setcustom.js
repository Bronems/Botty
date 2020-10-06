module.exports = (client,message,args) =>{
    client.user.setActivity(String(args), {type : 'LISTENING'});
        //ActivitySave(String(args));
}

