const mongoose = require("mongoose");
const { Guild, Time } = require("../models/index");

module.exports = client => {
    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data ) return data;
        return client.config
        
    };
    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);
        if(typeof data !== "object") data = {};
        for (const key in settings){
            if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };

    client.getSave = async guild => {
        const data = await Time.findOne({ guildID: guild.id});
        return data; 
    };
    client.updateSave = async (guild, save) =>{
        let data = await client.getSave(guild);
        if(typeof data !== "object") data = {};
        for (const key in save){
            if(data[key] !== save[key]) data[key] = save[key];
        }
        return data.updateOne(save);
    };

}
