const config = require('../sources/configTw.js');
const { MessageEmbed } = require('discord.js');
const Twit = require('twit');
var T = new Twit(config);
const dateF = require('../functions/date');

module.exports = (client, message, args) => {
    args = args.join(' ');
    T.post('statuses/update', { status: args }, tweeted);
    function tweeted(err, data){
        if(err){
            console.log('Wrong' + err);
        }else{ 
            var id = data.id_str;
            var link = String('https://twitter.com/Klemens_devacc/status/' + id)
            Tweet(args,message,link);
        }
    }

    function Tweet(args, message, link){
        var userName = message.author.username;
        const date = dateF();
        const embed = new MessageEmbed()
            .setColor('0000FF')
            .setTitle('Tweeter')
            .setAuthor('Bot')
            .setDescription('I tweet for you on twitter @Klemens_devacc')
            .addFields(
                { name: 'Message in the tweet : ', value : args },
                { name: 'Link of the tweet', value: link },
                { name: 'Used by : ', value: userName},
            )
            .setFooter('Send by Botty the : ' + date, 'https://static.ayana.io/avatar.png')
            message.channel.send(embed);
    }

}

