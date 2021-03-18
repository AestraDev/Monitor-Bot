const discord = require('discord.js');
const fs = require("fs");

module.exports = {
  name: "monitor",
	aliases: ["add"],
  run: async (client, message, args ) => {
	if (!args[0]) {
      return send("Please give website link to monitor", message, "RED");
    }
		if (!isURL(args[0])) {
      return send(
        "Given Url is invalid, Make sure you send working URL",
        message,
        "RED"
      );
    }
 let database = JSON.parse(fs.readFileSync("./link.json", "utf8"));
 const check = database.find(x => x.id === message.author.id);

 
    if (check) {
      if (check.link.length === 5) {
        return send(
          "You reached your limit, you can not add more than 5 website.",
          message,
          "YELLOW"
        );
      }
			
      let numb = database.indexOf(check);
      database[numb].link.push(args[0]);
    } else {
      database.push({
        id: message.author.id,
        name: message.author.username,
        link: [args[0]]
      });
    }

    fs.writeFile("./link.json", JSON.stringify(database, null, 2), err => {
      if (err) console.log(err);
    });

    send("Added Your Website to monitoring", message, "YELLOW");

    message.delete();
  }
  }    
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
//--------------------------------------------------- F U N C T I O N S ---------------------------------------------

function send(content, message, color) {
  if (!color) color = "GREEN";

  return message.channel.send({
    embed: { description: content, color: color }
  })
}};


