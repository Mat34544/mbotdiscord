const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Información Server")
  .setColor("#00d0ff")
  .setThumbnail(sicon)
  .addField("Nombre", message.guild.name)
  .addField("Creado En", message.guild.createdAt)
  .addField("Te uniste", message.member.joinedAt)
  .addField("Miembros en total", message.guild.memberCount);

  return message.channel.send(serverembed);
}


module.exports.help = {
  name: "Infoserver"
}
