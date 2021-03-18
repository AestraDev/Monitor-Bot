const discord = require('discord.js');

module.exports = {
  name: "ping",
  run: async (client, message, args ) => {
    let start = Date.now();
    message.channel.send({embed : {descrption : "looks like your bot is slow.", color: "RED"}}).then(m => {
      let end = Date.now();
      
      let embed = new discord.MessageEmbed()
      .setAuthor("Ping!")
      .addField("API LATENCY", Math.round(client.ws.ping) + "ms", true)
      .addField("MESSAGE LATENCY", end - start + "ms", true)
      .setColor("GREEN");
      m.edit(embed).catch(e => message.channel.send(e))
    })
  }
};