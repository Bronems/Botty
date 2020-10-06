//
const { Client, Collection } = require('discord.js');
const { TOKEN, DEFAULTSETTINGS } = require ("./config");
const fs = require('fs');
const { ClientRequest } = require('http');
const client = new Client({disableEveryone: true});

client.config = DEFAULTSETTINGS;
require("./util/functions")(client);
client.mongoose = require("./util/mongoose");

client.commands = new Collection();
//client.commands.set("cmd", require("./commands/cmd.js"));
client.commands.set("meteo", require("./commands/meteo.js"));
client.commands.set("tweet", require('./commands/tweet.js'));
client.commands.set("setnick", require('./commands/setnick.js'));
client.commands.set("setavatar", require('./commands/setavatar'));
client.commands.set("setcustom", require('./commands/setcustom.js'));
client.commands.set("config", require('./commands/config.js'));
client.commands.set("eval", require("./commands/eval.js"));

client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));
client.on("guildCreate", guild => require("./events/guildCreate.js")(client, guild));

client.mongoose.init();
client.login(TOKEN);


client.on('error', console.error);
client.on('warn', console.warn);
