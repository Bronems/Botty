const request = require('request');
const { IDAPPIWOT } = require ("../config");
const { MessageEmbed } = require('discord.js');
const dateF = require('../functions/date');

const delay = ms => new Promise(res => setTimeout(res,ms));
module.exports = async(client,message,args) =>{
    var id = {player_1 : 0}
    var id = {player_2 : 0}
    console.log("OK");
    if(args[0]=="id"){
        id.player_1 = await getid(args[1]);
        console.log(id.player_1)
    }
    else if(args[0]=="info"){
        id.player_1 = await getid(args[1]);
        data = await getInfo(id.player_1);
        var sorteddata = {nick : 0, tree : 0, battle : 0 , lastbattle : 0, clan_id : 0, clan : 0,clan_tag : 0, clan_img : 0, spotted : 0, frags : 0, max_damage : 0, wins : 0, losses : 0, max_frags : 0, shots : 0};
        if(data.clan_id != null)
            clandata = await getClan(data.clan_id)
        else{
            var clandata={name : "No clan",tag : "No clan",clan_id : "No clan",emblems : {x256 : {wowp : "No clan"}}}
        }
        sortdata(sorteddata, clandata, data);
        console.log(sorteddata)
        showInfo(message, sorteddata);
    }
}

async function getClan(idclan){
    let url = String('https://api.worldoftanks.eu/wot/clans/info/?application_id='+ IDAPPIWOT +'&clan_id='+idclan)
    var box = {data : 0};
    request(url,box, function(error, reponse, body){
        const rep = JSON.parse(body)
        if(true){ // a corriger
            box.data = rep.data[idclan]
            return 1    
        }
        else
            return -1
    });
    await delay(4000);
    if(box.data)
        return box.data
    return 0
}

function sortdata(dataout, clan, datain){
    dataout.nick = datain.nickname;
    dataout.tree = datain.statistics.trees_cut;
    dataout.battle = datain.statistics.all.battles;
    dataout.lastbattle = datain.last_battle_time;
    dataout.clan_id = datain.clan_id;
    dataout.spotted = datain.statistics.all.spotted;
    dataout.frags = datain.statistics.all.frags;
    dataout.max_damage = datain.statistics.all.max_damage;
    dataout.wins = datain.statistics.all.wins;
    dataout.losses = datain.statistics.all.losses;
    dataout.max_frags = datain.statistics.all.max_frags;
    dataout.shots = datain.statistics.all.shots;
    dataout.clan = clan.name;
    dataout.clan_tag = clan.tag;
    dataout.clan_img = clan.emblems.x256.wowp
}
async function getid(wotname){
    let url = String('http://api.worldoftanks.eu/wot/account/list/?application_id='+ IDAPPIWOT +'&search='+wotname)
    var box = {data : 0};
    request(url,box, function(error, reponse, body){
        const rep = JSON.parse(body)
        if(true){ // a corriger
            box.data = rep.data[0].account_id
            return 1    
        }
        else
            return -1
    });
    await delay(4000);
    if(box.data)
        return box.data
    return 0
}

async function getInfo(wotid){
    let url = String('https://api.worldoftanks.eu/wot/account/info/?application_id='+ IDAPPIWOT +'&account_id='+wotid)
    var box = {data : 0};
    request(url,box, function(error, reponse, body){
        const rep = JSON.parse(body)
        if(true){ // a corriger
            box.data = rep.data[wotid]
            return 1    
        }
        else
            return -1
    });
    await delay(4000);
    if(box.data)
        return box.data
    return 0
}

function showInfo(message, data){
    var userName = message.author.username;
        const date = dateF();
        const embed = new MessageEmbed()
            .setColor('F8C300')
            .setTitle('Stats')
            .setAuthor('Bot')
            .setDescription('Stats of ' + data.nick + '['+data.clan_tag+']')
            .addFields(
                { name: 'Clan :', value : data.clan},
                { name: 'Battles :', value : data.battle},
                { name: 'Frags :', value : data.frags},
                { name: 'Enemy spotted :', value : data.spotted},
                { name: 'Shots :', value : data.shots},
                { name: 'Max damages :', value : data.max_damage},
                { name: 'Max frags :', value : data.max_frags},
                { name: 'Wins :', value : data.wins},
                { name: 'Losses :', value : data.losses},
                { name: 'Tree cuted :', value : data.tree},
                { name: 'Used by', value: userName},
            )
            .setFooter('Send by Botty : ' + date , 'https://static.ayana.io/avatar.png')
        message.channel.send(embed);
}
    