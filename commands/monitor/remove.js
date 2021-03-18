 const discord = require('discord.js');
 const fs = require("fs");

module.exports = {
  name: "remove",
  run: async (client, message, args ) => {
 let database = JSON.parse(fs.readFileSync("./link.json", "utf8"));
    if (!database) return send("Something went wrong...", message, "YELLOW");

    let data = database.find(x => x.id === message.author.id);

    if (!data) {
      return send(
        "You do not have any site to monitor, use `!monitor` too add a website",
        message,
        "YELLOW"
      );
    }
    let value = database.indexOf(data);
    let array = [];
    database[value].link.forEach((m, i) => {
      array.push(`**[${i + 1}]**: \`${m}\``);
    });

    let embed = new discord.MessageEmbed()
      .setTitle("Send The number of the link to remove")
      .setColor("BLUE")
      .setDescription(array.join("\n"));

    const msg = await message.channel.send(embed);

    let responses = await message.channel.awaitMessages(
      msg => msg.author.id === message.author.id,
      { time: 300000, max: 1 }
    );
    let repMsg = responses.first();

    if (!repMsg) {
      msg.delete();
      return send(
        "Cancelled The Process of deleting monitor website.",
        message,
        "RED"
      );
    }

    if (isNaN(repMsg.content)) {
      msg.delete();
      return send(
        "Cancelled The Process of deleting monitor website due to **invalid digit**",
        message,
        "RED"
      );
    }

    if (!database[value].link[parseInt(repMsg.content) - 1]) {
      msg.delete();
      return send("There is no link exist with this number.", message, "RED");
    }

    if (database[value].link.length === 1) {
      delete database[value];

      var filtered = database.filter(el => {
        return el != null && el != "";
      });

      database = filtered;
    } else {
      delete database[value].link[parseInt(repMsg.content) - 1];

      var filtered = database[value].link.filter(el => {
        return el != null && el != "";
      });

      database[value].link = filtered;
    }

    fs.writeFile("./link.json", JSON.stringify(database, null, 2), err => {
      if (err) console.log(err);
    });

    repMsg.delete();
    msg.delete();

    return send(
      "Removed the website from monitoring, you can check website using `!stats`",
      message,
      "GREEN"
    );
  }
};
//--------------------------------------------------- F U N C T I O N S ---------------------------------------------

function send(content, message, color) {
  if (!color) color = "GREEN";

  return message.channel.send({
    embed: { description: content, color: color }
  });
}
function isURL(url) {
  if (!url) return false;
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))|" + // OR ip (v4) address
    "localhost" + // OR localhost
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(url);
}
