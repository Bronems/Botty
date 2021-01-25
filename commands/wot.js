const request = require('request');
const { IDAPPIWOT } = require ("../config");
const { MessageEmbed } = require('discord.js');
const dateF = require('../functions/date');

const delay = ms => new Promise(res => setTimeout(res,ms));
module.exports = async(client,message,args) =>{
    message.channel.send("Wait a little ...")
    var id1 = {player_1 : 0}
    var id2 = {player_1 : 0}
    console.log("OK");
    if(args[1].length < 24 &&  args[1].length < 24 ){
        if(args[0]=="info"){
            id1.player_1 = await getid(args[1]);
            if(id1.player_1 != 0){
                data = await getInfo(id1.player_1);
                var sorteddata = {nick : 0, tree : 0, battle : 0 , lastbattle : 0, clan_id : 0, clan : 0,clan_tag : 0, clan_img : 0, spotted : 0, frags : 0, max_damage : 0, wins : 0, losses : 0, max_frags : 0, shots : 0};
                if(data.clan_id != null)
                    clandata = await getClan(data.clan_id)
                else{
                    var clandata={name : "No clan",tag : "No clan",clan_id : "No clan",emblems : {x256 : {wowp : "No clan"}}}
                }
                sortdata(sorteddata, clandata, data);
                showInfo(message, sorteddata);
            }else
            message.channel.send("Player "+args[1]+" doesn't exist !")
        }
        else if(args[0]=="vs"){
            id1.player_1 = await getid(args[1]);
            id2.player_1 = await getid(args[2]);
            //console.log(id1.player_1+' '+id2.player_1)
            if(id1.player_1 != 0 && id2.player_1 != 0){
                data1 = await getInfo(id1.player_1);
                data2 = await getInfo(id2.player_1);
                
                var sorteddata1 = {nick : 0, tree : data1.statistics.trees_cut , battle : 0 , lastbattle : 0, clan_id : 0, clan : 0,clan_tag : 0, clan_img : 0, spotted : 0, frags : 0, max_damage : 0, wins : 0, losses : 0, max_frags : 0, shots : 0};
                var sorteddata2 = {nick : 0, tree : data2.statistics.trees_cut, battle : 0 , lastbattle : 0, clan_id : 0, clan : 0,clan_tag : 0, clan_img : 0, spotted : 0, frags : 0, max_damage : 0, wins : 0, losses : 0, max_frags : 0, shots : 0};
                
                if(data1.clan_id != null)
                    clandata1 = await getClan(data1.clan_id)
                else{
                    var clandata1={name : "No clan",tag : "No clan",clan_id : "No clan",emblems : {x256 : {wowp : "No clan"}}}
                }
                if(data2.clan_id != null)
                    clandata2 = await getClan(data2.clan_id)
                else{
                    var clandata2={name : "No clan",tag : "No clan",clan_id : "No clan",emblems : {x256 : {wowp : "No clan"}}}
                }
                
                sortdata(sorteddata1, clandata1, data1);
                sortdata(sorteddata2, clandata2, data2);
                showInfoVs(message, sorteddata1, sorteddata2);
            }else{
                if(id1.player_1 == 0 && id2.player_1 == 0)
                    message.channel.send("Players "+args[1]+" and "+args[2]+" doesn't exist !")
                else if(id1.player_1 == 0)
                    message.channel.send("Player "+args[1]+" doesn't exist !")
                else if(id2.player_1 == 0)
                    message.channel.send("Player "+args[2]+" doesn't exist !")
            }
        }
    }else{
        message.channel.send("Player name is too long ! ")
    }
}

async function getClan(idclan){
    let url = String('https://api.worldoftanks.eu/wot/clans/info/?application_id='+ IDAPPIWOT +'&clan_id='+idclan)
    var box = {data : 0};
    request(url,box, function(error, reponse, body){
        const rep = JSON.parse(body)
        box.data = rep.data[idclan]
        return 1 
    });
    await delay(4000);
    if(box.data)
        return box.data
    return 0
}

function sortdata(dataout, clan, datain){
    dataout.nick = datain.nickname;
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
}
async function getid(wotname){
    let url = String('http://api.worldoftanks.eu/wot/account/list/?application_id='+ IDAPPIWOT +'&search='+wotname)
    var box = {data : 0};
    request(url,box, function(error, reponse, body){
        const rep = JSON.parse(body)
        if(rep.data[0] != null){ // a corriger
            box.data = rep.data[0].account_id
            return 1    
        }
        else
            box.data = null
            return 0
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
                { name: 'Clan :', value : data.clan },
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

function showInfoVs(message, data1, data2){
    var userName = message.author.username;
        const date = dateF();
        const embed = new MessageEmbed()
            .setColor('F93A2F')
            .setTitle('Stats')
            .setAuthor('Bot')
            .setDescription('Stats of ' + data1.nick + '['+data1.clan_tag+']        VS       ' + data2.nick + '['+data2.clan_tag+']')
            .addFields(
                { name : 'Stats', value : '\u200B' +
            'Battles : \n' +
            'Frags : \n' +
            'Enemy spotted :\n'+
            'Shots : \n' +
            'Max damages : \n' +
            'Max frags : \n' +
            'Wins : \n' +
            'Losses : \n '+
            'Tree cuted : \n', inline : true },
                { name : data1.nick + '['+data1.clan_tag+']', value : '\u200B' +
                data1.battle + '\n' +
                data1.frags + '\n' +
                data1.spotted + '\n' +
                data1.shots + '\n' +
                data1.max_damage + '\n' +
                data1.max_frags  + '\n'+
                data1.wins + '\n'+
                data1.losses +  '\n' +
                data1.tree +  '\n' 
                , inline : true},
                { name : data2.nick + '['+data2.clan_tag+']', value : '\u200B' +
                data2.battle + '\n' +
                data2.frags + '\n' +
                data2.spotted + '\n' +
                data2.shots + '\n' +
                data2.max_damage + '\n' +
                data2.max_frags  + '\n'+
                data2.wins + '\n'+
                data2.losses +  '\n' +
                data2.tree +  '\n' 
                , inline : true},

                /*
                { name: 'Clan :', value : data1.clan + '        ||      ' + data2.clan},
                { name: 'Battles :', value : data1.battle + '       ||      ' + data2.battle},
                { name: 'Frags :', value : data1.frags+ '       ||        ' + data2.frags},
                { name: 'Enemy spotted :', value : data1.spotted+ '         ||      ' + data2.spotted},
                { name: 'Shots :', value : data1.shots+ ' || ' + data2.shots},
                { name: 'Max damages :', value : data1.max_damage + '        ||        ' + data2.max_damage},
                { name: 'Max frags :', value : data1.max_frags + '      ||       ' + data2.max_frags},
                { name: 'Wins :', value : data1.wins + '        ||         ' + data2.wins},
                { name: 'Losses :', value : data1.losses + '        ||      ' + data2.losses },
                { name: 'Tree cuted :', value : data1.tree+ '       ||        ' + data2.tree},*/
                { name: 'Used by', value: userName},
            )
            .setFooter('Send by Botty : ' + date , 'https://static.ayana.io/avatar.png')
        message.channel.send(embed);
}
    