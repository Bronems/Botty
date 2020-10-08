const mongoose = require("mongoose");
const { Guild, Time } = require("../models/index");


module.exports = async (client, guild) => {
    const setting = client.getGuild(client.guilds.cache);
    if(setting.id === guild.id) return 
    const newGuild = {
        guildID: guild.id,
        guildName: guild.name
    };

    const merged = Object.assign({_id: mongoose.Types.ObjectId()}, newGuild);
    const createGuild = await new Guild(merged);+
    createGuild.save().then(g => console.log(`New guild -> ${g.guildName}`));

    const newSave = {
        guildID: guild.id,
        profilLastTime: 1
    };
    const sMerged = Object.assign(newSave);
    const createSave = await new Time(sMerged);
    createSave.save().then(g => console.log(`New Save -> ${g.profilLastTime}`));

} 