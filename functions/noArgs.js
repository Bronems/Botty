const dateF = require('../functions/date');
const { MessageEmbed } = require('discord.js');
module.exports = (nb, cmd, message) => {
            const date = dateF();
            const embed = new MessageEmbed()
                .setColor('660000')
                .setTitle('Arguments error')
                .setAuthor('Bot')
                .setDescription('not enought arguments for command : ' + cmd)
                .addFields(
                    { name: 'Minimum argument :', value : nb },
                )
                .setFooter('Send by Botty : ' + date , 'https://static.ayana.io/avatar.png')
            message.channel.send(embed);
} 