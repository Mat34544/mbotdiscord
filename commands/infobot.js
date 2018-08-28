const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
 .setDescription("Información M Community Bot")
 .setColor("#00d0ff")
 .setThumbnail(bicon)
 .addField("Nombre", bot.user.username)
 .addField("Creado En", bot.user.createdAt);

  return message.channel.send(botembed);

  }


module.exports.help = {
  name: "infobot"
}
