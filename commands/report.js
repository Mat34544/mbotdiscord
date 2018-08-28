const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("No se pudo encontrar el usuario");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reporte")
    .setColor("#ff8c00")
    .addField("Usuario Reportado", `${rUser} con ID: ${rUser.id}`)
    .addField("Reportado por", `${message.author} con ID: ${message.author.id}`)
    .addField("Canal", message.channel)
    .addField("Hora", message.createdAt)
    .addField("Razón", reason);


    let reporteschannel = message.guild.channels.find(`name`, "reportes");
    if(!reporteschannel) return message.channel.sendEmbed("No se encontro canal de reportes")



    message.delete().catch(O_o=>{});
    reporteschannel.send(reportEmbed);
}

module.exports.help = {
  name: "reportar"
}
