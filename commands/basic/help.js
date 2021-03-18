const discord = require('discord.js');

module.exports = {
  name: "help",
  run: async (client, message, args ) => {
      
      let embed = new discord.MessageEmbed()
      .setAuthor("Commands")
      .addField("> Basic",'`Ping`,`Uptime`,`Help`')
      .addField("> Monitor",'`Monitor`,`Remove`,`Stats`')
			.setFooter('Made by team incasx')
			.setColor("GREEN");
			message.channel.send(embed)
    }
  };