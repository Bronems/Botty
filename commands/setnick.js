
module.exports = (client,message,args) =>{
    client.user.setUsername(String(args));
}

