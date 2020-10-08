module.exports = (client) => {
    client.user.setActivity("I'm Botty !", {type : 'LISTENING'});
    const channel = client.channels.cache.find(r => r.name === "logs");
    channel.send("<a:certif:738869068680921158> Bot is ready");
    console.log("Ready");
}  