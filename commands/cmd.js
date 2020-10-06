const { MessageEmbed } = require('discord.js');
const dateF = require('../functions/date');

module.exports = (client, message) =>{
    const date = dateF();
    const embed = new MessageEmbed()
            .setColor('FFFFFF')
            .setTitle('Commands list')
            .setAuthor('Bot')
            .setDescription('All disponible commands')
            .addFields(
                { name: 'remove', value : 'remove + \'argument(number)\' '},
                { name: 'tweet', value: 'tweet + \'argument + argument + ... (max 270 chars)' },
                { name: 'meteo', value: 'meteo + \'city name ex : London \''},
            )
            .setFooter('Send by Botty : ' + date, 'https://static.ayana.io/avatar.png')
        message.channel.send(embed);
}

