const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const request = require('request');
const dateF = require('../functions/date');

module.exports = (client, message, args) => {
    let rawMeteoData = fs.readFileSync('./sources/city_list.json');
    let meteo = JSON.parse(rawMeteoData);
    let country = meteo.find(meteo => meteo.name === String(args)) 
    if(country){
        city = country.id
        let url = String('http://api.openweathermap.org/data/2.5/weather?id='+ city +'&appid=5be56cf1268a12561a070d124f356296')
        request(url, city, (error, reponse, body) => {
            const rep = JSON.parse(body)
            ProcessFille(rep, city, message);
        })
    }else{
        message.channel.send(args + ' doesn\'t exist !');
    }

    function ProcessFille(rep, city, message){
        var temps = (rep.main.temp-273.15)
        var meteo = {
            city: rep.name, 
            tempL: (Math.round(temps * 100) / 100),
          }
          Meteo(message,meteo);
    }
    function Meteo(content, meteo){
        var userName = message.author.username;
            const date = dateF();
            const embed = new MessageEmbed()
                .setColor('6666ff')
                .setTitle('Meteo')
                .setAuthor('Bot')
                .setDescription('Meteo of ' + meteo.city)
                .addFields(
                    { name: 'Temp ', value : meteo.tempL+ '°C' },
                    { name: 'Used by', value: userName},
                )
                .setFooter('Send by Botty : ' + date , 'https://static.ayana.io/avatar.png')
            message.channel.send(embed);
    }
}



